const { expect } = require('chai');
const {
  jsonEach,
  jsonbEach,
} = require('../index');
const { knex } = require('../../tests/testing-tools');

describe.only('json[b]_each', () => {
  it('compatibility with Knex.Raw', () => {
    const sql = jsonEach(knex.raw('some_raw_query')).toString();

    expect(sql).to.equals('json_each(some_raw_query)');
  });

  it('should return jsonb_each construction', () => {
    const sql = jsonbEach('some.column').toString();

    expect(sql).to.equals('jsonb_each("some"."column")');
  });

  it('should return json_each construction with serialized object', () => {
    const obj = {
      k1: 1,
      k2: 'v',
      k3: [1, 2, 'ok'],
    };
    const sql = jsonEach(obj, 'as alias').toString();

    expect(sql).to.equals('json_each(\'{"k1":1,"k2":"v","k3":[1,2,"ok"]}\') as alias');
  });
});
