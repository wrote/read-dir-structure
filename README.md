# @wrote/read-dir-structure

[![npm version](https://badge.fury.io/js/@wrote/read-dir-structure.svg)](https://badge.fury.io/js/@wrote/read-dir-structure)

`@wrote/read-dir-structure` is Node.js package to a read directory structure.

```sh
yarn add -E @wrote/read-dir-structure
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`Structure` Type](#structure-type)
  * [`async readDirStructure(path: string): Structure`](#async-readdirstructurepath-string-structure)
  * [Reasons for Errors](#reasons-for-errors)

## API

There is a single default export function, import it with the following statement:

```js
import readDirStructure from '@wrote/read-dir-structure'
```

### `Structure` Type

The return type of the function is a directory `Structure`. It is an associative array which contains the next properties:

| Property | Type | Description |
| -------- | ---- | ----------- |
| type | `string` | The result of the _lstat_ and one of the following: `Directory`, `File`, `SymbolicLink`. |
| content | `Structure` | If the type is `Directory`, the object will also have a `content` which also is a `Structure`. Therefore, the whole nested structure will be read. See below for an example. |


### `async readDirStructure(`<br/>&nbsp;&nbsp;`path: string,`<br/>`): Structure`

Reads the structure of the directory.

```javascript
/* yarn example/ */
import readDirStructure from '@wrote/read-dir-structure'

(async () => {
  const res = await readDirStructure('example/directory')
  console.log(JSON.stringify(res, null, 2))
})()
```

Output for the [`example/directory`](example/directory):

```json
{
  "content": {
    "fileA-ln.txt": {
      "type": "SymbolicLink"
    },
    "fileA.txt": {
      "type": "File"
    },
    "fileB.txt": {
      "type": "File"
    },
    "test.json": {
      "type": "File"
    },
    "subdirectory": {
      "content": {
        "subdirFileA.txt": {
          "type": "File"
        },
        "subdirFileB.txt": {
          "type": "File"
        }
      },
      "type": "Directory"
    }
  },
  "type": "Directory"
}
```

### Reasons for Errors

The following errors can happen and [have been tested against](test/spec/errors.js):

| Happens when... | code | Message |
| --------------- | ---- | ------- |
| not passing any path | `-` | Please specify a path to the directory |
| passing a path to a symbolic link | `ENOTDIR` | Path is not a directory |
| passing a path to a file | `ENOTDIR` | Path is not a directory |
| directory does not exist | `ENOENT` | ENOENT: no such file or directory, lstat '%DIRECTORY%' |

---

(c) [Art Deco Code][1] 2018

[1]: https://artdeco.bz
