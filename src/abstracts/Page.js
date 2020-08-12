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

  _addEventListeners () { }
  _removeEventListeners () { }
}
