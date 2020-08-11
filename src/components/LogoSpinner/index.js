import { TimelineMax } from 'gsap'
import _ from 'lodash'
import Element from 'abstracts/Element'
import tagline from './index.pug'
import './style.scss'

export default class LogoSpinner extends Element {
  constructor () {
    super('div', document.querySelector('#app'))
  }

  async _setup () {
    this.element.classList.add('logo_spinner')
    this.element.innerHTML = tagline()
  }

  async show () {
    const tl = new TimelineMax()

    const waitForInners = setInterval(() => {
      if (this.element.querySelectorAll('.logo_spinner__tagline__inner').length) {
        this.inners = this.element.querySelectorAll('.logo_spinner__tagline__inner')
        _.forEachRight(this.inners, inner => {
          tl.from(inner, 0.01, { opacity: 0 })
          tl.to(inner, 0.01, { opacity: 1 })
        })
        clearInterval(waitForInners)
      }
    }, 50)

    return super.show(tl)
  }

  hide () {
    const tl = new TimelineMax()
    this.inners.forEach(inner => tl.to(inner, 0.01, { opacity: 0 }))
    return super.hide(tl)
  }

  toBottom () {
    this.element.classList.remove('logo_spinner--corner')
    this.element.classList.add('logo_spinner--bottom')
  }

  toCorner () {
    this.element.classList.remove('logo_spinner--bottom')
    this.element.classList.add('logo_spinner--corner')
  }
}
