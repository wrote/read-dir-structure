# @wrote/read-dir-structure

[![npm version](https://badge.fury.io/js/%40wrote%2Fread-dir-structure.svg)](https://npmjs.org/package/@wrote/read-dir-structure)

`@wrote/read-dir-structure` is Node.js package to a read directory structure.

```sh
yarn add -E @wrote/read-dir-structure
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`Structure` Type](#structure-type)
  * [`async readDirStructure(path: string): Structure`](#async-readdirstructurepath-string-structure)
  * [`async getFiles(content: Structure.content, path: string): Array<string>`](#async-getfilescontent-structurecontentpath-string-arraystring)
- [Reasons for Errors](#reasons-for-errors)
- [Copyright](#copyright)

## API

There is a single default export function, import it with the following statement:

```js
import readDirStructure from '@wrote/read-dir-structure'
```

### `Structure` Type

The return type of the function is a directory `Structure`. It is an associative array which contains the next properties:

| Property |    Type     |                                                                                 Description                                                                                  |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | `string` | The result of the _lstat_ and one of the following: `Directory`, `File`, `SymbolicLink`.  |
| content  | `Structure` | If the type is `Directory`, the object will also have a `content` which also is a `Structure`. Therefore, the whole nested structure will be read. See below for an example. |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>

### `async readDirStructure(`<br/>&nbsp;&nbsp;`path: string,`<br/>`): Structure`

Reads the structure of the directory.

```js
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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true" width="25"></a></p>

### `async getFiles(`<br/>&nbsp;&nbsp;`content: Structure.content,`<br/>&nbsp;&nbsp;`path: string,`<br/>`): Array<string>`

After running the `readDirStructure`, this function can be used to flatten the `content` output and return the list of all files (not including symlinks).

```js
/* yarn example/ */
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'

(async () => {
  const path = 'example/directory'
  const res = await readDirStructure(path)
  const files = getFiles(res.content, path)
  console.log(JSON.stringify(files, null, 2))
})()
```

```json
[
  "example/directory/fileA.txt",
  "example/directory/fileB.txt",
  "example/directory/test.json",
  "example/directory/subdirectory/subdirFileA.txt",
  "example/directory/subdirectory/subdirFileB.txt"
]
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Reasons for Errors

The following errors can happen and have been [context tested](test/spec/errors.js) against:

|          Happens when...          |   code    |                        Message                         |
| --------------------------------- | --------- | ------------------------------------------------------ |
| not passing any path              | `-` | Please specify a path to the directory                 |
| passing a path to a symbolic link | `ENOTDIR` | Path is not a directory                                |
| passing a path to a file          | `ENOTDIR` | Path is not a directory                                |
| directory does not exist          | `ENOENT` | ENOENT: no such file or directory, lstat '%DIRECTORY%' |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://wrote.cc">Wrote</a> 2019</th>
    <th>
      <a href="https://wrote.cc">
        <img src="https://avatars3.githubusercontent.com/u/40831417?s=100" width="100" alt="Wrote" />
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>