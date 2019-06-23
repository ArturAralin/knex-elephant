const {
  anyPass,
  always,
  ifElse,
  join,
  map,
  nth,
  pipe,
  slice,
  split,
  test,
  trim,
} = require('ramda');
const knexLib = require('knex');

const knex = knexLib({ client: 'pg' });
const QueryBuilder = require('knex/lib/query/builder');
const Raw = require('knex/lib/raw');

/**
 * Checking on instance of Knex.QueryBuilder
 * @private
 * @param o - some object
 * @returns {Boolean}
 */
const isKnexQB = o => o instanceof QueryBuilder;

/**
 * Checking on instance of Knex.Raw
 * @private
 * @param o - some object
 * @returns {Boolean}
 */
const isKnexRaw = o => o instanceof Raw;

/**
 * Checking on instance of Knex.Raw or Knex.QueryBuilder
 * @private
 * @param o - some object
 * @returns {Boolean}
 */
const isRawOrQB = anyPass([
  isKnexQB,
  isKnexRaw,
]);

/**
 * Wrap text into Knex.Raw
 * @private
 * @param {String} sql
 * @returns {Knex.Raw}
 */
const knexRaw = sql => knex.raw(sql);


const isAlias = test(/as /i);
const getAlias = ifElse(
  isAlias,
  pipe(
    trim,
    slice(2, Infinity),
    trim,
    alias => ` as ${alias}`,
  ),
  always(''),
);

const handleColumn = pipe(
  split('.'),
  map(columnName => `"${columnName}"`),
  join('.'),
);

/**
 * Process n-th element function
 * f(arr[n])
 * @private
 * @param {Number} n - index
 * @param {Function} f - handler
 */
const P = (n, f) => pipe(nth(n), f);

module.exports = {
  P,
  getAlias,
  handleColumn,
  isAlias,
  isKnexQB,
  isKnexRaw,
  isRawOrQB,
  knexRaw,
};
