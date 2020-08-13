import { TimelineMax } from 'gsap'
import Element from 'abstracts/Element'
import './style.scss'

export default class Header extends Element {
  constructor () {
    super('div', document.querySelector('#app'))
  }

  _setup () {
    this.element.innerHTML = 'Cybulski'
    this.element.classList.add('header')
    this.element.tabIndex = 1
  }

  toLeft () {
    new TimelineMax()
      .to(this.element, { marginLeft: '1.5rem' })
  }

  toCenter () {
    new TimelineMax()
      .to(this.element, { x: 0 })
  }

  _goHome () {
    history.pushState({}, ' ', '/')
  }

  _addEventListeners () {
    this.element.addEventListener('click', this._goHome)
  }

  _removeEventListeners () {
    this.element.removeEventListener('click', this._goHome)
  }
}
