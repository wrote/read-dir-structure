## Reasons for Errors

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

%~%