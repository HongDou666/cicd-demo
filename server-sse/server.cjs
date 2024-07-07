// node server.cjs 启动
var http = require('http')

http
  .createServer(function (req, res) {
    console.log('headers', req.headers)

    var fileName = '.' + req.url

    if (fileName === './stream') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        // 设置允许跨域的域名，* 代表允许任意域名跨域
        'Access-Control-Allow-Origin': '*',
        // 允许的header类型
        'Access-Control-Allow-Headers': 'Content-Type,Access-Token',
        // 跨域允许的请求方式
        'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS'
      })
      res.write('retry: 10000\n')
      res.write('event: connecttime\n')
      res.write('data: ' + '床前明月光 , 疑是地上霜' + '\n\n')

      interval = setInterval(function () {
        res.write('data: ' + '现在是北京时间 :' + time() + '\n\n')
      }, 2000)

      function time() {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')
        const formattedDate = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
        return formattedDate
      }

      req.connection.addListener(
        'close',
        function () {
          clearInterval(interval)
        },
        false
      )
    }
  })
  .listen(8844, '127.0.0.1')

// 上面的命令会在本机的8844端口，打开一个 HTTP 服务
// 执行命令 node server.js
