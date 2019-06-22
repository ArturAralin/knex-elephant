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
  ): knex.Raw;

  export function jsonbAgg(
    distinct: string,
    body: string | knex.Raw,
    alias?: string,
  ): knex.Raw;

  export function jsonArrayElements(
    body: string | knex.Raw,
    alias?: string,
  ): knex.Raw;

  export function jsonbArrayElements(
    body: string | knex.Raw,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    body: string | knex.Raw | knex.QueryBuilder,
    alias?: string,
  ): knex.Raw;

  type UnnestArrayArg = string[] | number[];
  export function unnest(
    arr0: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    arr0: UnnestArrayArg,
    arr1: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    arr0: UnnestArrayArg,
    arr1: UnnestArrayArg,
    arr2: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    arr0: UnnestArrayArg,
    arr1: UnnestArrayArg,
    arr2: UnnestArrayArg,
    arr3: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    arr0: UnnestArrayArg,
    arr1: UnnestArrayArg,
    arr2: UnnestArrayArg,
    arr3: UnnestArrayArg,
    arr4: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;

  export function unnest(
    arr0: UnnestArrayArg,
    arr1: UnnestArrayArg,
    arr2: UnnestArrayArg,
    arr3: UnnestArrayArg,
    arr4: UnnestArrayArg,
    arr5: UnnestArrayArg,
    alias?: string,
  ): knex.Raw;
}