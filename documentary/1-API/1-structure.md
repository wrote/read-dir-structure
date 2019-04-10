## Types

The return type of the function is a _DirectoryStructure_. It is a recursive object, where items have either `File`, `Directory` or `SymLink` types specified in the `type` field, and if the item is a directory, it has the `content` property which is another _Structure_.

%TYPEDEF types/index.xml Content%
%TYPEDEF types/index.xml DirectoryStructure%

%~%