import AutoBind from 'auto-bind'
import Element from 'abstracts/Element'
import pug from './index.pug'

export default class Link extends Element {
  constructor (URL = '/', name = 'link', target) {
    super('button', target)

    this.location = ''
    this.URL = URL
    this.name = name

    AutoBind(this)
  }

  show () {
    super.show()
    this._listen()
  }

  hide () {
    super.hide()
  }

  _listen () {
    this._handlePathnameUpdate(window.location.pathname)
    setInterval(this._checkPathname, 50)
  }

  _checkPathname () {
    const { pathname } = window.location
    if (this.pathname !== pathname) this._handlePathnameUpdate(pathname)
  }

  _handlePathnameUpdate (pathname) {
    if (this.URL === pathname) this._activateLink()
    else this._unactivateLink()
    this.pathname = pathname
  }

  _activateLink () {
    this.element.classList.add('link--active')
  }

  _unactivateLink () {
    this.element.classList.remove('link--active')
  }

  _setup () {
    this.element.classList.add('link')
    this.element.innerHTML = pug({ name: this.name })
  }

  _addEventListeners () {
    this.element.addEventListener('click', this._navigate)
  }

  _removeEventListeners () {
    this.element.removeEventListener('click', this._navigate)
  }

  _navigate () {
    history.pushState({}, '', this.URL)
  }
}
