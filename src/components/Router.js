import AutoBind from 'auto-bind'

export default class Router {
  /*
   *
   * routes must be an object with routes and components
   * {
   *  '/': {
   *    component extends Page !required,
   *    sideEffect
   *  } !required,
   *  '/404': {component} !required
   *  '/another-url': {component}
   * }
   *
   */
  constructor (routes) {
    AutoBind(this)

    this.pathname = window.location.pathname
    this.routes = routes

    this._callRoute(this.pathname)
  }

  listen () {
    setInterval(this._checkPathname, 50)
  }

  _checkPathname () {
    const pathname = window.location.pathname
    if (pathname !== this.pathname) {
      this._handlePathnameUpdate(pathname)
      this.pathname = pathname
    }
  }

  async _handlePathnameUpdate (pathname) {
    await this.routes[this.pathname].component.hide()
    await this._callRoute(pathname)
  }

  async _callRoute (pathname) {
    try {
      await this.routes[pathname].component.show()
      if (typeof (this.routes[pathname].sideEffect) === 'function') this.routes[pathname].sideEffect()
    } catch { location.pathname = '/404' }
  }
}
