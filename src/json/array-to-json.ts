import {
  pgFn,
  raw,
  formatColumns,
} from '../tools';
import Builder from '../builder';
import * as knex from 'knex';

/**
 * @internal
 */
function internalArrayToJson(
  fnName: string,
  v: knex.Raw | string,
  prettyBool: boolean = false,
): Builder {
  const args = [
    formatColumns(v),
    prettyBool ? raw('true') : '',
  ].filter(Boolean);

  return new Builder(pgFn(fnName, args));
}

export function arrayToJson(
  v: knex.Raw | string,
  prettyBool?: boolean,
): Builder {
  return internalArrayToJson('array_to_json', v, prettyBool);
}

export function arrayToJsonb(
  v: knex.Raw | string,
  prettyBool?: boolean,
): Builder {
  return internalArrayToJson('array_to_jsonb', v, prettyBool);
}
