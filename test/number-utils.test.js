import test from 'node:test'
import assert from 'node:assert/strict'

import toNumber from '../src/toNumber.js'
import toFinite from '../src/toFinite.js'
import toInteger from '../src/toInteger.js'
import defaultTo from '../src/defaultTo.js'
import defaultToAny from '../src/defaultToAny.js'
import memoize from '../src/memoize.js'

test('toNumber muuntaa tavalliset merkkijonot numeroiksi', () => {
  assert.equal(toNumber('3.2'), 3.2)
  assert.equal(toNumber('  8  '), 8)
})

test('toNumber tukee binaari- ja oktaalimuotoa', () => {
  assert.equal(toNumber('0b1010'), 10)
  assert.equal(toNumber('0o10'), 8)
})

test('toNumber palauttaa NaN virheelliselle heksalle ja symbolille', () => {
  assert.ok(Number.isNaN(toNumber('-0x1')))
  assert.ok(Number.isNaN(toNumber(Symbol('x'))))
})

test('toFinite muuntaa Infinityn suurimmaksi äärelliseksi luvuksi', () => {
  assert.equal(toFinite(Infinity), 1.7976931348623157e+308)
  assert.equal(toFinite(-Infinity), -1.7976931348623157e+308)
})

test('toFinite palauttaa nollan tyhjille arvoille', () => {
  assert.equal(toFinite(null), 0)
  assert.equal(toFinite(false), 0)
})

test('toInteger katkaisee desimaaliosan', () => {
  assert.equal(toInteger(3.9), 3)
  assert.equal(toInteger('12.7'), 12)
})

test('defaultTo palauttaa oletuksen nullille ja undefined-arvolle', () => {
  assert.equal(defaultTo(undefined, 10), 10)
  assert.equal(defaultTo(null, 10), 10)
  assert.equal(defaultTo(5, 10), 5)
})

test('defaultToAny palauttaa ensimmäisen kelvollisen oletusarvon', () => {
  assert.equal(defaultToAny(undefined, null, 20), 20)
  assert.equal(defaultToAny('arvo', 10, 20), 'arvo')
})

test('memoize käyttää välimuistia ilman resolveria', () => {
  let calls = 0
  const doubled = memoize((value) => {
    calls += 1
    return value * 2
  })

  assert.equal(doubled(4), 8)
  assert.equal(doubled(4), 8)
  assert.equal(calls, 1)
})

test('memoize voi käyttää resolveria avaimen muodostamiseen', () => {
  let calls = 0
  const joinValues = memoize(
    (...values) => {
      calls += 1
      return values.join('-')
    },
    (...values) => values.join('|')
  )

  assert.equal(joinValues('a', 'b'), 'a-b')
  assert.equal(joinValues('a', 'b'), 'a-b')
  assert.equal(calls, 1)
})

test('memoize heittää virheen jos parametri ei ole funktio', () => {
  assert.throws(() => memoize(null), TypeError)
})
