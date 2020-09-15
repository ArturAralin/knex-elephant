import {
  formatColumns,
  raw,
  alias,
} from './tools';
import { expect } from 'chai';

describe('tools', () => {
  describe('formatColumns', () => {
    it('should pass knex.Raw', () => {
      const result = formatColumns(raw('raw_value'));

      expect(result).to.equals('raw_value');
    });

    it('should wrap into quotes', () => {
      const result = formatColumns('column_name');

      expect(result).to.equals('"column_name"');
    });

    it('should wrap table name and column into quotes', () => {
      const result = formatColumns('table_name.column_name');

      expect(result).to.equals('"table_name"."column_name"');
    });

    it('should wrap into quotes', () => {
      const result = formatColumns('table_name.column_name as alias_name');

      expect(result).to.equals('"table_name"."column_name" as "alias_name"');
    });
  });

  describe('raw', () => {
    it('should wrap into knex.Raw with bindings', () => {
      const result = raw('select ?', [10]);

      // Below need access to property whose not described into interface
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(result.bindings).to.eqls([10]);
      expect(result.toString()).to.equals('select 10');
    })
  });

  describe('alias', () => {
    it('should set alias with raw', () => {
      const result = alias('another_name', raw('original_name')).toString();

      expect(result).to.equals('original_name as "another_name"');
    });

    it('should set alias with column', () => {
      const result = alias('another_name', 'original_name').toString();

      expect(result).to.equals('"original_name" as "another_name"');
    });
  });
});
