const { expect } = require('chai');
const { rowToJson } = require('../index');
const { knex } = require('../../tests/testing-tools');

describe('row_to_json', () => {
  it('Knex.Raw compatibility', () => {
    const sql = rowToJson(knex.raw('some_raw_query')).toString();

    expect(sql).to.equals('row_to_json(some_raw_query)');
  });

  it('should returns row_to_json construction', () => {
    const sql = rowToJson('table.column', 'as some_name').toString();

    expect(sql).to.equals('row_to_json("table"."column") as some_name');
  });
});
