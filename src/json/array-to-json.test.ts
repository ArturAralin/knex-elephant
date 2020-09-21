import { arrayToJson, arrayToJsonb } from './array-to-json';
import { raw } from '../tools';

import { expect } from 'chai';

describe('array_to_json[b]', () => {
  it('should return array_to_json("column")', () => {
    const result = arrayToJson('column').toString();

    expect(result).to.equals('array_to_json("column")');
  });

  it('should keep bindings', () => {
    const result = arrayToJson(raw('{1, 2, ?}', [3]));
    const { sql, bindings } = result.toSQL();

    expect(sql).to.equals('array_to_json({1, 2, ?})');
    expect(bindings).to.eqls(bindings);
    expect(result.toString()).to.equals(`array_to_json({1, 2, 3})`);
  });

  it('should return array_to_json("column")', () => {
    const result = arrayToJson('column').toString();

    expect(result).to.equals('array_to_json("column")');
  });

  it('should return array_to_json("column", true)', () => {
    const result = arrayToJson('column', true).toString();

    expect(result).to.equals('array_to_json("column", true)');
  });

  it('should return array_to_jsonb("column", true)', () => {
    const result = arrayToJsonb('column', true).toString();

    expect(result).to.equals('array_to_jsonb("column", true)');
  });
});
