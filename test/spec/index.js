import { equal } from 'zoroaster/assert'
import Context from '../context'
import wroteReadDirStructure from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof wroteReadDirStructure, 'function')
  },
  async 'calls package without error'() {
    await wroteReadDirStructure()
  },
  async 'calls test context method'({ example }) {
    await example()
  },
}

export default T
