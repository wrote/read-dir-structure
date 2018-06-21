import { equal } from 'zoroaster/assert'
import SnapshotContext from 'snapshot-context'
import Context from '../context'
import readDirStructure from '../../src'

/** @type {Object.<string, (c: Context, s: SnapshotContext)>} */
const T = {
  context: [
    Context,
    SnapshotContext,
  ],
  'is a function'() {
    equal(typeof readDirStructure, 'function')
  },
  async 'reads directory structure'({ FIXTURES_TEST_DIR, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const res = await readDirStructure(FIXTURES_TEST_DIR)
    await test('dir.json', res)
  },
  async 'reads a nested directory structure'({ NESTED_FIXTURES_TEST_DIR, SNAPSHOT_DIR }, { setDir, test }) {
    setDir(SNAPSHOT_DIR)
    const res = await readDirStructure(NESTED_FIXTURES_TEST_DIR)
    await test('dir-rec.json', res)
  },
}

export default T
