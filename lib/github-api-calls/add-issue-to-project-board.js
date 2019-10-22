const octokit = require('./authenticate')()
const assert = require('assert')

// the project board https://github.com/github/help-docs/projects/20 has an ID of 1911017
// we get the "Content creation" column ID via https://developer.github.com/v3/projects/columns/#list-project-columns
const columnId = 3725578

// add an issue to the help docs weekly project board
module.exports = async function addIssueToProjectBoard (issueId) {
  assert(issueId, 'must provide issue ID')

  try {
    console.log(`Adding issue ${issueId} to the help-docs weekly project board`)
    const { status } = await octokit.projects.createCard({
      column_id: columnId,
      content_id: issueId,
      content_type: 'Issue'
    })
    return status
  } catch (err) {
    console.log('error adding issue to project board')
    throw (err)
  }
}
