import { jsonbStringify, raw } from './tools';
import { concat, subtract } from './common-operators';
import { expect } from 'chai';

describe('common operators', () => {
  describe('concat', () => {
    it('should keep bindings', () => {
      const result = concat(raw('?', ['hello ']), raw('?', ['world']));
      const { sql, bindings } = result.toSQL();

      expect(sql).to.equals('? || ?');
      expect(bindings).to.eqls(['hello ', 'world']);
      expect(result.toString()).to.equals(`'hello ' || 'world'`);
    });
  });

  describe('subtract', () => {
    it('should keep bindings', () => {
      const result = subtract(raw(`'{"a": "b"}'::jsonb`), raw('?', ['a']));
      const { sql, bindings } = result.toSQL();

      expect(sql).to.equals(`'{"a": "b"}'::jsonb - ?`);
      expect(bindings).to.eqls(['a']);
      expect(result.toString()).to.equals(`'{"a": "b"}'::jsonb - 'a'`);
    });

    it('should accept number as second arg', () => {
      const result = subtract(jsonbStringify(['first', 'second']), 1).toString();

      expect(result).to.equals(`'["first","second"]'::jsonb - 1`);
    });
  });
});
