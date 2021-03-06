import { TimelineMax } from 'gsap'
import Element from 'abstracts/Element'
import header from './index.pug'
import './style.scss'

export default class Header extends Element {
  constructor () {
    super('div', document.querySelector('#app'))
  }

  _setup () {
    this.element.innerHTML = header()
    this.element.classList.add('header')
    this.element.tabIndex = 1
  }

  toLeft () {
    new TimelineMax()
      .to(this.element, { marginLeft: '1rem' })
  }

  toCenter () {
    new TimelineMax()
      .to(this.element, { marginLeft: '49%' })
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
