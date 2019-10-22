const octokit = require('./authenticate')()
const { owner, repo } = require('./config')
const assert = require('assert')

// create a new issue
module.exports = async function createIssue (options) {
  options.owner = owner
  options.repo = repo

  assert(options.title, 'must provide issue title')
  assert(options.body, 'must provide issue body')

  try {
    const { data } = await octokit.issues.create(options)
    return data.id
  } catch (err) {
    console.log('error creating issue')
    throw (err)
  }
}
