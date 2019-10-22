# Scripts

The scripts in this repo require that you have a GitHub Personal Access Token in a `.env` file in order to run them. If you don't have a token, get one [here](https://github.com/settings/tokens/new?scopes=repo&description=help-docs-dev). If you don't have an `.env` file, run this command in Terminal:

`cp .env.example .env`

Open the `.env` file in a text editor and add your token after the equals sign in the `GITHUB_API_TOKEN=` placeholder. Do not commit the `.env` file.

* `get-enterprise-data.js` - This script is run by `script/open-enterprise-issue.js` to update the `enterprise-dates.json` and `enterprise-versions.json` files from the data in https://help.github.com/enterprise.json.

* `open-enterprise-issue.js` - This script is run by the scheduled GitHub Actions `open-enterprise-deprecation-issue.yml` and `open-enterprise-release-issue.yml` once per day. It finds the date of the next Enterprise version's release or the oldest supported version's deprecation. If the date is within 10 days, it will open a release or deprecation issue in the `github/help-docs` repository.
