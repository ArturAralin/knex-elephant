## Functions

<dl>
<dt><a href="#P">P(n, f)</a></dt>
<dd><p>Process n-th element function
f(arr[n])</p>
</dd>
<dt><a href="#jsonAgg">jsonAgg()</a></dt>
<dd></dd>
<dt><a href="#jsonArrayElements">jsonArrayElements()</a></dt>
<dd></dd>
<dt><a href="#jsonbArrayElements">jsonbArrayElements()</a></dt>
<dd></dd>
<dt><a href="#jsonBuildObject">jsonBuildObject()</a></dt>
<dd></dd>
<dt><a href="#jsonbAgg">jsonbAgg()</a></dt>
<dd></dd>
<dt><a href="#jsonBuildObject">jsonBuildObject()</a></dt>
<dd></dd>
</dl>

<a name="P"></a>

## P(n, f)
Process n-th element function
f(arr[n])

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | index |
| f | <code>function</code> | handler |

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
