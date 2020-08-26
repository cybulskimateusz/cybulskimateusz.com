import Element from 'abstracts/Element'
import buttons from './index.pug'

import './style.scss'

export default class Navigator extends Element {
  constructor (target, callLeft, callRight) {
    super('div', target)

    this.callLeft = callLeft
    this.callRight = callRight
  }

  _setup () {
    this.element.classList.add('navigator')
    this.element.innerHTML = buttons()
    super._setup()
  }

  updateListeners (callLeft, callRight) {
    this.callLeft = callLeft
    this.callRight = callRight
  }

  _addEventListeners () {
    this.element.querySelector('.navigator__left').addEventListener('click', this.callLeft)
    this.element.querySelector('.navigator__right').addEventListener('click', this.callRight)
  }

  _removeEventListeners () {
    this.element.querySelector('.navigator__left').removeEventListener('click', this.callLeft)
    this.element.querySelector('.navigator__right').removeEventListener('click', this.callRight)
  }
}
