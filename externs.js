/* typal types/index.xml */
/** @const */
var _readDirStructure = {}
/**
 * @typedef {{ lstat: !fs.Stats, path: string, relativePath: string }}
 */
_readDirStructure.File
/**
 * @typedef {Object<string, !_readDirStructure.DirectoryStructure>}
 */
_readDirStructure.content
/**
 * @typedef {{ type: (string|undefined), content: (!_readDirStructure.content|undefined) }}
 */
_readDirStructure.DirectoryStructure
