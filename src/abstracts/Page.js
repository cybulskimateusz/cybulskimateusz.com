import AutoBind from 'auto-bind'
import Element from 'abstracts/Element'

export default class Page extends Element {
  constructor (element, title, target = document.body) {
    super(element, target)

    this.title = title

    AutoBind(this)
  }

  _setup () {
    document.title = this.title
  }

  async hide (timeline) {
    await super.hide(timeline)
    this.element.innerHTML = ''
  }

  _addEventListeners () { }
  _removeEventListeners () { }
}
