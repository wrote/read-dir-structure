```## async getFiles => Array<string>
[
  ["content", "Content"],
  ["path", "string"]
]
```

After running the `readDirStructure`, this function can be used to flatten the `content` output and return the list of all files (not including symlinks).

%EXAMPLE: example/get-files, ../src => @wrote/read-dir-structure%
%FORK-json example/get-files%

%~%