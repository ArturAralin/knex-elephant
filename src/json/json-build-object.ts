import {
  serialize,
  isRaw,
  formatColumns,
  pgFn
} from '../tools';
import * as knex from 'knex';


type Value = knex.Raw | string | number | boolean | null;

interface JsonBuildObjectMap {
  [key: string]: Value;
}

function mapValue(v: Value) {
  if (isRaw(v)) {
    return (v as knex.Raw).toString();
  }

  if (typeof v === 'string') {
    return formatColumns(v);
  }

  return serialize(v);
}

function internalJsonBuildObject(
  fnName: string,
  v: JsonBuildObjectMap,
): knex.Raw {
  const args = Object
    .entries(v)
    .map(([key, value]) => {
      return [
        formatColumns(key),
        mapValue(value),
      ];
    })
    .reduce((acc, val) => acc.concat(val), []);

  return pgFn(fnName, args);
}

export function jsonBuildObject(v: JsonBuildObjectMap): knex.Raw {
  return internalJsonBuildObject('json_build_object', v);
}

export function jsonbBuildObject(v: JsonBuildObjectMap): knex.Raw {
  return internalJsonBuildObject('jsonb_build_object', v);
}
