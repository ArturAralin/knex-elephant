const {
  pipe,
  unapply,
  identity,
  juxt,
  cond,
  type,
  equals,
  compose,
  T,
} = require('ramda');
const {
  P,
  getAlias,
  handleColumn,
  isRawOrQB,
  knexRaw,
} = require('../builder-base');

const isObject = compose(equals('Object'), type);

const handleBody = cond([
  [isRawOrQB, knex => knex.toString()],
  [isObject, o => `'${JSON.stringify(o)}'`],
  [T, handleColumn],
]);

const jsonEachFactory = fnName => pipe(
  unapply(identity),
  juxt([
    P(0, handleBody),
    P(1, getAlias),
  ]),
  ([body, alias]) => `${fnName}(${body})${alias}`,
  knexRaw,
);

const jsonEach = jsonEachFactory('json_each');
const jsonbEach = jsonEachFactory('jsonb_each');

module.exports = {
  jsonEach,
  jsonbEach,
};
