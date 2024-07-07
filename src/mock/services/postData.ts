import Mock from 'mockjs2'
function postUserStatus(options) {
  return {
    code: 200,
    msg: '成功',
    data: [1, 2, 3, 4, 5]
  }
}

const postData = () => {
  // 模拟接口请求
  Mock.mock(/^\/api\/mock\/user\/status/, 'post', postUserStatus)
}
export default postData
