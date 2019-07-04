const { expect } = require('chai');
const { knex } = require('../../tests/testing-tools');
const {
  jsonToRecordset,
  jsonbToRecordset,
} = require('../index');

describe('json[b]_to_recordset', () => {
  it('Knex.Raw compatibility', () => {
    const sql = jsonToRecordset(knex.raw('some_raw_text'), 'as x').toString();

    expect(sql).to.equals('json_to_recordset(some_raw_text) as x');
  });

  it('should return json_to_recordset construction with serialized array', () => {
    const records = [
      { a: 10, b: 'c' },
      { a: 20, b: 'd' },
    ];
    const sql = jsonToRecordset(records, 'as alias(a int, b text)').toString();

    expect(sql).to.equals('json_to_recordset(\'[{"a":10,"b":"c"},{"a":20,"b":"d"}]\') as alias(a int, b text)');
  });

  it('should return jsonb_to_recordset construction', () => {
    const sql = jsonbToRecordset('some.column').toString();

    expect(sql).to.equals('jsonb_to_recordset("some"."column")');
  });
});
