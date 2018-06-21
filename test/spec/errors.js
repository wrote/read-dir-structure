import { throws } from 'zoroaster/assert'
import Context from '../context'
import readDirStructure from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'passing a path to soft link'({ FIXTURES_TEST_DIR_SOFT_LINK }) {
    await throws({
      async fn() {
        await readDirStructure(FIXTURES_TEST_DIR_SOFT_LINK)
      },
      message: 'Path is not a directory',
      code: 'ENOTDIR',
    })
  },
  async 'passing a path to file'({ FILE }) {
    await throws({
      async fn() {
        await readDirStructure(FILE)
      },
      code: 'ENOTDIR',
      message: 'Path is not a directory',
    })
  },
  async 'directory is not passed'() {
    await throws({
      async fn() {
        await readDirStructure()
      },
      message: 'Please specify a path to the directory',
    })
  },
  async 'directory does not exist'() {
    await throws({
      async fn() {
        await readDirStructure('fake-directory')
      },
      code: 'ENOENT',
      message: 'ENOENT: no such file or directory, lstat \'fake-directory\'',
    })
  },
}

export default T
