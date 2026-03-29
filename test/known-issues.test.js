import test from 'node:test'
import assert from 'node:assert/strict'

import chunk from '../src/chunk.js'
import countBy from '../src/countBy.js'
import clamp from '../src/clamp.js'
import defaultTo from '../src/defaultTo.js'
import camelCase from '../src/camelCase.js'
import compact from '../src/compact.js'

test.skip('chunk jakaisi taulukon tasakokoisiin paloihin', () => {
  assert.deepEqual(chunk(['a', 'b', 'c', 'd'], 2), [['a', 'b'], ['c', 'd']])
})

test.skip('countBy kasvattaisi ensimmäisen osuman laskurin arvoon yksi', () => {
  assert.deepEqual(countBy([6.1, 4.2, 6.3], Math.floor), { 4: 1, 6: 2 })
})

test.skip('clamp pitäisi arvon rajojen sisällä', () => {
  assert.equal(clamp(10, -5, 5), 5)
})

test.skip('defaultTo käyttäisi oletusarvoa myös NaN-tilanteessa', () => {
  assert.equal(defaultTo(Number.NaN, 10), 10)
})

test.skip('camelCase ei lisäisi merkkijonon alkuun välilyöntiä', () => {
  assert.equal(camelCase('Foo Bar'), 'fooBar')
})

test.skip('compact poistaisi falsey-arvot ilman väärää indeksointia', () => {
  assert.deepEqual(compact([0, 1, false, 2, '', 3]), [1, 2, 3])
})
