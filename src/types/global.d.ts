/* declare global 扩展Ts全局变量类型 */
declare global {
  interface String {
    // prependHello(param: boolean): void
    prependHello: (param: boolean) => void
  }
  interface Object {
    /**
     * Determines whether an object has a property with the specified name.
     * @param o An object.
     * @param v A property name.
     */
    hasOwn(o: object, v: PropertyKey): boolean
  }
  interface Window {
    EyeDropper: any
    _AMapSecurityConfig: any
    onBMapCallback: any
  }
  interface jqueryType {
    data?: string
    fn1(param: string): void
    fn2: (param: boolean) => void
  }
  interface TypeTom2 {
    name?: string
    deep: {
      messg: number
    }
  }
  interface TypeTom1 {
    name?: boolean
  }

  const $NAME1: TypeTom1
  const $NAME2: number

  const __APP_VERSION__: string
  const __MY_GLOBAL_WIN__: string
}

export {}
