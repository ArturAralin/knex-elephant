import {
  pgFn,
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

export function toJson(v: knex.Raw | string): Builder {
  const [value, bindings] = getValue(v);

  return new Builder(pgFn('to_json', [value])).pushBindings(bindings);
}

export function toJsonb(v: knex.Raw | string): Builder {
  const [value, bindings] = getValue(v);

  return new Builder(pgFn('to_jsonb', [value])).pushBindings(bindings);
}
