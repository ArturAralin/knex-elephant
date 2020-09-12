import { expect } from 'chai';
import { arrayToJson, arrayToJsonb } from './array-to-json';

describe('array_to_json[b]', () => {
  it('should return array_to_json("column")', () => {
    const result = arrayToJson('column').toString();

    expect(result).to.equals('array_to_json("column")');
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
