import {
  pgFn,
  formatColumns,
} from '../tools';
import Builder from '../builder';
import * as knex from 'knex';

export function toJson(v: knex.Raw | string): Builder {
  return new Builder(pgFn('to_json', [formatColumns(v)]));
}

export function toJsonb(v: knex.Raw | string): Builder {
  return new Builder(pgFn('to_jsonb', [formatColumns(v)]));
}
