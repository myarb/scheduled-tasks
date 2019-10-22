**Note**: Each step below should be done in a separate PR. Only move on to the next step when the preceding step's PR has been **merged**.

## Step 1: Archive a static copy of the deprecated version

- [ ] If you have a checkout of the [repo that houses archived Enterprise content](https://github.com/github/help-docs-archived-enterprise-versions), `cd` into it and update from `master`. If not, clone it and `cd` into it.
- [ ] Create a new branch: `git checkout -b deprecate-<version>`
- [ ] Back in your `help-docs` checkout, update from `master` and create a new branch with the same name: `git checkout -b deprecate-<version>`.
- [ ] Run the script to download static copies of all pages for the oldest supported version into your archival checkout:
    ```
    $ script/archive-enterprise-version.js <path-to-archive-repo-checkout>
    ```
    If your `help-docs` and `help-docs-archived-enterprise-versions` repos live in the same directory on your machine, this command would be:
    ```
    $ script/archive-enterprise-version.js ../help-docs-archived-enterprise-versions
    ```
- [ ] `cd` into the archival checkout and run `git status` to confirm you see the new version directory. If so, `git add` it, commit, and push.
- [ ] Go to the [archival repo](https://github.com/github/help-docs-archived-enterprise-versions) and create a new pull request. Request a review from `@github/product-docs-engineering`.
- [ ] Merge the PR as soon as you get an approving review. Note: merging this PR is just a preparation step. The version will not be deprecated on the help site until you do the next step.

## Step 2: Deprecate the version in help-docs

In your `help-docs` checkout:
- [ ] Edit [lib/enterprise-versions.js](lib/enterprise-versions.js) by moving the version to be deprecated out of the `supported` array and into the `deprecated` array.
- [ ] Run `script/test`. If there are any failures, ping `@github/product-docs-engineering`.
- [ ] If there are no test failures, add and commit `lib/enterprise-versions.js` and open a new pull request. Visit the version on staging to make sure it renders as expected (make sure to check the banner text on the new oldest version). Ask for a review from `@github/product-docs-core` and `@github/product-docs-engineering`.
- [ ] When it's approved, merge the PR to `master` to complete the deprecation.

## Step 3: Remove outdated Liquid markup and frontmatter

In your `help-docs` checkout:
- [ ] Update from `master` and create a new branch: `git checkout -b remove-<version>-markup`
- [ ] Run the script to remove outdated Liquid markup and frontmatter from content and data files: `script/remove-deprecated-enterprise-version-markup.js`.
- [ ] Spot check a few changes.
- [ ] Run `script/test`. If there are any failures, ping `@github/product-docs-engineering`.
- [ ] Add, commit, and push all changes, and open a new pull request. This PR may be large and complex, so make sure a writer does a thorough review.
- [ ] If any problems are found during review, open a new engineering issue with details so `@github/product-docs-engineering` can update the script.
