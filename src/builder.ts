import { Value, formatColumns, raw } from './tools';
import { isRaw } from '../src/tools';
import knex from 'knex';

// eslint-disable-next-line
// @ts-ignore
import Raw = require('knex/lib/raw');

export default class Builder extends Raw {
  private sql = '';
  private alias: string | null = null;
  private binds: Value[] = [];

  constructor(v: string | knex.Raw) {
    super({});

    this.setSql(v);
  }

  private setSql(v: string | knex.Raw) {
    if (isRaw(v)) {
      // eslint-disable-next-line
      // @ts-ignore
      const { sql, bindings } = v;

      this.sql = sql;
      this.binds = bindings as Value[];

      return;
    }

    this.sql = v as string;
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
    return raw(this.getSql(), this.binds).toString();
  }

  pushBindings(bindings: Value[]): Builder {
    this.binds = this.binds.concat(bindings);

    return this;
  }

  as(alias: string): Builder {
    this.alias = alias;

    return this;
  }
}
