# @wrote/read-dir-structure

[![npm version](https://badge.fury.io/js/%40wrote%2Fread-dir-structure.svg)](https://www.npmjs.com/package/@wrote/read-dir-structure)

`@wrote/read-dir-structure` is Node.JS package to a read directory structure.

```sh
yarn add @wrote/read-dir-structure
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [Types](#types)
- [`async readDirStructure(dirPath, opts=): DirectoryStructure`](#async-readdirstructuredirpath-stringopts-readdirstructureopts-directorystructure)
- [`getFiles(content, path): !Array<string>`](#getfilescontent-contentpath-string-array)
- [Reasons for Errors](#reasons-for-errors)
- [Copyright](#copyright)

## API

There is a single default export function, import it with the following statement:

```js
import readDirStructure from '@wrote/read-dir-structure'
```

The types and [externs](externs.js) for _Google Closure Compiler_ via [**_Depack_**](https://github.com/dpck/depack) are defined in the `_readDirStructure` namespace.

## Types

The return type of the function is a _DirectoryStructure_. It is a recursive object, where items have either `File`, `Directory` or `SymLink` types specified in the `type` field, and if the item is a directory, it has the `content` property which is another _DirectoryStructure_.

<code>Object&lt;string, <a href="#type-directorystructure" title="A directory structure representation.">!DirectoryStructure</a>&gt;</code> __<a name="type-content">`Content`</a>__: The recursive content of the directory.

__<a name="type-directorystructure">`DirectoryStructure`</a>__: A directory structure representation.

|  Name   |                                             Type                                              |                    Description                    |
| ------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| type    | <em>string</em>                                                                               | The type of the item.                             |
| content | <em><a href="#type-content" title="The recursive content of the directory.">!Content</a></em> | The recursive content if the item is a directory. |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## <code>async <ins>readDirStructure</ins>(</code><sub><br/>&nbsp;&nbsp;`dirPath: string,`<br/>&nbsp;&nbsp;`opts=: !ReadDirStructureOpts,`<br/></sub><code>): <i>DirectoryStructure</i></code>
Read a directory, and return its structure as an object. Only `Files`, `Directories` and `Symlinks` are included!

 - <kbd><strong>dirPath*</strong></kbd> <em>`string`</em>: Path to the directory.
 - <kbd>opts</kbd> <em>`!ReadDirStructureOpts`</em> (optional): The options.

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

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>


## <code><ins>getFiles</ins>(</code><sub><br/>&nbsp;&nbsp;`content: !Content,`<br/>&nbsp;&nbsp;`path: string,`<br/></sub><code>): <i>!Array<string></i></code>
After running the `readDirStructure`, this function can be used to flatten the `content` output and return the list of all files (not including symlinks).

 - <kbd><strong>content*</strong></kbd> <em><code><a href="1-structure.md#type-content" title="The recursive content of the directory.">!Content</a></code></em>: The content from the `readDirStructure` result.
 - <kbd><strong>path*</strong></kbd> <em>`string`</em>: The original path to the directory.

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

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Reasons for Errors

The following errors can happen and have been [context tested](test/spec/errors.js) against:

|          Happens when...          |   code    |                        Message                         |
| --------------------------------- | --------- | ------------------------------------------------------ |
| not passing any path              | `-` | Please specify a path to the directory                 |
| passing a path to a symbolic link | `ENOTDIR` | Path is not a directory                                |
| passing a path to a file          | `ENOTDIR` | Path is not a directory                                |
| directory does not exist          | `ENOENT` | ENOENT: no such file or directory, lstat '%DIRECTORY%' |

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://wrote.cc">Wrote</a> 2019</th>
    <th>
      <a href="https://wrote.cc">
        <img src="https://avatars3.githubusercontent.com/u/40831417?s=100" width="100" alt="Wrote">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>