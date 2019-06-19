const {
  T,
  cond,
  identity,
  juxt,
  nth,
  pipe,
  unapply,
} = require('ramda');
const {
  isKnexRaw,
  getAlias,
  knexRaw,
} = require('../builder-base');

const handleBody = cond([
  [isKnexRaw, raw => `(${raw.toString()})`],
  [T, identity],
]);

/**
 * Process n-th element function
 * f(arr[n])
 * @param {Number} n - index
 * @param {Function} f - handler
 */
const P = (n, f) => pipe(nth(n), f);

const jsonArrayElementsFactory = fnName => pipe(
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
 * @name jsonArrayElements
 * @since v0.0.1
 * @category JSON
 */
const jsonArrayElements = jsonArrayElementsFactory('json_array_elements');

/**
 * @func
 * @name jsonbArrayElements
 * @since v0.0.1
 * @category JSON
 */
const jsonbArrayElements = jsonArrayElementsFactory('jsonb_array_elements');

module.exports = {
  jsonArrayElements,
  jsonbArrayElements,
};
