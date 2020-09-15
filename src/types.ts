import knex from 'knex';

export type Value = knex.Raw | string | number | boolean | null;
