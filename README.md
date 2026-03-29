# Deployment

[![Coverage Status](https://coveralls.io/repos/github/MomoYlinen/deployment/badge.svg?branch=main)](https://coveralls.io/github/MomoYlinen/deployment?branch=main)

Tämä repo sisältää yksikkötestit annetulle JavaScript-kirjastolle sekä GitHub Actions- ja Coveralls-toteutuksen.

## Käytetyt työkalut

- Node.js
- `node:test`
- `node:assert/strict`
- `c8`
- GitHub Actions
- Coveralls

## Asennus

```bash
npm install
```

## Testit

```bash
npm test
```

Coverage:

```bash
npm run coverage
```

Testit löytyvät `test/`-hakemistosta:
- `test/number-utils.test.js`
- `test/array-utils.test.js`
- `test/string-object-utils.test.js`
- `test/known-issues.test.js`

`test/known-issues.test.js` sisältää skipatut testit löydetyille vioille.

## Mitä testattiin

Suoraan testattiin nämä tiedostot:
- `toNumber`
- `toFinite`
- `toInteger`
- `defaultTo`
- `defaultToAny`
- `memoize`
- `slice`
- `drop`
- `map`
- `filter`
- `reduce`
- `words`
- `capitalize`
- `upperFirst`
- `endsWith`
- `get`
- `keys`
- `isObject`
- `isArrayLike`
- `isEmpty`
- `toString`

## Mitä ei testattu

`.internal`-hakemisto

Kaikkia tiedostoja ei testattu erikseen. Suoraan testaamatta jäivät nämä tiedostot:
- `isDate`
- `isBoolean`
- `add`
- `divide`
- `ceil`
- `difference`
- `every`
- `at`

## Coverage

Paikallisessa ajossa statement coverage oli `93.53 %` ilman `.internal`-hakemistoa.

## GitHub Actions

Workflow löytyy tiedostosta `.github/workflows/test.yml`.

Tekee nämä vaiheet:
- checkout
- Node.js-asennus
- `npm ci`
- `npm run coverage`
- coverage-raportin lähetys Coverallsiin

Workflow reagoi `push`- ja `pull_request`-tapahtumiin.

## Coveralls

Coveralls vastaanottaa coverage-raportin GitHub Actions -ajosta ja näyttää repositorion badge-prosentin sekä tarkemmat coverage-tiedot.

## Löydetyt ongelmat

Testauksen aikana löytyi issueiksi raportoidut ongelmat:
- `chunk` palauttaa virheellisen rakenteen
- `countBy` aloittaa laskurin väärästä arvosta
- `clamp` ei rajoita arvoja oikein
- `defaultTo` ei käytä oletusarvoa `NaN`-tapauksessa
