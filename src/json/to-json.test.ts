import { toJson, toJsonb } from './to-json';
import { raw } from '../tools';
import { expect } from 'chai';

describe('to_json[b]', () => {
  it('should keep bindings', () => {
    const result = toJson(raw('?', ['my value']));
    const { sql, bindings } = result.toSQL();

    expect(sql).to.equals(`to_json(?)`);
    expect(bindings).to.eqls(['my value']);
    expect(result.toString()).to.equals(`to_json('my value')`);
  });

  it('should return to_json("column")', () => {
    const result = toJson('column').toString();

    expect(result).to.equals('to_json("column")');
  });

  it('should return to_jsonb("column")', () => {
    const result = toJsonb('column').toString();

    expect(result).to.equals('to_jsonb("column")');
  });
});
