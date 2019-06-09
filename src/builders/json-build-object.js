const {
  T,
  aperture,
  pipe,
  map,
  apply,
  cond,
  reverse,
  join,
  test,
  ifElse,
  always,
  match, head,
  trim,
  split,
  last,
  unapply,
  evolve,
} = require('ramda');
const {
  isKnex,
  knexRaw,
} = require('../builder-base');

const makeBody = pipe(
  aperture(2),
  map(pipe(
    reverse,
    apply(cond([
      [isKnex, (qb, key) => `'${key}', (${qb.toString()})`],
      [T, (column, key) => `'${key}', "${column}"`],
    ])),
  )),
  join(', '),
);

const getAlias = ifElse(
  test(/as /i),
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
