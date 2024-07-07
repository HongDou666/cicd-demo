import { creataChunk } from '@/utils/cut-file'

// 创建worker（大文件分片 => 开启线程）

onmessage = async (e) => {
  const { file, CHUNK_SIZE, startChunkIndex: start, endChunkIndex: end } = e.data
  //   console.log(file, CHUNK_SIZE, start, end)
  const proms = []
  for (let i = start; i < end; i++) {
    proms.push(creataChunk(file, i, CHUNK_SIZE))
  }
  const chunks = await Promise.all(proms)
  //   console.log('chunks', chunks)
  postMessage(chunks)
}
