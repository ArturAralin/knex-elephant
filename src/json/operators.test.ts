import {
  jsonProp,
  jsonPropValue,
} from './operators';
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
});
