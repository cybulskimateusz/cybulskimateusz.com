import AutoBind from 'auto-bind'
import Element from 'abstracts/Element'

export default class Page extends Element {
  constructor (element, title, target = document.body) {
    super(element, target)

    this.title = title
    this.children = []

    AutoBind(this)
  }

  show (timelinemax) {
    super.show(timelinemax)
    if (this.children.length > 0) this.children.map(child => child.show())
    this.addEventListeners()
  }

  hide (timelinemax) {
    super.hide(timelinemax)
    if (this.children.length > 0) this.children.map(child => child.hide())
    this.removeEventListeners()
  }

  setChildren (children) {
    this.children = children
  }

  setup () {
    document.title = this.title
  }

  addEventListeners () { }
  removeEventListeners () { }
}
