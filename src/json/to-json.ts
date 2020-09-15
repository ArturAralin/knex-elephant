import {
  pgFn,
  formatColumns,
} from '../tools';
import * as knex from 'knex';

export function toJson(v: knex.Raw | string): knex.Raw {
  return pgFn('to_json', [formatColumns(v)]);
}

export function toJsonb(v: knex.Raw | string): knex.Raw {
  return pgFn('to_jsonb', [formatColumns(v)]);
}
