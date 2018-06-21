/* yarn example/ */
import readDirStructure from '../src'

(async () => {
  const res = await readDirStructure('example/directory')
  console.log(JSON.stringify(res, null, 2))
})()
