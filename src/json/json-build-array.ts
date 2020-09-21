import {
  serialize,
  isRaw,
  formatColumns,
  pgFn,
  Value as BindingValue,
} from '../tools';
import { Value } from '../types';
import Builder from '../builder';
import * as knex from 'knex';


/**
 * @internal
 */
function internalJsonBuildArray(
  fnName: string,
  values: Value[],
): Builder {
  const bindings: BindingValue[] = [];
  const args: string[] = [];

  values.forEach((value: Value) => {
    if (isRaw(value) || value instanceof Builder) {
      const {
        sql,
        bindings: rawBindings,
      } = (value as knex.Raw).toSQL();

      args.push(sql);
      bindings.push(...rawBindings);

      return;
    }

    // handle string as column
    if (typeof value === 'string') {
      args.push(formatColumns(value));

      return;
    }

    args.push(serialize(value));
  });

  return new Builder(pgFn(fnName, args)).pushBindings(bindings);
}

export function jsonBuildArray(v: Value[]): Builder {
  return internalJsonBuildArray('json_build_array', v);
}

export function jsonbBuildArray(v: Value[]): Builder {
  return internalJsonBuildArray('jsonb_build_array', v);
}
