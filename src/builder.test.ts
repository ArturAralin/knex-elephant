import { client, raw, isRaw } from './tools';
import Builder from './builder';
import { expect } from 'chai';

describe('Builder', () => {
  it('should be compatible with knex', () => {
    const result = client.select([
      new Builder('some_raw_value'),
    ]).toString();

    expect(result).to.equals('select some_raw_value');
  });

  it('should keep attached bindings', () => {
    const builder = new Builder(raw('select ?;', ['some string']));
    const sqlObj = builder.toSQL();

    expect(sqlObj.sql).to.eqls('select ?;');
    expect(sqlObj.bindings).to.eqls(['some string']);
    expect(builder.toString()).to.equals(`select 'some string';`);
  });

  it('should push bindings', () => {
    const builder = new Builder(raw('select ?;')).pushBindings(['some string']);

    const sqlObj = builder.toSQL();

    expect(sqlObj.sql).to.eqls('select ?;');
    expect(sqlObj.bindings).to.eqls(['some string']);
    expect(builder.toString()).to.equals(`select 'some string';`);
  });

  it('should extends of knex.Raw', () => {
    const builder = new Builder('');

    expect(isRaw(builder)).to.equals(true);
  });
});