const { _readDirStructure, _getFiles } = require('./depack')

/**
 * Read a directory, and return its structure as an object. Only `Files`, `Directories` and `Symlinks` are included!
 * @param {string} dirPath Path to the directory.
 * @param {!_wrote.ReadDirStructureOpts} [opts] Options for reading the dir structure.
 * @param {!Array<string>} [opts.ignore] The list of paths inside of the directory to ignore, e.g., `[.git]`.
 * @return {Promise<_wrote.DirectoryStructure>}
 * @example
  ```js
  const res = await readDirStructure('dir')
  // result:
  {
    type: 'Directory',
    content: {
      'data.txt': {
        type: 'File'
      },
      subdir: {
        type: 'Directory',
        content: {
          'data-ln.txt': {
            type: 'SymbolicLink'
          },
        }
      }
    }
  }
  ```
 */
function readDirStructure(dirPath, opts) {
  return _readDirStructure(dirPath, opts)
}

/**
 * After running the `readDirStructure`, this function can be used to flatten the `content` output and return the list of all files (not including symlinks).
 * @param {!_wrote.Content} content The recursive content of the directory.
 * @param {string} path The original path to the directory.
 * @return {!Array<string>}
 */
function getFiles(content, path) {
  return _getFiles(content, path)
}

module.exports = readDirStructure
module.exports.getFiles = getFiles

/* typal types/index.xml namespace */
/**
 * @typedef {import('fs').Stats} fs.Stats
 * @typedef {_wrote.File} File
 * @typedef {Object} _wrote.File
 * @prop {!fs.Stats} lstat The stats of the item.
 * @prop {string} path The full path of the item.
 * @prop {string} relativePath The name of the item.
 * @typedef {_wrote.ReadDirStructureOpts} ReadDirStructureOpts Options for reading the dir structure.
 * @typedef {Object} _wrote.ReadDirStructureOpts Options for reading the dir structure.
 * @prop {!Array<string>} [ignore] The list of paths inside of the directory to ignore, e.g., `[.git]`.
 * @typedef {_wrote.Content} Content The recursive content of the directory.
 * @typedef {Object<string, !_wrote.DirectoryStructure>} _wrote.Content The recursive content of the directory.
 * @typedef {_wrote.DirectoryStructure} DirectoryStructure A directory structure representation.
 * @typedef {Object} _wrote.DirectoryStructure A directory structure representation.
 * @prop {string} [type] The type of the item.
 * @prop {!_wrote.Content} [content] The recursive content if the item is a directory.
 */
