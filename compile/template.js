const { _readDirStructure, _getFiles } = require('./depack')

/**
 * @methodType {_wrote.readDirStructure}
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
 * @methodType {_wrote.getFiles}
 */
function getFiles(content, path) {
  return _getFiles(content, path)
}

module.exports = readDirStructure
module.exports.getFiles = getFiles

/* typal types/index.xml namespace */
