// pnpm dev 启动 (安装包 nodemon)
const WebSocket = require('ws')
;((Ws) => {
  console.log('构造出一个服务')
  const server = new Ws.Server({ port: 9000 })
  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen() {
    console.log('open')
  }
  function handleClose() {
    console.log('close')
  }
  function handleError() {
    console.log('error')
  }
  function handleConnection(ws) {
    console.log('connection - 客户端与服务器连接', ws._protocol)
    sendMsg()
    ws.on('message', handleMessage)
  }
  function handleMessage(msg) {
    console.log('message', msg.toString())
    server.clients.forEach((c) => {
      c.send(msg.toString())
    })
  }
  function sendMsg() {
    server.clients.forEach((c) => {
      c.send(
        JSON.stringify({
          id: new Date().getTime(),
          dataTime: new Date().getTime(),
          user: '小爱同学',
          msg: '快来聊天吧'
        })
      )
    })
  }

  init()
})(WebSocket)

// pnpm dev 启动 (前提: 安装包 nodemon) nodemon -v
