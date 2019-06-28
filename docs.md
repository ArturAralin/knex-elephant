## Functions

<dl>
<dt><a href="#unnest">unnest()</a></dt>
<dd></dd>
<dt><a href="#jsonAgg">jsonAgg()</a></dt>
<dd></dd>
<dt><a href="#jsonArrayElements">jsonArrayElements()</a></dt>
<dd></dd>
<dt><a href="#jsonbArrayElements">jsonbArrayElements()</a></dt>
<dd></dd>
<dt><a href="#jsonBuildObject">jsonBuildObject()</a></dt>
<dd></dd>
<dt><a href="#jsonToRecordset">jsonToRecordset(body, [alias])</a></dt>
<dd></dd>
<dt><a href="#jsonToRecordset">jsonToRecordset(body, [alias])</a></dt>
<dd></dd>
<dt><a href="#rowToJson">rowToJson()</a></dt>
<dd></dd>
<dt><a href="#jsonbAgg">jsonbAgg()</a></dt>
<dd></dd>
<dt><a href="#jsonBuildObject">jsonBuildObject()</a></dt>
<dd></dd>
</dl>

<a name="unnest"></a>

## unnest()
**Kind**: global function  
**Category**: Array  
**Since**: v0.0.4-beta  
**Example**  
```js
knex
   .select('*')
   .from(unnest(
     [1, 2, 3],
     ['first', 'second', 'third'],
     'as aliases(number, alias)',
   ));
```
<a name="jsonAgg"></a>

## jsonAgg()
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.1  
**Example**  
```js
knex('photos')
   .select([
     'category_id',
     jsonAgg('photo_url', 'as photos')
   ])
   .where('user_id', 1)
   .groupBy('photos')
```
<a name="jsonArrayElements"></a>

## jsonArrayElements()
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.1  
<a name="jsonbArrayElements"></a>

## jsonbArrayElements()
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.1  
<a name="jsonBuildObject"></a>

## jsonBuildObject()
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.1  
**Example**  
```js
knex('users')
   .select([
     'category_id',
     jsonBuildObject([
       'small', 'avatars.small',
       'medium', 'avatars.medium',
       'big', 'avatars.big',
     ]),
   ])
   .leftJoin('avatars', 'avatars.user_id', 'users.id');
```
<a name="jsonToRecordset"></a>

## jsonToRecordset(body, [alias])
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.5-beta  

| Param | Type |
| --- | --- |
| body | <code>Array.&lt;Object&gt;</code> \| <code>Knex.Raw</code> \| <code>String</code> | 
| [alias] | <code>String</code> | 

**Example**  
```js
knex
   .select('*')
   .from(jsonToRecordset([
     { id: 1, name: 'Vasiliy' },
     { id: 2, name: 'Dmitry' },
     { id: 3, name: 'Nikita' },
   ], 'as (id int, name text)'));
```
<a name="jsonToRecordset"></a>

## jsonToRecordset(body, [alias])
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.5-beta  

| Param | Type |
| --- | --- |
| body | <code>Array.&lt;Object&gt;</code> \| <code>Knex.Raw</code> \| <code>String</code> | 
| [alias] | <code>String</code> | 

**Example**  
```js
knex
   .select('*')
   .from(jsonbToRecordset([
     { id: 1, name: 'Vasiliy' },
     { id: 2, name: 'Dmitry' },
     { id: 3, name: 'Nikita' },
   ], 'as (id int, name text)'));
```
<a name="rowToJson"></a>

## rowToJson()
**Kind**: global function  
**Category**: JSON  
**Since**: v0.0.5-beta  
**Example**  
```js
knex('users')
   .select([
     'users.*',
     rowToJson('configs')
   ])
   .leftJoin('configs', 'configs.user_id', 'users.id');
```
<a name="jsonbAgg"></a>

## jsonbAgg()
**Kind**: global function  
**Category**: JSONB  
**Since**: v0.0.1  
**Example**  
```js
knex('photos')
   .select([
     'category_id',
     jsonbAgg('distinct', 'photo_url', 'as photos')
   ])
   .where('user_id', 1)
   .groupBy('photos')
```
<a name="jsonBuildObject"></a>

## jsonBuildObject()
**Kind**: global function  
**Category**: JSONB  
**Since**: v0.0.1  
**Example**  
```js
knex('users')
   .select([
     'category_id',
     jsonBuildObject([
       'small', 'avatars.small',
       'medium', 'avatars.medium',
       'big', 'avatars.big',
     ]),
   ])
   .leftJoin('avatars', 'avatars.user_id', 'users.id');
```
