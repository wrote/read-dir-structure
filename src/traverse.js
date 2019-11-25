// not used as not efficient

/**
 * Iterates through files and applies the processing function.
 * @param {string} path
 * @param {function(string): !Promise} processFile
 */
export async function traverse(path, processFile) {
  if (!path) throw new Error('Please specify the path to the file or directory.')

  const ls = lstatSync(path)

  /**
   * Process the directory.
   */
  const processDir = async (conf) => {
    const { input, relPath = '.' } = conf
    const p = join(input, relPath)
    const { content } = await readDirStructure(p)
    const k = Object.keys(/** @type {!Object} */ (content))
    await k.reduce(async (acc, name) => {
      await acc
      const file = join(p, name)
      const { type } = content[name]
      if (type == 'File') {
        await processFile(file)
      } else if (type == 'Directory') {
        const newRelPath = join(relPath, name)
        await processDir({
          ...conf,
          relPath: newRelPath,
        })
      }
    }, {})
  }

  if (ls.isDirectory()) {
    await processDir({ input: path })
  } else if (ls.isFile()) {
    await processFile(path)
  }
}
