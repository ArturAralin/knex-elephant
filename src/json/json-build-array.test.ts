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

  it('should be self compatible', () => {
    const result = jsonBuildArray([
      'column_name',
      jsonBuildArray([
        'another_column',
      ])
    ]).toString();

    expect(result).to.equals(`json_build_array("column_name", json_build_array("another_column"))`);
  });

  it('should keep bindings', () => {
    const result = jsonBuildArray([
      raw('?', ['str']),
      jsonBuildArray([
        raw('?', ['nested str']),
      ]),
    ]);

    const { sql, bindings } = result.toSQL();

    expect(sql).to.equals(`json_build_array(?, json_build_array(?))`);
    expect(bindings).to.eqls(['str', 'nested str']);
    expect(result.toString()).to.equals(`json_build_array('str', json_build_array('nested str'))`);
  });

  it('should return jsonb_build_array("column_name", 1, false, raw_value)', () => {
    const result = jsonbBuildArray(['column_name', 1, false, raw('raw_value')]).toString();

    expect(result).to.equals('jsonb_build_array("column_name", 1, false, raw_value)');
  });
});
