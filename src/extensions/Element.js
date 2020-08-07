import { TimelineMax } from 'gsap'
import AutoBind from 'auto-bind'

export default class Element {
  constructor (element) {
    AutoBind(this)
    this.element = document.createElement(element)
  }

  async show (timeline = new TimelineMax()) {
    document.body.appendChild(this.element)
    this.addEventListeners()

    await new Promise(resolve =>
      timeline.call(() => resolve())
    )
  }

  async hide (timeline = new TimelineMax()) {
    await new Promise(resolve =>
      timeline.call(() => resolve())
    )

    document.body.removeChild(this.element)
    this.removeEventListeners()
  }

  addEventListeners () { }
  removeEventListeners () { }
}
