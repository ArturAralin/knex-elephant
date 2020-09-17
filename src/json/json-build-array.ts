import {
  serialize,
  isRaw,
  formatColumns,
  pgFn
} from '../tools';
import { Value } from '../types';
import Builder from '../builder';
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
): Builder {
  const args = values.map(mapValue);

  return new Builder(pgFn(fnName, args));
}

export function jsonBuildArray(v: Value[]): Builder {
  return internalJsonBuildArray('json_build_array', v);
}

export function jsonbBuildArray(v: Value[]): Builder {
  return internalJsonBuildArray('jsonb_build_array', v);
}
