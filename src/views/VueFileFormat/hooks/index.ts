// 1. File ——> Bolb (主要应用场景：文件上传)
export async function transToBolb(file) {
  return new window.Blob([file], { type: file.type })
}

// 2. Blob、File ——> Base64 (主要应用场景：图片预览)
export function fileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      return resolve(reader.result)
    }
  })
}

// 3. 将文件数据绘制到 canvas (思路：Blob、File ——> Base64 ——> canvas)
export function fileAndBlobToCanvas(fileDataURL, element: HTMLElement) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = fileDataURL // 图片的Base64

    // let canvas = document.getElementById('canvasId')
    const canvas = document.createElement('canvas')
    if (!canvas.getContext) {
      alert('浏览器不支持canvas')
      return
    }
    const ctx = canvas.getContext('2d') // 获取canvas的上下文

    // 等待图片资源加载完毕调用
    img.onload = () => {
      // 参数1 ：图片dom
      // 参数2 ：在图片的x坐标开始剪裁
      // 参数3 ：在图片的y坐标开始剪裁
      // 参数4 ：在图片中剪裁多长的宽
      // 参数5 ：在图片中剪裁多长的高
      // 参数6 ：在canvas的x坐标开始画
      // 参数7 ：在canvas的y坐标开始画
      // 参数8 ：在canvas多长的宽
      // 参数9 ：在canvas多长的高
      ctx!.drawImage(img, 0, 0, 200, 100, 50, 50, 200, 100) // canvas开始生成图片
      element.appendChild(canvas)
      resolve(canvas)
    }
  })
}

// 4. 从 canvas 中获取 Base64
export function canvasToDataURL(canvas) {
  const canvasDataURL = canvas.toDataURL('image/png', 1.0)
  return canvasDataURL
}

// 5. 从 canvas 中获取Bolb 和 File
export function canvasToFile(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], '文件名称', {
        type: blob.type
      })
      resolve({
        canvasBlob: blob,
        canvasFile: file
      })
    })
  })
}

// 6. Base64 → Blob (主要应用场景：文件上传)
export const base64ToBlob = (base64) => {
  const arr = base64.split(',')
  const type = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type })
}

// 7. Bolb ——> File
export function blobToFile(blob, fileName) {
  return new window.File([blob], fileName, { type: blob.type })
}

// 8. Base64 ——> File (主要应用场景：文件上传)
export const base64ToFile = (base64, fileName) => {
  const arr = base64.split(',')
  const type = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type })
}

// 9. Blob、File ——> Object URL , object：用于创建 URL 的 File 对象、Blob 对象
export function createObjectURL(object) {
  return URL.createObjectURL(object)
}

// 10. Blob（type === 'application/json'） ——> json格式
// 适用场景：axios网络请求时，responseType: ‘blob’,将影响第一种情况读取reponse为blob，不能直接读取code和msg,此时就需要将Blob的内容转成文件读取，不能取消responseType: ‘blob’,取消会影响正常下载
export async function blobToJson(blob) {
  if (blob === null) {
    throw new Error('The provided blob is null.')
  }
  return new Promise<any>((resolve, reject) => {
    // 创建一个FileReader实例
    const reader = new FileReader()
    // 读取文件,结果用字符串形式表示
    reader.readAsText(blob, 'utf-8')
    reader.onload = function () {
      try {
        // 读取完成后, 获取 reader.result
        resolve(JSON.parse(reader.result as string))
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = function (error) {
      reject(error)
    }
  })
}
