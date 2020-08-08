import Element from 'abstracts/Element'

export default class Page extends Element {
  constructor (element, title) {
    super(element)
    this.title = title
  }

  show (timelinemax) {
    document.title = this.title
    super.show(timelinemax)
  }

  hide (timelinemax) { super.show(timelinemax) }

  addEventListeners () { }

  removeEventListeners () { }
}
