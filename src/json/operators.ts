import {
  raw,
  isRaw,
  formatColumns,
} from '../tools';
import knex from 'knex';

function internalJsonValueAccess(
  operator: string,
  prop: string | number,
  v: string | knex.Raw
): knex.Raw {

  const value = isRaw(v)
    ? v
    : formatColumns(v);
  const propValue = typeof prop === 'number'
    ? prop
    : `'${prop}'`

  return raw(`${value}${operator}${propValue}`);
}

/**
 * ->
 */
export function jsonProp(prop: string | number, v: string | knex.Raw): knex.Raw {
  return internalJsonValueAccess('->', prop, v);
}

/**
 * ->>
 */
export function jsonPropValue(prop: string | number, v: string | knex.Raw): knex.Raw {
  return internalJsonValueAccess('->>', prop, v);
}