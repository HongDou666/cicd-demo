// （初始化百度地图时）其中为防止Eslint校验代码找不到BMap，创建了baidu-map.d.ts文件，里面代码如下，这样校验代码BMap就不会报红了
declare namespace BMap {
  class Map {
    constructor(container: string | HTMLElement, opts?: MapOptions)
    centerAndZoom(center: Point, zoom: number): void
    disableScrollWheelZoom(): void
    addOverlay(overlay: Overlay): void
    addControl(control: Control): void
  }

  class Point {
    constructor(lng: number, lat: number)
  }

  class Marker {
    constructor(point: Point)
    addEventListener(event: string, handler: Function): void
  }
  class NavigationControl {
    constructor(opts?: any)
  }

  class ScaleControl {
    constructor(opts?: any)
  }

  class MapTypeControl {
    constructor(opts?: any)
  }

  class GeolocationControl {
    constructor(opts?: any)
  }

  class Icon {
    constructor(url: string, val: any)
  }

  class Size {
    constructor(size1: number, size1: number)
  }

  // 其他类的定义...
}
