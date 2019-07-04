const {
  T,
  cond,
  identity,
  is,
  juxt,
  pipe,
  unapply,
} = require('ramda');
const {
  P,
  getAlias,
  handleColumn,
  isRawOrQB,
  knexRaw,
} = require('../builder-base');

const handleBody = cond([
  [is(Array), arr => `'${JSON.stringify(arr)}'`],
  [isRawOrQB, raw => raw.toString()],
  [T, handleColumn],
]);

const jsonToRecordsetFactory = fnName => pipe(
  unapply(identity),
  juxt([
    P(0, handleBody),
    P(1, getAlias),
  ]),
  ([body, alias]) => `${fnName}(${body})${alias}`,
  knexRaw,
);

/**
 * @func
 * @name jsonToRecordset
 * @since v0.0.5-beta
 * @category JSON
 * @example
 *  knex
 *    .select('*')
 *    .from(jsonToRecordset([
 *      { id: 1, name: 'Vasiliy' },
 *      { id: 2, name: 'Dmitry' },
 *      { id: 3, name: 'Nikita' },
 *    ], 'as (id int, name text)'));
 */
const jsonToRecordset = jsonToRecordsetFactory('json_to_recordset');

/**
 * @func
 * @name jsonToRecordset
 * @since v0.0.5-beta
 * @category JSON
 * @example
 *  knex
 *    .select('*')
 *    .from(jsonbToRecordset([
 *      { id: 1, name: 'Vasiliy' },
 *      { id: 2, name: 'Dmitry' },
 *      { id: 3, name: 'Nikita' },
 *    ], 'as (id int, name text)'));
 */
const jsonbToRecordset = jsonToRecordsetFactory('jsonb_to_recordset');

module.exports = {
  jsonToRecordset,
  jsonbToRecordset,
};
