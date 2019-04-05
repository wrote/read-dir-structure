/* yarn example/ */
import readDirStructure, { getFiles } from '../src'

(async () => {
  const path = 'example/directory'
  const res = await readDirStructure(path)
  const files = getFiles(res.content, path)
  console.log(JSON.stringify(files, null, 2))
})()
