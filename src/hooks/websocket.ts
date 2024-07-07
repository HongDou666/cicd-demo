import { WS_ADDRESS } from '@/config'

function useWebsocket(handleMessage) {
  const ws = new WebSocket(WS_ADDRESS, ['value-token'])
  // 在WebSocket中加入Token

  // 解决方式1：请求地址中带参数
  // const ws =  new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${url}?${token}/websocket`)

  // 解决方式2:send发送数据
  // const  ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}:${url}/websocket`)
  // ws.onopen=()=>{ws.send(token)}

  // 解决方式 3:利用Sec-WebSocket-Protocol传递token
  // const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${url}/websocket`
  // const token = localStorage.getItem('token')
  // const ws = new WebSocket(url, [token])

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }

  function handleOpen(e) {
    console.log('open', e)
  }

  function handleClose(e) {
    console.log('close', e)
  }

  function handleError(e) {
    console.log('error', e)
  }

  init()

  return ws
}

export default useWebsocket
