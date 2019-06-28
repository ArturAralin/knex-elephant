const { expect } = require('chai');
const { knex } = require('../../tests/testing-tools');
const {
  jsonToRecordset,
} = require('../index');

describe.only('json[b]_to_recordset', () => {
  it('Knex.Raw compatibility', () => {
    const sql = jsonToRecordset(knex.raw('some_raw_text'), 'as x').toString();

    expect(sql).to.equals('json_to_recordset(some_raw_text) as x');
  });

  it('should return json_to_recordset construction', () => {
    const json = JSON.stringify([
      { a: 10, b: 'c' },
      { a: 20, b: 'd' },
    ]);
    const sql = jsonToRecordset(json, 'as alias(a int, b text)').toString();

    expect(sql).to.equals('json_to_recordset(\'[{"a":10,"b":"c"},{"a":20,"b":"d"}]\') as alias(a int, b text)');
  });

  it('should return json_to_recordset construction', () => {
    const records = [
      { a: 10, b: 'c' },
      { a: 20, b: 'd' },
    ];
    const sql = jsonToRecordset(records, 'as alias(a int, b text)').toString();

    expect(sql).to.equals('json_to_recordset(\'[{"a":10,"b":"c"},{"a":20,"b":"d"}]\') as alias(a int, b text)');
  });
});
