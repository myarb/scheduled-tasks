const acceptedMilestones = ['release', 'deprecation']
const enterpriseDates = require('./enterprise-dates')
const assert = require('assert')

module.exports = function calculateDaysUntilEnterpriseMilestone (version, milestone) {
  assert(version, 'must provide version')
  assert(acceptedMilestones.includes(milestone), 'must provide a value of \'release\' or \'deprecation\'')

  // get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10)

  // find the provided version's release or deprecation date
  const milestoneDate = milestone === 'deprecation'
    ? enterpriseDates[version].deprecationDate
    : enterpriseDates[version].releaseDate

  if (!milestoneDate) console.error(`error getting date for ${version} ${milestone}`)

  const differenceInMilliseconds = getTime(milestoneDate) - getTime(today)

  // return difference in days
  return Math.floor((differenceInMilliseconds) / (1000 * 60 * 60 * 24))
}

function getTime (date) {
  return new Date(date).getTime()
}
