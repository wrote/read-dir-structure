import { equal } from 'zoroaster/assert'
import Context from '../context'
import readDirStructure from '../../src'

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
}

export default T