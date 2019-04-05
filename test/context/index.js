import { join } from 'path'

const fixture = 'test/fixture'
const dir = join(fixture, 'dir')
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
    return join(fixture, 'dir-rec')
  }
  get FIXTURES_TEST_DIR_SOFT_LINK() {
    return join(dir, 'dir-ln')
  }
  get FILE() {
    return join(fixture, 'file.txt')
  }
}
