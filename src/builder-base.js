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

const isKnexQB = o => o instanceof QueryBuilder;
const isKnexRaw = o => o instanceof Raw;

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
