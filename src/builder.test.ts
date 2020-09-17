import { client } from './tools';
import Builder from './builder';
import { expect } from 'chai';

describe('Builder', () => {
  it('should be compatible with knex', () => {
    const result = client.select([
      new Builder('some_raw_value'),
    ]).toString();

    expect(result).to.equals('select some_raw_value');
  });
});