const octokit = require('./authenticate')()
const { owner, repo } = require('./config')

// look for open issue that meets criteria
module.exports = async function getOpenIssues (options) {
  options.owner = owner
  options.repo = repo
  try {
    const { data } = await octokit.issues.listForRepo(options)
    return data.map(issue => issue.number)
  } catch (err) {
    console.log('error listing issues in repo')
    throw (err)
  }
}
