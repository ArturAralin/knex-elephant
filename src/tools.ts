import knex from 'knex';

/**
 * @internal
 */
export const client = knex({ client: 'pg' });

export type Value = number
  | string
  | boolean
  | Date;


/**
 * @internal
 */
// Knex doesn't export Raw class directly
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Raw = client.raw('').__proto__.constructor;

/**
 * @internal
 */
export const raw = (
  sql: string,
  bindings: readonly Value[] = [],
): knex.Raw => client.raw(sql, bindings);

/**
 * @internal
 */
export const isRaw = (v: unknown): boolean => typeof v === 'object' && v instanceof Raw;

/**
 * @internal
 */
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

/**
 * @internal
 */
export function pgFn(
  functionName: string,
  args: (knex.Raw | string)[],
): string {
  const argsStr = args
    .map((arg) => arg.toString())
    .join(', ');

  return `${functionName}(${argsStr})`;
}

/**
 * @internal
 */
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

export function castTo(type: string, v: string | knex.Raw): knex.Raw {
  const value = isRaw(v)
    ? v
    : formatColumns(v);

  return raw(`${value}::${type}`);
}

/**
 * @internal
 */
function internalJsonStringify(type: string, v: unknown): knex.Raw {
  const json = JSON.stringify(v).replace("'", "''");

  return raw(`'${json}'::${type}`);
}

export function jsonbStringify(v: unknown): knex.Raw {
  return internalJsonStringify('jsonb', v);
}

export function jsonStringify(v: unknown): knex.Raw {
  return internalJsonStringify('json', v);
}
