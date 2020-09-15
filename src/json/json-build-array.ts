import {
  serialize,
  isRaw,
  formatColumns,
  pgFn
} from '../tools';
import { Value } from '../types';
import * as knex from 'knex';

function mapValue(v: Value) {
  if (isRaw(v)) {
    return (v as knex.Raw).toString();
  }

  if (typeof v === 'string') {
    return formatColumns(v);
  }

  return serialize(v);
}

function internalJsonBuildArray(
  fnName: string,
  values: Value[],
): knex.Raw {
  const args = values.map(mapValue);

  return pgFn(fnName, args);
}

export function jsonBuildArray(v: Value[]): knex.Raw {
  return internalJsonBuildArray('json_build_array', v);
}

export function jsonbBuildArray(v: Value[]): knex.Raw {
  return internalJsonBuildArray('jsonb_build_array', v);
}
