import {
  pgFn,
  raw,
  formatColumns,
  isRaw,
  Value as BindingValue,
} from '../tools';
import Builder from '../builder';
import * as knex from 'knex';

/**
 * @internal
 */
function getValue(v: knex.Raw | string | Builder): [string, BindingValue[]] {
  if (isRaw(v) || v instanceof Builder) {
    const {
      sql,
      bindings,
    } = (v as knex.Raw).toSQL();

    return [sql, bindings as BindingValue[]];
  }

  return [formatColumns(v), []];
}

/**
 * @internal
 */
function internalArrayToJson(
  fnName: string,
  v: knex.Raw | string | Builder,
  prettyBool: boolean = false,
): Builder {
  const [value, bindings] = getValue(v);

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
