#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const semver = require('semver')
const { execSync } = require('child_process')
const numberOfdaysBeforeMilestoneToOpenIssue = 10

// first update the enterprise data JSON files
execSync(path.join(__dirname, 'get-enterprise-data.js'))
const enterpriseDates = require('../lib/enterprise-dates')
const enterpriseVersions = require('../lib/enterprise-versions')

const { latest, oldestSupported } = enterpriseVersions
const acceptedMilestones = ['release', 'deprecation']
const teamsToCC = '/cc @github/product-docs-core @github/product-docs-engineering'

// github api calls
const checkForOpenIssues = require('../lib/github-api-calls/check-for-open-issues')
const createIssue = require('../lib/github-api-calls/create-issue')
const addIssueToProjectBoard = require('../lib/github-api-calls/add-issue-to-project-board')

const milestone = process.argv[2]
if (!acceptedMilestones.includes(milestone)) {
  console.log('Please specify either \'release\' or \'deprecation\'\n')
  console.log('Example: script/open-enterprise-issue.js release')
  process.exit()
}

// milestone-dependent values
const version = milestone === 'release'
  ? parseFloat(semver.inc(semver.coerce(latest), 'minor')).toFixed(2)
  : oldestSupported

const datesForVersion = enterpriseDates[version]

if (!datesForVersion) {
  console.log(`Could not find ${version} in enterpriseDates`)
  process.exit(0)
}

const nextMilestoneDate = datesForVersion[`${milestone}Date`]
const daysUntilMilestone = require('../lib/calculate-days-until-enterprise-milestone')(version, milestone)

// if milestone is more than X days away, exit now
if (daysUntilMilestone > numberOfdaysBeforeMilestoneToOpenIssue) {
  console.log(`The ${version} ${milestone} is not until ${nextMilestoneDate}! An issue will be opened when it is ${numberOfdaysBeforeMilestoneToOpenIssue} days away.`)
  process.exit(0)
}

const milestoneSteps = fs.readFileSync(path.join(__dirname, `../docs/enterprise-${milestone}-steps.md`), 'utf8')
const labels = [`enterprise ${milestone}`, 'engineering']
const issueTitle = `[${nextMilestoneDate}] Enterprise Server ${version} ${milestone} (technical steps)`

const issueBody = `GHE ${version} ${milestone} occurs on ${nextMilestoneDate}.
\n${milestone} steps:
\n${milestoneSteps}
${teamsToCC}`

main()

async function main () {
  const openIssues = await checkForOpenIssues({
    state: 'open',
    labels: labels
  })

  // if an issue already exists, exit now
  if (openIssues.length) {
    console.log(`A ${milestone} issue is already open! #${openIssues.join(' ')}`)
    process.exit(0)
  }

  // otherwise open an issue
  const issueID = await createIssue({
    title: issueTitle,
    body: issueBody,
    labels: labels
  })

  // and add it to the help docs weekly project board
  await addIssueToProjectBoard(issueID)
}
