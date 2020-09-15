import {
  pgFn,
  raw,
  formatColumns,
} from '../tools';
import * as knex from 'knex';

function internalArrayToJson(
  fnName: string,
  v: knex.Raw | string,
  prettyBool: boolean = false,
) {
  const args = [
    formatColumns(v),
    prettyBool ? raw('true') : '',
  ].filter(Boolean);

  return pgFn(fnName, args);
}

export function arrayToJson(
  v: knex.Raw | string,
  prettyBool?: boolean,
): knex.Raw {
  return internalArrayToJson('array_to_json', v, prettyBool);
}

export function arrayToJsonb(
  v: knex.Raw | string,
  prettyBool?: boolean,
): knex.Raw {
  return internalArrayToJson('array_to_jsonb', v, prettyBool);
}
