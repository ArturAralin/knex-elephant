import {
  jsonProp,
  jsonPropValue,
  jsonPath,
  jsonPathValue,
} from './operators';
import { raw } from '../tools';
import { expect } from 'chai';

describe('operators', () => {
  describe('->', () => {
    it('should wrap into single quotes', () => {
      const result = jsonProp('field_name', 'json_column').toString();

      expect(result).to.equals(`"json_column"->'field_name'`);
    });

    it('should pass number', () => {
      const result = jsonProp(2, 'json_column').toString();

      expect(result).to.equals(`"json_column"->2`);
    });
  });

  describe('->>', () => {
    it('should wrap into single quotes', () => {
      const result = jsonPropValue('field_name', 'json_column').toString();

      expect(result).to.equals(`"json_column"->>'field_name'`);
    });

    it('should pass number', () => {
      const result = jsonPropValue(2, 'json_column').toString();

      expect(result).to.equals(`"json_column"->>2`);
    });
  });

  describe('#>', () => {
    it('should wrap into single quotes', () => {
      const result = jsonPath(['field_name', 1], 'json_column').toString();

      expect(result).to.equals(`"json_column"#>'{field_name, 1}'`);
    });

    it('should work with raw', () => {
      const json = raw(`'${JSON.stringify({
        fieldName: ['miss', 'target value'],
      })}'::jsonb`);
      const result = jsonPath(['fieldName', 1], json).toString();

      expect(result).to.equals(`'{"fieldName":["miss","target value"]}'::jsonb#>'{fieldName, 1}'`);
    });
  });

  describe('#>>', () => {
    it('should wrap into single quotes', () => {
      const result = jsonPathValue(['field_name', 1], 'json_column').toString();

      expect(result).to.equals(`"json_column"#>>'{field_name, 1}'`);
    });

    it('should work with raw', () => {
      const json = raw(`'${JSON.stringify({
        fieldName: ['miss', 'target value'],
      })}'::jsonb`);
      const result = jsonPathValue(['fieldName', 1], json).toString();

      expect(result).to.equals(`'{"fieldName":["miss","target value"]}'::jsonb#>>'{fieldName, 1}'`);
    });
  });
});
