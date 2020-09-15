import { toJson, toJsonb } from './to-json';
import { expect } from 'chai';

describe('to_json[b]', () => {
  it('should return to_json("column")', () => {
    const result = toJson('column').toString();

    expect(result).to.equals('to_json("column")');
  });

  it('should return to_jsonb("column")', () => {
    const result = toJsonb('column').toString();

    expect(result).to.equals('to_jsonb("column")');
  });
});
