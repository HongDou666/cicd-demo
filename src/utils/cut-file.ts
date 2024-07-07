import SparkMD5 from 'spark-md5'

/* 创建分片 */
export const creataChunk = (file, index, chunkSize): Promise<any> => {
  return new Promise((resolve) => {
    const start = index * chunkSize // 当前分片开始在第几个字节
    const end = start + chunkSize // 当前分片结束在第几个字节

    const spark = new SparkMD5.ArrayBuffer() // 追加数组缓冲区
    const fileReader = new FileReader() // 读取文件
    const blob = file.slice(start, end) // 切片

    fileReader.onload = (e: any) => {
      spark.append(e.target.result)
      resolve({
        start, // 当前分片的开始字节
        end, // 当前分片的结束字节
        index, // 当前分片在数组中的索引
        hash: spark.end(), //（用做校验）完成md5的计算，返回十六进制结果
        blob // blob对象
      })
    }
    fileReader.readAsArrayBuffer(blob)
  })
}

/* 文件切片 */
const CHUNK_SIZE = 1024 * 1024 * 5 // 每个分片有5MB大小
// 优化: 分片的任务放到多线程里面执行，不在主线程里面执行
// 电脑CPU有多少个就开启多少个线程
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 获取电脑的CPU数量 (8)
export function cutFile(file) {
  return new Promise((resolve) => {
    // 计算出文件被分为多少片
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    console.log('计算出文件被分为多少片', chunkCount)

    // 计算每个线程最多处理多少个分片
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    console.log('计算每个线程最多处理多少个分片', threadChunkCount)

    // 最终要开启的线程数
    const workerCPU = Math.ceil(chunkCount / threadChunkCount)
    console.log('最终要开启的线程数', workerCPU)

    const result = [] as any[]
    let finishCount = 0
    for (let index = 0; index < workerCPU; index++) {
      // 创建一个线程，并分配任务
      const worker = new Worker('/src/worker/index.js', {
        type: 'module' // 开启模块线程 因为worker.js里面会导入其他的函数
      })

      const start = index * threadChunkCount
      let end = (index + 1) * threadChunkCount
      if (end > chunkCount) {
        end = chunkCount
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex: start,
        endChunkIndex: end
      })
      worker.onmessage = (e) => {
        // e.data 数组里面就是每个分片的结果
        for (let i = start; i < end; i++) {
          result[i] = e.data[i - start]
        }
        worker.terminate()
        finishCount++
        if (finishCount === workerCPU) {
          resolve(result)
        }
      }
    }
  })
}
