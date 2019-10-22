if (!process.env.GITHUB_TOKEN && !process.env.GITHUB_API_TOKEN) {
  require('dotenv-safe').load({ allowEmptyValues: true })
}

// this module needs to work in development, production, and GitHub Actions
// GITHUB_API_TOKEN = a personal access token stored in dotenv and Heroku config
// GITHUB_TOKEN = an installation token granted via GitHub Actions
const apiToken = process.env.GITHUB_TOKEN || process.env.GITHUB_API_TOKEN

// See https://github.com/octokit/rest.js/issues/1207
module.exports = function authenticate () {
  return require('@octokit/rest')({
    auth: `token ${apiToken}`
  })
}
