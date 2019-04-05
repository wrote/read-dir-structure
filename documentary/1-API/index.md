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

%~ width="25"%

```### async readDirStructure => Structure
[
  ["path", "string"]
]
```

Reads the structure of the directory.

%EXAMPLE: example, ../src => @wrote/read-dir-structure%

Output for the [`example/directory`](example/directory):

%FORK-json example%

%~ width="25"%

```### async getFiles => Array<string>
[
  ["content", "Structure.content"],
  ["path", "string"]
]
```

After running the `readDirStructure`, this function can be used to flatten the `content` output and return the list of all files (not including symlinks).

%EXAMPLE: example/get-files, ../src => @wrote/read-dir-structure%

%FORK-json example/get-files%

%~%