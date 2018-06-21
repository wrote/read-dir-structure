import { resolve } from 'path'

const fixture = resolve(__dirname, '../fixture')
const dir = resolve(fixture, 'dir')
/**
 * A testing context for the package.
 */
export default class Context {
  // async _init() {
  //   console.log('init context')
  // }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  // async _destroy() {
  //   console.log('destroy context')
  // }
  get FIXTURES_TEST_DIR() {
    return dir
  }
  get NESTED_FIXTURES_TEST_DIR() {
    return resolve(fixture, 'dir-rec')
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  get FIXTURES_TEST_DIR_SOFT_LINK() {
    return resolve(dir, 'dir-ln')
  }
  get FILE() {
    return resolve(fixture, 'file.txt')
  }
}
