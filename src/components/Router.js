import AutoBind from 'auto-bind'
import _ from 'lodash'
import Page from 'abstracts/Page'

export default class Router {
  /*
   *
   * routes must be an object with routes and components
   * {
   *  '/': {
   *    component extends or Page !required,
   *    sideEffect
   *  } !required,
   *  '/404': {component} !required
   *  '/another-url': {component}
   * }
   *
   */
  constructor (routes) {
    AutoBind(this)

    this._validateRoutes(routes)

    this.pathname = window.location.pathname
    this.routes = routes
    this._callRoute(this.pathname)
  }

  listen () {
    setInterval(this._checkPathname, 50)
  }

  _validateRoutes (routes) {
    if (!routes || !_.isPlainObject(routes)) {
      throw new Error('Constructor argument must be type of object')
    }
    if (!_.keys(routes).includes('/') || !_.keys(routes).includes('/404')) {
      throw new Error('Routes object must contain keys "/" and "/404"')
    }
    if (!_.values(routes).every(({ component }) => component instanceof Page)) {
      throw new Error('Each route value must contain object extending Element or Page')
    }
    if (!_.values(routes).every(el => !el.sideEffect || typeof (el.sideEffect) === 'function')) {
      throw new Error('Each route value must contain object extending Element or Page')
    }
  }

  _checkPathname () {
    const pathname = window.location.pathname
    if (this.routes && pathname !== this.pathname) {
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
