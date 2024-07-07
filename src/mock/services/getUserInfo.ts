import Mock from 'mockjs2'
function getUserInfo(options) {
  if (options.url?.split('?')[1]?.split('=')[1] !== '3.1415926') {
    return {
      code: 400,
      msg: '失败'
    }
  }
  return {
    code: 200,
    msg: '成功',
    data: {
      name: Mock.mock('@cname()'),
      age: 24
    }
  }
}
const getData = () => {
  // 模拟接口请求
  Mock.mock(/^\/api\/mock\/user\/info/, 'get', getUserInfo)
}

export default getData
