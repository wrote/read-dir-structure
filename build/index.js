"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readDirStructure;

var _fs = require("fs");

var _makepromise = _interopRequireDefault(require("makepromise"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update information about directory's content with lstat.
 * @param {string} dirPath Path to the root directory
 * @param {string[]} dirContent
 * @returns {File[]} An array with file objects.
 */
async function lstatFiles(dirPath, dirContent) {
  const readFiles = dirContent.map(async relativePath => {
    const path = (0, _path.resolve)(dirPath, relativePath);
    const ls = await (0, _makepromise.default)(_fs.lstat, path);
    return {
      lstat: ls,
      path,
      relativePath
    };
  });
  const res = await Promise.all(readFiles);
  return res;
}
/**
 * Check if lstat result is a directory
 * @param {LstatRes} lstatRes Result of lib.lstatFiles
 * @returns {boolean} true if is a directory
 */


const isDirectory = lstatRes => lstatRes.lstat.isDirectory();
/**
 * Check if lstat result is not a directory
 * @param {LstatRes} lstatRes Result of lib.lstatFiles
 * @returns {boolean} true if is not a directory
 */


const isNotDirectory = lstatRes => !lstatRes.lstat.isDirectory();

const getType = lstatRes => {
  if (lstatRes.lstat.isDirectory()) {
    return 'Directory';
  }

  if (lstatRes.lstat.isFile()) {
    return 'File';
  }

  if (lstatRes.lstat.isSymbolicLink()) {
    return 'SymbolicLink';
  }
};
/**
 * Read a directory, and return its structure as an object. Only `Files`, `Directories` and `Symlinks` are included!
 * @param {string} dirPath Path to the directory.
 * @returns {Promise.<DirectoryStructure>} An object reflecting the directory structure.
 * @example
 *
 * const res = await readDirStructure('dir')
 *
 * {
 *  type: 'Directory',
 *  content: {
 *    'data.txt': {
 *      type: 'File'
 *    },

 *    subdir: {
 *      type: 'Directory',
 *      content: {
 *        'data-ln.txt': {
 *          type: 'SymbolicLink'
 *        },
 *      }
 *    }
 *  }
 * }
 */


async function readDirStructure(dirPath) {
  if (!dirPath) {
    throw new Error('Please specify a path to the directory');
  }

  const ls = await (0, _makepromise.default)(_fs.lstat, dirPath);

  if (!ls.isDirectory()) {
    const err = new Error('Path is not a directory');
    err.code = 'ENOTDIR';
    throw err;
  }

  const dir = await (0, _makepromise.default)(_fs.readdir, dirPath);
  const lsr = await lstatFiles(dirPath, dir);
  const directories = lsr.filter(isDirectory); // reduce at once

  const notDirectories = lsr.filter(isNotDirectory);
  const files = notDirectories.reduce((acc, current) => {
    const type = getType(current);
    return { ...acc,
      [current.relativePath]: {
        type
      }
    };
  }, {});
  const dirs = await directories.reduce(async (acc, {
    path,
    relativePath
  }) => {
    const res = await acc;
    const structure = await readDirStructure(path);
    return { ...res,
      [relativePath]: structure
    };
  }, {});
  const content = { ...files,
    ...dirs
  };
  return {
    content,
    type: 'Directory'
  };
}
/**
 * A directory structure representation
 * { dir: subdir: { 'fileA.txt': 'foo', 'fileB.js': 'bar' }, 'fileC.jpg': 'baz' }
 * @typedef {Object} LstatRes
 * @property {fs.Stats} lstat
 * @property {string} relativePath
 *
 * A directory structure representation
 * @typedef {Object} DirectoryStructure
 * @property {string} type File type, e.g., Directory, File, Symlink
 * @property {Object.<string, DirectoryStructureA>} [content] Content if directory.
 *
 *
 * @typedef {Object} DirectoryStructureA
 * @property {string} type File type, e.g., Directory, File, Symlink
 * @property {'etc'} [content] Content if directory.
 */
//# sourceMappingURL=index.js.map