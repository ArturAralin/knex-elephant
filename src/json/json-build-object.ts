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

interface JsonBuildObjectMap {
  [key: string]: Value;
}

/**
 * @internal
 */
function internalJsonBuildObject(
  fnName: string,
  v: JsonBuildObjectMap,
): Builder {
  const bindings: BindingValue[] = [];
  const args: string[] = [];

  Object
    .entries(v)
    .forEach(([key, value]) => {
      args.push(`'${key}'`);

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

export function jsonBuildObject(v: JsonBuildObjectMap): Builder {
  return internalJsonBuildObject('json_build_object', v);
}

export function jsonbBuildObject(v: JsonBuildObjectMap): Builder {
  return internalJsonBuildObject('jsonb_build_object', v);
}
