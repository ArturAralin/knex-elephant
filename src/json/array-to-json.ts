import {
  pgFn,
  raw,
  getValue,
} from '../tools';
import Builder from '../builder';
import * as knex from 'knex';


/**
 * @internal
 */
function internalArrayToJson(
  fnName: string,
  v: knex.Raw | string | Builder,
  prettyBool: boolean = false,
): Builder {
  const [value, bindings] = getValue(v as knex.Raw);

  const args = [
    value,
    prettyBool ? raw('true') : '',
  ].filter(Boolean);

  return new Builder(pgFn(fnName, args)).pushBindings(bindings);
}

export function arrayToJson(
  v: knex.Raw | string | Builder,
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
