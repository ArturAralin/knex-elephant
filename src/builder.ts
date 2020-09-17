import { Value, formatColumns } from './tools';
import knex from 'knex';

// eslint-disable-next-line
// @ts-ignore
import Raw = require('knex/lib/raw');

export default class Builder extends Raw {
  private sql: string;
  private alias: string | null = null;
  private binds: Value[] = [];

  constructor(v: string | knex.Raw) {
    super({});

    this.sql = v.toString();
  }

  private getSql(): string {
    if (this.alias) {
      return `${this.sql} as ${formatColumns(this.alias)}`;
    }

    return this.sql;
  }

  toSQL(): knex.Sql {
    const sql = this.getSql();

    return {
      method: 'builder',
      options: {},
      sql,
      bindings: this.binds,
      toNative: () => {
        return {
          bindings: this.binds,
          sql,
        }
      }
    }
  }

  toString(): string {
    return this.getSql();
  }

  bindings(bindings: Value[]): Builder {
    this.binds = bindings;

    return this;
  }

  as(alias: string): Builder {
    this.alias = alias;

    return this;
  }
}
