/* 全屏系列封装 */
const getPropertyName = (names, target) => {
  return names.find((name) => name in target)
}

const enterFullScreenName = getPropertyName(
  ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'],
  document.documentElement
)

const exitFullScreenName = getPropertyName(['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msExitFullscreen'], document)

const fullEleName = getPropertyName(['fullscreenElement', 'mozFullScreenElement', 'msFullscreenElement', 'webkitFullscreenElement'], document)

// 进入全屏
export function enter(ele) {
  enterFullScreenName && ele[enterFullScreenName]()
}

// 退出全屏
export function exit() {
  isFull() && exitFullScreenName && document[exitFullScreenName]()
}

// 当前处于全屏的元素
export function fullEle() {
  return document[fullEleName] || null
}

// 当前是否处于全屏
export function isFull() {
  return !!fullEle()
}

// 全屏 与 非全屏切换方法
export function toggle(ele) {
  isFull() ? exit() : enter(ele)
}
