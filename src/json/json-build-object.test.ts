import { jsonBuildObject } from './json-build-object';
import { raw } from '../tools';
import { expect } from 'chai';

describe('json[b]_build_object', () => {
  it('should return json_build_object("column_name", raw_value)', () => {
    const result = jsonBuildObject({
      column_name: raw('raw_value')
    }).toString();

    expect(result).to.equals('json_build_object("column_name", raw_value)');
  });

  it('should return json_build_object("column_name", "another_column")', () => {
    const result = jsonBuildObject({
      column_name: 'another_column',
    }).toString();

    expect(result).to.equals('json_build_object("column_name", "another_column")');
  });

  it('should return json_build_object("column_number", 1)', () => {
    const result = jsonBuildObject({
      column_number: 1,
    }).toString();

    expect(result).to.equals('json_build_object("column_number", 1)');
  });

  it('should return json_build_object("column_boolean", false)', () => {
    const result = jsonBuildObject({
      column_boolean: false,
    }).toString();

    expect(result).to.equals('json_build_object("column_boolean", false)');
  });
});
