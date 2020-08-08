import { TimelineMax } from 'gsap'
import AutoBind from 'auto-bind'

export default class Element {
  constructor (element = 'div', target = document.body) {
    this.element = document.createElement(element)
    this.target = target

    AutoBind(this)
  }

  async show (timeline = new TimelineMax()) {
    this._setup()

    this.target.appendChild(this.element)
    this._addEventListeners()

    await new Promise(resolve =>
      timeline.call(() => resolve())
    )
  }

  async hide (timeline = new TimelineMax()) {
    await new Promise(resolve =>
      timeline.call(() => resolve())
    )

    this.target.removeChild(this.element)
    this._removeEventListeners()
  }

  _setup () { }

  _addEventListeners () { }
  _removeEventListeners () { }
}
