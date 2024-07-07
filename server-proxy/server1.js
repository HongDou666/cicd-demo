const express = require('express')
const app = express()

app.use((request, response, next) => {
  console.log(`有人请求服务器1了,请求来自于${request.get('Host')},请求的地址是${request.url}`)
  // console.log('请求来自于',request.get('Host'));
  // console.log('请求的地址',request.url);
  next()
})

app.get('/students', (request, response) => {
  setTimeout(() => {
    // throw new Error('抛出异常 Error')
    // response.status(403).send('对不起，您无权访问此页面。')

    const students = [
      { id: '001', name: 'tom', age: 18 },
      { id: '002', name: 'jerry', age: 19 },
      { id: '003', name: 'tony', age: 120 }
    ]
    response.send({
      code: 200,
      msg: '成功',
      data: students
    })
  }, request.query?.time || 0)
})

app.post('/cache/data', (request, response) => {
  const students = [
    { id: '001', name: '火影忍者' },
    { id: '002', name: '海贼王' },
    { id: '003', name: '七龙珠' },
    { id: '004', name: '斗破苍穹' },
    { id: '005', name: '斗罗大陆' },
    { id: '006', name: '武动乾坤' },
    { id: '007', name: '武庚纪' }
  ]
  response.send({
    code: 200,
    msg: '成功',
    data: students
  })
})

app.listen(5000, (err) => {
  if (!err) console.log('服务器1启动成功了,请求学生信息地址为：http://localhost:5000/students')
})
