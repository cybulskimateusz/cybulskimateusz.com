import { TimelineMax } from 'gsap'
import Element from 'abstracts/Element'
import Link from 'components/Link'
import './style.scss'

export default class NavBar extends Element {
  constructor () {
    super('div', document.querySelector('#app'))
  }

  _setup () {
    this.element.classList.add('navbar')

    const toAbout = new Link('/about', 'About', this.element)
    const toContact = new Link('/contact', 'Contact', this.element)
    const toWork = new Link('/work', 'Work', this.element)

    toContact.show()
    toAbout.show()
    toWork.show()
  }

  show () {
    const tl = new TimelineMax()
    tl
      .from(this.element, { y: 100 })
      .to(this.element, { y: 0 })
    return super.show(tl)
  }
}
