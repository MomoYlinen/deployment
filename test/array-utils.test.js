import test from 'node:test'
import assert from 'node:assert/strict'

import slice from '../src/slice.js'
import drop from '../src/drop.js'
import map from '../src/map.js'
import filter from '../src/filter.js'
import reduce from '../src/reduce.js'

test('slice palauttaa osan taulukosta alku- ja loppuindeksillä', () => {
  assert.deepEqual(slice([1, 2, 3, 4], 1, 3), [2, 3])
})

test('slice käsittelee negatiiviset indeksit', () => {
  assert.deepEqual(slice([1, 2, 3, 4], -2), [3, 4])
  assert.deepEqual(slice([1, 2, 3, 4], 0, -1), [1, 2, 3])
})

test('drop poistaa oletuksena yhden alkion', () => {
  assert.deepEqual(drop([1, 2, 3]), [2, 3])
})

test('drop käsittelee myös suuret ja negatiiviset määrät', () => {
  assert.deepEqual(drop([1, 2, 3], 5), [])
  assert.deepEqual(drop([1, 2, 3], -1), [1, 2, 3])
})

test('map muuntaa jokaisen arvon iterateen avulla', () => {
  assert.deepEqual(map([1, 2, 3], (value) => value * 3), [3, 6, 9])
})

test('filter palauttaa ehdon täyttävät alkiot', () => {
  // Tässä varmistetaan tavallinen onnistuva suodatus.
  assert.deepEqual(filter([1, 2, 3, 4], (value) => value % 2 === 0), [2, 4])
})

test('reduce laskee taulukon arvot yhteen alkuarvolla', () => {
  assert.equal(reduce([1, 2, 3], (sum, value) => sum + value, 0), 6)
})

test('reduce toimii myös oliolla', () => {
  const result = reduce({ a: 1, b: 2 }, (sum, value) => sum + value, 0)
  assert.equal(result, 3)
})
