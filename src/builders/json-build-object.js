const {
  T,
  anyPass,
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
  isKnexRaw,
  knexRaw,
  handleColumn,
} = require('../builder-base');

const isRawOrQB = anyPass([
  isKnexQB,
  isKnexRaw,
]);

const makeBody = pipe(
  aperture(2),
  map(pipe(
    reverse,
    apply(cond([
      [isRawOrQB, (qb, key) => `'${key}', (${qb.toString()})`],
      [T, (column, key) => `'${key}', ${handleColumn(column)}`],
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

/**
 * @func
 * @name jsonBuildObject
 * @since v0.0.1
 * @category JSON
 * @example
 *  knex('users')
 *    .select([
 *      'category_id',
 *      jsonBuildObject([
 *        'small', 'avatars.small',
 *        'medium', 'avatars.medium',
 *        'big', 'avatars.big',
 *      ]),
 *    ])
 *    .leftJoin('avatars', 'avatars.user_id', 'users.id');
 */
const jsonBuildObject = jsonBuildObjectFactory('json_build_object');

/**
 * @func
 * @name jsonBuildObject
 * @since v0.0.1
 * @category JSONB
 * @example
 *  knex('users')
 *    .select([
 *      'category_id',
 *      jsonBuildObject([
 *        'small', 'avatars.small',
 *        'medium', 'avatars.medium',
 *        'big', 'avatars.big',
 *      ]),
 *    ])
 *    .leftJoin('avatars', 'avatars.user_id', 'users.id');
 */
const jsonbBuildObject = jsonBuildObjectFactory('jsonb_build_object');

module.exports = {
  jsonBuildObject,
  jsonbBuildObject,
};
