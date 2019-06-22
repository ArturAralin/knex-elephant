const { expect } = require('chai');
const { knex } = require('../../tests/testing-tools');
const { unnest } = require('../index');

describe.only('unnest', () => {
  it('Knex.QueryBuilder compatibility', () => {
    const sql = unnest(
      knex
        .select()
        .from('T'),
      'as unnest_alias',
    ).toString();

    expect(sql).to.equals('unnest(select * from "T") as unnest_alias');
  });

  it('Knex.Raw compatibility', () => {
    const sql = unnest(
      knex.raw('this_is_raw_query'),
      'as alias',
    ).toString();

    expect(sql).to.equals('unnest(this_is_raw_query) as alias');
  });

  it('should returns unnest construction with column', () => {
    const sql = unnest('table.column').toString();

    expect(sql).to.equals('unnest("table"."column")');
  });

  it('should returns unnest construction with arrays', () => {
    const sql = unnest([1, 2, 3], ['a', 'b', 'c'], 'as t (a, b)').toString();

    expect(sql).to.equals('unnest(array[1,2,3], array[\'a\',\'b\',\'c\']) as t (a, b)');
  });

  it('should returns unnest as subquery', () => {
    const sql = knex
      .select('*')
      .from(unnest(['1', '2', '3'], 'as sub'))
      .toString();

    expect(sql).to.equals('select * from unnest(array[\'1\',\'2\',\'3\']) as sub');
  });
});
