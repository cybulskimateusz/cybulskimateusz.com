import AutoBind from 'auto-bind'

export default class Router {
  /*
   *
   * routes must be an object with routes and components
   * {
   *  '/': component !required,
   *  '/404': component !required
   *  '/another-url': component
   * }
   *
   */
  constructor (routes) {
    AutoBind(this)

    this.pathname = window.location.pathname
    this.routes = routes

    this._showRoute(this.pathname)
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
    await this.routes[this.pathname].hide()
    await this._showRoute(pathname)
  }

  async _showRoute (pathname) {
    try {
      await this.routes[pathname].show()
    } catch { location.pathname = '/404' }
  }
}
