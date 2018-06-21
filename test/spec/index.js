import { equal, throws } from 'zoroaster/assert'
import SnapshotContext from 'snapshot-context'
import Context from '../context'
import readDirStructure from '../../src'

/** @type {Object.<string, (c: Context)>} */
const doesNotWork = {
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
  async 'directory is not passed'() {
    await throws({
      async fn() {
        await readDirStructure()
      },
      message: 'Please specify a path to the directory',
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

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  'is a function'() {
    equal(typeof readDirStructure, 'function')
  },
  'does not work when': doesNotWork,
  async 'reads directory structure'({ FIXTURES_TEST_DIR, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const res = await readDirStructure(FIXTURES_TEST_DIR)
    await test('dir-structure.json', res)
  },
  // async 'reads a nested directory structure'({ NESTED_FIXTURES_TEST_DIR, SNAPSHOT_DIR }, { setDir, test }) {
  //   setDir(SNAPSHOT_DIR)
  //   const res = await readDirStructure(NESTED_FIXTURES_TEST_DIR)
  //   await test('dir-structure.json', res)
  // },
}

export default T
