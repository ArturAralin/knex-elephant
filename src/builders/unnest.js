const {
  T,
  anyPass,
  compose,
  cond,
  equals,
  head,
  identity,
  join,
  juxt,
  last,
  map,
  pipe,
  takeWhile,
  type,
  unapply,
} = require('ramda');
const {
  P,
  getAlias,
  handleColumn,
  isKnexQB,
  isKnexRaw,
  knexRaw,
} = require('../builder-base');

const isArray = compose(equals('Array'), type);
const isNumber = compose(equals('Number'), type);
const isString = compose(equals('String'), type);
const isFirstIsString = pipe(head, isString);
const isFirstIsAnyKnex = pipe(head, anyPass([isKnexQB, isKnexRaw]));

const handleType = cond([
  [isString, v => `'${v}'`],
  [isNumber, identity],
  [T, identity],
]);

const handleColumnCase = juxt([
  P(0, handleColumn),
  P(1, getAlias),
]);

const handleArrayCase = juxt([
  pipe(
    takeWhile(isArray),
    map(pipe(
      map(handleType),
      join(','),
      body => `array[${body}]`,
    )),
    join(', '),
  ),
  pipe(last, getAlias),
]);

const knexCase = juxt([
  P(0, raw => raw.toString()),
  P(1, getAlias),
]);

/**
 * @func
 * @name unnest
 * @since v0.0.4-beta
 * @category Array
 * @example
 *  knex
 *    .select('*')
 *    .from(unnest(
 *      [1, 2, 3],
 *      ['first', 'second', 'third'],
 *      'as aliases(number, alias)',
 *    ));
 */
const unnest = pipe(
  unapply(identity),
  cond([
    [isFirstIsString, handleColumnCase],
    [isFirstIsAnyKnex, knexCase],
    [T, handleArrayCase],
  ]),
  ([body, alias]) => `unnest(${body})${alias}`,
  knexRaw,
);

module.exports = {
  unnest,
};
