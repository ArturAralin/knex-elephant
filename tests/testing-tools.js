const knexLib = require('knex');

const knex = knexLib({ client: 'pg' });

module.exports = {
  knex,
};
