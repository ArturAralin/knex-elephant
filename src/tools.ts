import knex from 'knex';

const client = knex({ client: 'pg' });

export type Value = number
  | string
  | boolean
  | Date;

// Knex doesn't export Raw class directly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Raw = client.raw('').__proto__.constructor;

export const raw = (
  sql: string,
  bindings: readonly Value[] = [],
): knex.Raw => client.raw(sql, bindings);

export const isRaw = (v: unknown): boolean => typeof v === 'object' && v instanceof Raw;

export const formatColumns = (
  v: string | knex.Raw
): string => {
  const getAlias = (s: string) => {
    const [, alias] = s.split(' as ');

    return alias.trim();
  };

  if (isRaw(v)) {
    return v.toString();
  }

  const value = v as string;
  const [first, second] = value.split(/[. ]/);
  const alias = value.match(/ as /)
    ? ` as "${getAlias(value)}"`
    : '';

  const column = first && second
    ? `"${first}"."${second}"`
    : `"${first}"`

  return `${column}${alias}`;
}

export function pgFn(
  functionName: string,
  args: (knex.Raw | string)[],
  bindings: readonly Value[] = [],
): knex.Raw {
  const value = args.join(', ');

  return raw(`${functionName}(${value})`, bindings);
}

export function serialize(p: string | number | boolean | null | knex.Raw): string {
  if (isRaw(p)) {
    return (p as knex.Raw).toString();
  }

  if (p === null) {
    return 'null';
  }

  switch (typeof p) {
    case 'boolean':
    case 'number':
      return p.toString();
    case 'string':
      return `'${p}'`;
    default:
      throw new Error('Unsupported primitive serializing');
  }
}

export function alias(name: string, v: string | knex.Raw): knex.Raw {
  const aliasColumn = formatColumns(name);
  const value = isRaw(v)
    ? v
    : formatColumns(v);

  return raw(`${value} as ${aliasColumn}`);
}
