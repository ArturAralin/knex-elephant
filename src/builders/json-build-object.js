const {
  T,
  aperture,
  apply,
  cond,
  evolve,
  join,
  map,
  pipe,
  reverse,
  unapply,
} = require('ramda');
const {
  getAlias,
  isKnexQB,
  knexRaw,
} = require('../builder-base');

const makeBody = pipe(
  aperture(2),
  map(pipe(
    reverse,
    apply(cond([
      [isKnexQB, (qb, key) => `'${key}', (${qb.toString()})`],
      [T, (column, key) => `'${key}', "${column}"`],
    ])),
  )),
  join(', '),
);

const jsonBuildObjectFactory = fnName => pipe(
  unapply(evolve([
    makeBody,
    getAlias,
  ])),
  ([body, alias]) => `${fnName}(${body})${alias || ''}`,
  knexRaw,
);

const jsonBuildObject = jsonBuildObjectFactory('json_build_object');
const jsonbBuildObject = jsonBuildObjectFactory('jsonb_build_object');

module.exports = {
  jsonBuildObject,
  jsonbBuildObject,
};
