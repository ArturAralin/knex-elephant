import * as knex from 'knex';
import {
  pgFn,
  formatColumns,
} from '../tools';

export function toJson(v: knex.Raw | string): knex.Raw {
  return pgFn('to_json', [formatColumns(v)]);
}

export function toJsonb(v: knex.Raw | string): knex.Raw {
  return pgFn('to_jsonb', [formatColumns(v)]);
}
