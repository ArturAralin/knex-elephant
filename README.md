# knex-elephant

PostgreSQL special sql functions for Knex library

# Functions support

## JSON
- [x] json[b] operators
- [ ] advanced json[b] operators
- [ ] json[b] builders
- [ ] json[b] transformers (e.g. json_each)

## Array
- [ ] array operators
- [ ] array transformers

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
