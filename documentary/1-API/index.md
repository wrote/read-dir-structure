## API

There is a single default export function, import it with the following statement:

```js
import readDirStructure from '@wrote/read-dir-structure'
```

### `Structure` Type

The return type of the function is a directory `Structure`. It is an associative array which contains the next properties:

```table
[
  ["Property", "Type", "Description"],
  ["type", "`string`", "The result of the _lstat_ and one of the following: `Directory`, `File`, `SymbolicLink`."],
  ["content", "`Structure`", "If the type is `Directory`, the object will also have a `content` which also is a `Structure`. Therefore, the whole nested structure will be read. See below for an example."]
]
```

```### async readDirStructure => Structure
[
  ["path", "string"]
]
```

Reads the structure of the directory.

%EXAMPLE: example/example.js, ../src => @wrote/read-dir-structure, javascript%

Output for the [`example/directory`](example/directory):

%FORK-json example example/example.js%

### Reasons for Errors

The following errors can happen and have been [context tested](test/spec/errors.js) against:

```table
[
  ["Happens when...", "code", "Message"],
  ["not passing any path", "`-`", "Please specify a path to the directory"],
  ["passing a path to a symbolic link", "`ENOTDIR`", "Path is not a directory"],
  ["passing a path to a file", "`ENOTDIR`", "Path is not a directory"],
  ["directory does not exist", "`ENOENT`", "ENOENT: no such file or directory, lstat '%DIRECTORY%'"]
]
```