const dates = require('../lib/enterprise-dates.json')
const versions = require('../lib/enterprise-versions.json')

test('enterprise-dates.json has expected data', async () => {
  expect(dates['2.0'].releaseDate).toBe('2014-11-11')
  expect(dates['2.15'].deprecationDate).toBe('2019-10-16')
})

test('enterprise-versions.json has expected data', async () => {
  expect(versions.supported.length).toBeGreaterThan(2)
  expect(versions.deprecated.length).toBeGreaterThan(16)
  expect(typeof versions.latest).toBe('string')
  expect(typeof versions.oldestSupported).toBe('string')
  expect(typeof versions.nextDeprecationDate).toBe('string')
  expect(versions.deprecatedOnNewSite.length).toBeGreaterThan(2)
})
