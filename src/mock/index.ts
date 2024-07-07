import getData from './services/getUserInfo'
import postData from './services/postData'
function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

if (import.meta.env.DEV && import.meta.env.MODE !== 'production') {
  // 判断IE浏览器
  if (isIE()) {
    console.error(`'[antd-pro]错误:' mockjs '不支持' IE '，请不要在'生产'环境中使用'`)
  }
  // Mock.mock(/\/user\/info/, 'get', getUserInfo)
  // Mock.mock(/\/user\/status/, 'post', postUserStatus)
  getData()
  postData()
}

export { isIE }

// https://juejin.cn/post/7212466357475442743
// /* 1. 数字类型 */
// // 生成一个整数（默认范围为 0~100）
// Mock.mock('@integer()')

// // 生成一个指定范围内的整数
// Mock.mock('@integer(1, 100)')

// // 生成一个浮点数（默认保留 0~17 位小数）
// Mock.mock('@float()')

// // 生成一个指定范围内的浮点数，并且限制保留的小数位数
// Mock.mock('@float(1, 100, 2)')

// // 生成一个手机号
// Mock.mock(/^1[3456789]\d{9}$/)

// /* 2.字符串类型 */
// // 生成一个随机的单词
// Mock.mock('@word()')

// // 生成一个随机的句子
// Mock.mock('@sentence()')

// // 生成一个随机的段落
// Mock.mock('@paragraph()')

// // 生成一个随机的邮箱
// Mock.mock('@EMAIL()')

// // 生成一个随机的 URL
// Mock.mock('@url()')

// /* 3. 日期类型 */
// // 生成一个随机的日期
// Mock.mock('@date()')

// // 生成一个随机的时间
// Mock.mock('@time()')

// // 生成一个随机的日期+时间
// Mock.mock('@datetime()')

// // 生成一个随机的 Unix 时间戳
// Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")')

// /* 5. 布尔类型 */
// // 生成一个随机的布尔值
// Mock.mock('@boolean()')

// // 生成一个给定的固定值 true 或 false
// Mock.mock('@boolean(true)')

// /* 7. 对象类型 */
// // 生成一个随机的对象
// Mock.mock({
//   'id|+1': 1,
//   name: '@name',
//   'age|20-30': 25,
//   'gender|1': ['男', '女']
// })

// // 生成多个随机的对象
// Mock.mock({
//   'list|10': [
//     {
//       'id|+1': 1,
//       name: '@name',
//       'age|20-30': 25,
//       'gender|1': ['男', '女']
//     }
//   ]
// })

// /* 9. 数组类型 */
// // 生成一个随机的数组
// Mock.mock(['@integer()', '@integer()', '@integer()']);

// // 生成多个随机的数组
// Mock.mock({
//   'list|10': ['@integer()']
// });

// /* 11. 生成中文姓名 */
// // 生成一个随机的中文姓名
// Mock.mock('@cname()');

// /* 13. 随机汉字 */
// // 生成一个随机的汉字
// Mock.Random.cword();

// // 生成一个由两到三个词汇组成的部门名称
// Mock.mock('@cword(2, 3)部');

// /* 15. 指定图片大小 */
// // 生成一张指定大小和背景颜色的图片
// Mock.mock({ 'image': '@image("200x100", "#f00")' });
