import { jsonBuildObject } from './json-build-object';
import { raw } from '../tools';
import Builder from '../builder';
import { expect } from 'chai';

describe('json[b]_build_object', () => {
  it('should be instance of Builder', () => {
    const result = jsonBuildObject({
      column_name: raw('raw_value')
    }).as('another_name');

    expect(result).to.be.instanceOf(Builder);
  });

  it('should be self compatible', () => {
    const result = jsonBuildObject({
      subObj: jsonBuildObject({
        fieldName: 'some_column',
      }),
    }).toString();

    expect(result).to.equals(`json_build_object('subObj', json_build_object('fieldName', "some_column"))`);
  });

  it('should keep all bindings', () => {
    const result = jsonBuildObject({
      bindOne: raw('?', ['some string']),
      subObj: jsonBuildObject({
        fieldName: raw('?', ['nested string']),
      }),
    });

    const { sql, bindings } = result.toSQL();

    expect(sql).to.equals(`json_build_object('bindOne', ?, 'subObj', json_build_object('fieldName', ?))`);
    expect(bindings).to.eqls(['some string', 'nested string']);
    expect(result.toString()).to.equals(`json_build_object('bindOne', 'some string', 'subObj', json_build_object('fieldName', 'nested string'))`);
  });

  it(`should return json_build_object('column_name', raw_value)`, () => {
    const result = jsonBuildObject({
      column_name: raw('raw_value')
    }).toString();

    expect(result).to.equals(`json_build_object('column_name', raw_value)`);
  });

  it(`should return json_build_object('column_name', "another_column")`, () => {
    const result = jsonBuildObject({
      column_name: 'another_column',
    }).toString();

    expect(result).to.equals(`json_build_object('column_name', "another_column")`);
  });

  it(`should return json_build_object('column_number', 1)`, () => {
    const result = jsonBuildObject({
      column_number: 1,
    }).toString();

    expect(result).to.equals(`json_build_object('column_number', 1)`);
  });

  it(`should return json_build_object('column_boolean', false)`, () => {
    const result = jsonBuildObject({
      column_boolean: false,
    }).toString();

    expect(result).to.equals(`json_build_object('column_boolean', false)`);
  });
});
