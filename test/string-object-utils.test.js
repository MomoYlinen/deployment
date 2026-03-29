import test from 'node:test'
import assert from 'node:assert/strict'

import words from '../src/words.js'
import capitalize from '../src/capitalize.js'
import upperFirst from '../src/upperFirst.js'
import endsWith from '../src/endsWith.js'
import get from '../src/get.js'
import keys from '../src/keys.js'
import isObject from '../src/isObject.js'
import isArrayLike from '../src/isArrayLike.js'
import isEmpty from '../src/isEmpty.js'
import toString from '../src/toString.js'

test('words pilkkoo tavallisen lauseen sanoiksi', () => {
  assert.deepEqual(words('fred, barney, & pebbles'), ['fred', 'barney', 'pebbles'])
})

test('words käyttää annettua patternia jos sellainen annetaan', () => {
  assert.deepEqual(words('fred, barney, & pebbles', /[^, ]+/g), ['fred', 'barney', '&', 'pebbles'])
})

test('capitalize muuttaa ensimmäisen kirjaimen isoksi', () => {
  assert.equal(capitalize('FRED'), 'Fred')
})

test('upperFirst nostaa vain ensimmäisen kirjaimen isoksi', () => {
  assert.equal(upperFirst('fred'), 'Fred')
  assert.equal(upperFirst('FRED'), 'FRED')
})

test('endsWith tarkistaa loppuosuman myös position avulla', () => {
  assert.equal(endsWith('abc', 'c'), true)
  assert.equal(endsWith('abc', 'b', 2), true)
  assert.equal(endsWith('abc', 'b'), false)
})

test('get hakee arvon polusta', () => {
  const object = { a: [{ b: { c: 3 } }] }
  assert.equal(get(object, 'a[0].b.c'), 3)
})

test('get palauttaa oletusarvon jos polkua ei löydy', () => {
  assert.equal(get({ a: 1 }, 'a.b.c', 'default'), 'default')
})

test('keys palauttaa merkkijonon indeksit ja olion omat avaimet', () => {
  assert.deepEqual(keys('hi'), ['0', '1'])
  assert.deepEqual(keys({ a: 1, b: 2 }), ['a', 'b'])
})

test('isObject tunnistaa oliot mutta ei nullia', () => {
  assert.equal(isObject({}), true)
  assert.equal(isObject(() => {}), true)
  assert.equal(isObject(null), false)
})

test('isArrayLike tunnistaa taulukot ja merkkijonot', () => {
  assert.equal(isArrayLike([1, 2, 3]), true)
  assert.equal(isArrayLike('abc'), true)
  assert.equal(isArrayLike(() => {}), false)
})

test('isEmpty tunnistaa tyhjät kokoelmat', () => {
  assert.equal(isEmpty([]), true)
  assert.equal(isEmpty(''), true)
  assert.equal(isEmpty(new Map()), true)
  assert.equal(isEmpty({}), true)
})

test('isEmpty tunnistaa ei-tyhjät kokoelmat', () => {
  assert.equal(isEmpty([1]), false)
  assert.equal(isEmpty('abc'), false)
  assert.equal(isEmpty({ a: 1 }), false)
})

test('toString palauttaa merkkijonon myös taulukolle ja -0:lle', () => {
  assert.equal(toString([1, 2, 3]), '1,2,3')
  assert.equal(toString(-0), '-0')
})
