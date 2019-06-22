const {
  T,
  allPass,
  always,
  cond,
  equals,
  evolve,
  head,
  identity,
  last,
  pipe,
  propEq,
  test,
  type,
  unapply,
} = require('ramda');
const {
  getAlias,
  handleColumn,
  isAlias,
  isKnexRaw,
  knexRaw,
} = require('../builder-base');

const isDistinctKeyword = allPass([
  pipe(type, equals('String')),
  test(/^distinct$/i),
]);

const handleBody = cond([
  [isKnexRaw, raw => raw.toString()],
  [T, handleColumn],
]);

const lengthEq = propEq('length');

const jsonAggFactory = fnName => pipe(
  unapply(identity),
  cond([
    [lengthEq(1), pipe(
      head,
      handleBody,
      v => ['', v, ''],
    )],
    [lengthEq(2), cond([
      [pipe(head, isDistinctKeyword), pipe(
        evolve([
          always('distinct '),
          handleBody,
        ]),
        v => [...v, ''],
      )],
      [pipe(last, isAlias), pipe(
        evolve([
          handleBody,
          getAlias,
        ]),
        v => ['', ...v],
      )],
    ])],
    [lengthEq(3), evolve([
      always('distinct '),
      handleBody,
      getAlias,
    ])],
  ]),
  ([distinct, body, alias]) => `${fnName}(${distinct}${body})${alias}`,
  knexRaw,
);

/**
 * @func
 * @name jsonAgg
 * @since v0.0.1
 * @category JSON
 * @example
 *  knex('photos')
 *    .select([
 *      'category_id',
 *      jsonAgg('photo_url', 'as photos')
 *    ])
 *    .where('user_id', 1)
 *    .groupBy('photos')
 */
const jsonAgg = jsonAggFactory('json_agg');

/**
 * @func
 * @name jsonbAgg
 * @since v0.0.1
 * @category JSONB
 * @example
 *  knex('photos')
 *    .select([
 *      'category_id',
 *      jsonbAgg('distinct', 'photo_url', 'as photos')
 *    ])
 *    .where('user_id', 1)
 *    .groupBy('photos')
 */
const jsonbAgg = jsonAggFactory('jsonb_agg');

module.exports = {
  jsonAgg,
  jsonbAgg,
};
