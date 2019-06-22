const {
  always,
  head,
  ifElse,
  join,
  last,
  map,
  match,
  pipe,
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
    match(/as .*/i),
    head,
    trim,
    split(' '),
    last,
    alias => ` as ${alias}`,
  ),
  always(''),
);

const handleColumn = pipe(
  split('.'),
  map(columnName => `"${columnName}"`),
  join('.'),
);

module.exports = {
  getAlias,
  handleColumn,
  isAlias,
  isKnexQB,
  isKnexRaw,
  knexRaw,
};
