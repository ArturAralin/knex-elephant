const {
  T,
  cond,
  identity,
  juxt,
  pipe,
  unapply,
} = require('ramda');
const {
  P,
  getAlias,
  handleColumn,
  isKnexRaw,
  knexRaw,
} = require('../builder-base');

const handleBody = cond([
  [isKnexRaw, raw => raw.toString()],
  [T, handleColumn],
]);

/**
 * @func
 * @name rowToJson
 * @since v0.0.5-beta
 * @category JSON
 * @example
 *  knex('users')
 *    .select([
 *      'users.*',
 *      rowToJson('configs')
 *    ])
 *    .leftJoin('configs', 'configs.user_id', 'users.id');
 */
const rowToJson = pipe(
  unapply(identity),
  juxt([
    P(0, handleBody),
    P(1, getAlias),
  ]),
  ([body, alias]) => `row_to_json(${body})${alias}`,
  knexRaw,
);

module.exports = {
  rowToJson,
};
