import {
  jsonBuildArray,
  jsonbBuildArray,
} from './json-build-array';
import { raw } from '../tools';
import { expect } from 'chai';

describe('json[b]_build_array', () => {
  it('should return json_build_array("column_name", 1, false, raw_value)', () => {
    const result = jsonBuildArray(['column_name', 1, false, raw('raw_value')]).toString();

    expect(result).to.equals('json_build_array("column_name", 1, false, raw_value)');
  });

  it('should return jsonb_build_array("column_name", 1, false, raw_value)', () => {
    const result = jsonbBuildArray(['column_name', 1, false, raw('raw_value')]).toString();

    expect(result).to.equals('jsonb_build_array("column_name", 1, false, raw_value)');
  });
});
