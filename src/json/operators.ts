import {
  raw,
  isRaw,
  formatColumns,
} from '../tools';
import knex from 'knex';

/**
 * @internal
 */
function internalJsonValueAccess(
  operator: string,
  prop: string | number,
  v: string | knex.Raw
): knex.Raw {
  const column = isRaw(v)
    ? v
    : formatColumns(v);
  const propValue = typeof prop === 'number'
    ? prop
    : `'${prop}'`

  return raw(`${column}${operator}${propValue}`);
}

/**
 * Implementation for operator ->
 */
export function jsonProp(prop: string | number, v: string | knex.Raw): knex.Raw {
  return internalJsonValueAccess('->', prop, v);
}

/**
 * Implementation for operator ->>
 */
export function jsonPropValue(prop: string | number, v: string | knex.Raw): knex.Raw {
  return internalJsonValueAccess('->>', prop, v);
}

/**
 * Implementation for operator #>
 */
export function jsonPath(props: (string | number)[], v: string | knex.Raw): knex.Raw {
  const args = `{${props.join(', ')}}`;

  return internalJsonValueAccess('#>', args, v);
}

/**
 * Implementation for operator #>
 */
export function jsonPathValue(props: (string | number)[], v: string | knex.Raw): knex.Raw {
  const args = `{${props.join(', ')}}`;

  return internalJsonValueAccess('#>>', args, v);
}
