import {
  serialize,
  isRaw,
  formatColumns,
  pgFn
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
function mapValue(v: Value) {
  if (isRaw(v)) {
    return (v as knex.Raw).toString();
  }

  if (typeof v === 'string') {
    return formatColumns(v);
  }

  return serialize(v);
}

/**
 * @internal
 */
function internalJsonBuildObject(
  fnName: string,
  v: JsonBuildObjectMap,
): Builder {
  const args = Object
    .entries(v)
    .map(([key, value]) => {
      return [
        formatColumns(key),
        mapValue(value),
      ];
    })
    .reduce((acc, val) => acc.concat(val), []);

  return new Builder(pgFn(fnName, args));
}

export function jsonBuildObject(v: JsonBuildObjectMap): Builder {
  return internalJsonBuildObject('json_build_object', v);
}

export function jsonbBuildObject(v: JsonBuildObjectMap): Builder {
  return internalJsonBuildObject('jsonb_build_object', v);
}
