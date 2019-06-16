import * as knex from 'knex';

declare module 'knex-elephant' {
  export function jsonBuildObject(
    fields: Array<string | knex.QueryBuilder | knex.Raw>,
    alias?: string,
  ): knex.Raw;

  export function jsonbBuildObject(
    fields: Array<string | knex.QueryBuilder | knex.Raw>,
    alias?: string,
  ): knex.Raw;

  export function jsonAgg(
    distinct: string,
    body: string | knex.Raw,
    alias?: string,
  ): knex.Raw

  export function jsonbAgg(
    distinct: string,
    body: string | knex.Raw,
    alias?: string,
  ): knex.Raw

}