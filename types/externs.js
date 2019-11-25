/**
 * @fileoverview
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _wrote = {}
/**
 * @typedef {{ lstat: !fs.Stats, path: string, relativePath: string }}
 */
_wrote.File
/**
 * Options for reading the dir structure.
 * @typedef {{ ignore: ((!Array<string>)|undefined) }}
 */
_wrote.ReadDirStructureOpts
/**
 * The recursive content of the directory.
 * @typedef {Object<string, !_wrote.DirectoryStructure>}
 */
_wrote.Content
/**
 * A directory structure representation.
 * @typedef {{ type: (string|undefined), content: ((!_wrote.Content)|undefined) }}
 */
_wrote.DirectoryStructure
