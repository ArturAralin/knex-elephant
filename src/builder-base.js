const knexLib = require('knex');

const knex = knexLib({ client: 'pg' });

const QueryBuilder = require('knex/lib/query/builder');

const builderBase = {
  knex,
  as(as) {
    this.alias = as;
    return this;
  },
  fnBuild(body) {
    return `${this.fnName}(${body})`;
  },
  buildRecursive() {
    const body = typeof this.body.buildRecursive === 'function'
      ? this.body.buildRecursive()
      : this.body;

    switch (this.type) {
      case 'fn':
        return this.fnBuild(body);
      default:
        throw new Error(`Unknown builder type "${this.type}"`);
    }
  },
  build() {
    return {
      [this.alias]: knex.raw(this.buildRecursive()),
    };
  },
};


const resolveArgs = (args) => {
  if (Array.isArray(args[0])) {
    return args[0];
  }

  return args;
};

const isKnex = o => o instanceof QueryBuilder;

const knexRaw = sql => knex.raw(sql);

module.exports = {
  resolveArgs,
  builderBase,
  isKnex,
  knexRaw,
};
