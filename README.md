# knex-elephant

PostgreSQL special sql functions for Knex library

# how to use
```typescript
import { jsonBuildObject } from 'knex-elephant';

knex
  .select([
    jsonBuildObject({
      fieldName: 10,
    }).as('myAlias'),
  ])
  .toString();

  // select json_build_object('fieldName', 10) as "myAlias"
```
