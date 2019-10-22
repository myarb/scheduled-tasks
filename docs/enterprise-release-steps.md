- [ ] Prepend the new version string to the `supported` array in [lib/enterprise-versions.js](lib/enterprise-versions.js)
- [ ] Run `script/sync-search-indices` to generate and upload new Algolia indices in each supported language for the new GHE version.
- [ ] Run `script/update-enterprise-dates.js` to get the latest Enterprise release and deprecation dates.

**Note**: The `update-enterprise-dates.js` script requires that you have a GitHub Personal Access Token in a `.env` file. See [script/README.md](https://github.com/github/help-docs/blob/master/script/README.md#additional-scripts) for details.
