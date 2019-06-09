const { expect } = require('chai');
const { knex } = require('../../tests/testing-tools');
const {
  jsonAgg,
} = require('../index');

describe('json[b]_agg', () => {
  it('knex compatibility', () => {
    const sql = knex
      .select(
        jsonAgg('"field"'),
      )
      .toString();

    expect(sql).to.equals('select json_agg("field")');
  });

  it('compatibility with Raw query', () => {
    const rawQ = knex.raw('some_expression');
    const sql = jsonAgg(rawQ).toString();

    expect(sql).to.equals('json_agg(some_expression)');
  });

  it('should create json_agg construction', () => {
    const sql = jsonAgg('some_query').toString();

    expect(sql).to.equals('json_agg(some_query)');
  });

  it('should create json_agg construction with alias', () => {
    const sql = jsonAgg('some_query', 'as xxx').toString();

    expect(sql).to.equals('json_agg(some_query) as xxx');
  });

  it('should create json_agg construction with distinct', () => {
    const sql = jsonAgg('distinct', 'some_query').toString();

    expect(sql).to.equals('json_agg(distinct some_query)');
  });

  it('should create json_agg construction with alias and distinct keyword', () => {
    const sql = jsonAgg('distinct', '"hello_world"', 'as FFF').toString();

    expect(sql).to.equals('json_agg(distinct "hello_world") as FFF');
  });
});
