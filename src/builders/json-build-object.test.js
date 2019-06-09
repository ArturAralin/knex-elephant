const knexLib = require('knex');
const { expect } = require('chai');

const knex = knexLib({ client: 'pg' });
const {
  jsonBuildObject,
  jsonbBuildObject,
} = require('../index');

describe('json[b]_build_object', () => {
  it('knex compatibility', () => {
    const sql = knex
      .select(
        jsonBuildObject(
          ['keyName', 'columnName'],
        ),
      )
      .toString();

    expect(sql).to.equals('select json_build_object(\'keyName\', "columnName")');
  });

  it('should make a json_build_object construction', () => {
    const sql = jsonBuildObject([
      'k', 'v',
    ]).toString();

    expect(sql).to.equals('json_build_object(\'k\', "v")');
  });

  it('should make a jsonb_build_object construction', () => {
    const sql = jsonbBuildObject([
      'k', 'v',
    ]).toString();

    expect(sql).to.equals('jsonb_build_object(\'k\', "v")');
  });

  it('should make a json_build_object construction with subquery', () => {
    const sql = jsonBuildObject([
      'k', knex.select('*').from('T'),
    ]).toString();

    expect(sql).to.equals('json_build_object(\'k\', (select * from "T"))');
  });
});
