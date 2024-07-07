const express = require('express')
const multer = require('multer')
const cors = require('cors') // 引入cors中间件
const app = express()
const upload = multer({ dest: 'uploads/' })

// 使用cors中间件来设置CORS
app.use(cors())

app.post('/upload/file', upload.single('file'), (req, res) => {
  const file = req.file
  console.log('已接收到文件', file)
  // 在此处进行文件保存或其他处理
  res.send({
    code: 200,
    msg: '文件上传成功',
    data: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/008i3skNgy1gu9gco1hdbj605k05kgll02.webp'
  })
})

app.listen(5500, () => {
  console.log('服务器已启动，监听端口 5500')
})
