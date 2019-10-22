#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const url = 'https://help.github.com/enterprise.json'
const datesFile = path.join(__dirname, '../lib/enterprise-dates.json')
const versionsFile = path.join(__dirname, '../lib/enterprise-versions.json')

const datesData = {
  current: stringify(require(datesFile)),
  file: datesFile
}

const versionsData = {
  current: stringify(require(versionsFile)),
  file: versionsFile
}

main()

async function main () {
  const response = await fetch(url)
  const json = await response.json()
  const { enterpriseDates, enterpriseVersions } = json

  datesData.new = stringify(enterpriseDates)
  versionsData.new = stringify(enterpriseVersions)

  writeFileIfNeeded(datesData)
  writeFileIfNeeded(versionsData)
}

function writeFileIfNeeded (data) {
  if (data.current === data.new) {
    console.log(`${data.file} is up-to-date!`)
  } else {
    fs.writeFileSync(data.file, data.new, 'utf8')
    console.log(`${data.file} has been updated!`)
  }
}

function stringify (json) {
  return JSON.stringify(json, null, 2)
}
