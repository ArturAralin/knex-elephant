const { expect } = require('chai');
const {
  jsonArrayElements,
} = require('../index');

describe('json[b]_array_elements', () => {
  it('should return json_array_elements construction with alias', () => {
    const sql = jsonArrayElements('column_name', 'as alias').toString();

    expect(sql).to.equals('json_array_elements(column_name) as alias');
  });
});
