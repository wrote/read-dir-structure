import { equal } from '@zoroaster/assert'
import Context from '../context'
import readDirStructure, { getFiles } from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof readDirStructure, 'function')
  },
  async 'reads directory structure'({ FIXTURES_TEST_DIR }) {
    const res = await readDirStructure(FIXTURES_TEST_DIR)
    return res
  },
  async 'reads a nested directory structure'({ NESTED_FIXTURES_TEST_DIR }) {
    const res = await readDirStructure(NESTED_FIXTURES_TEST_DIR)
    return res
  },
  async 'ignores some dirs'({ NESTED_FIXTURES_TEST_DIR }) {
    const res = await readDirStructure(NESTED_FIXTURES_TEST_DIR, {
      ignore: ['run-dmc'],
    })
    return res
  },
  async 'flattens the file list'({ NESTED_FIXTURES_TEST_DIR }) {
    const res = await readDirStructure(NESTED_FIXTURES_TEST_DIR)
    const files = getFiles(res.content, NESTED_FIXTURES_TEST_DIR)
    return files
  },
}

export default T