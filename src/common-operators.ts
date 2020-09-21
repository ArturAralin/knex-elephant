import Builder from "./builder";
import { getValue } from "./tools";
import knex from 'knex';

export function concat(
  v1: string | knex.Raw | Builder,
  v2: string | knex.Raw | Builder,
): Builder {
  const [
    v1Sql,
    v1Bindings,
  ] = getValue(v1 as knex.Raw);
  const [
    v2Sql,
    v2Bindings,
  ] = getValue(v2 as knex.Raw);

  return new Builder(`${v1Sql} || ${v2Sql}`).pushBindings([
    ...v1Bindings,
    ...v2Bindings,
  ]);
}

export function subtract(
  v1: string | knex.Raw | Builder,
  v2: string | knex.Raw | Builder | number,
): Builder {
  const [
    v1Sql,
    v1Bindings,
  ] = getValue(v1 as knex.Raw);
  const [
    v2Sql,
    v2Bindings,
  ] = getValue(v2 as knex.Raw);

  return new Builder(`${v1Sql} - ${v2Sql}`).pushBindings([
    ...v1Bindings,
    ...v2Bindings,
  ]);
}
