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
  [T, v => String(v)],
]);

const lengthEq = propEq('length');

const jsonAggFactory = fnName => pipe(
  unapply(identity),
  cond([
    [lengthEq(1), pipe(
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

const jsonAgg = jsonAggFactory('json_agg');
const jsonbAgg = jsonAggFactory('jsonb_agg');

module.exports = {
  jsonAgg,
  jsonbAgg,
};
