import AutoBind from 'auto-bind'
import Element from 'abstracts/Element'
import pug from './index.pug'

export default class Link extends Element {
  constructor (URL = '/', name = 'link', target) {
    super('button', target)

    this.URL = URL
    this.name = name

    AutoBind(this)
  }

  show () {
    super.show()
  }

  hide () {
    super.hide()
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
