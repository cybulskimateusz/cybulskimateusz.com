import Page from 'abstracts/Page'
import AboutBackground from 'components/AboutBackground'
import graphHelper from 'utils/graphHelper'
import './style.scss'
import { TimelineMax } from 'gsap'

export default class About extends Page {
  constructor () {
    super('div', 'Who am I', document.querySelector('#app'))
  }

  _setup () {
    this.element.classList.add('about')
    super._setup()
    this.bg = new AboutBackground()
    this.bg.show()
  }

  async _fetchAbout () {
    const query = `
      query {
        abouts(first: 1) {
          header
          description
        }
      }
    `
    const { data } = await graphHelper(query)
    this.about = data.abouts[0]
  }

  _displayData () {
    const header = document.createElement('h1')
    header.classList.add('about__header')
    header.innerHTML = this.about.header
    this.element.appendChild(header)

    const description = document.createElement('p')
    description.classList.add('about__description')
    description.innerHTML = this.about.description
    this.element.appendChild(description)
  }

  async show () {
    const tl = new TimelineMax({ delay: 1 })
    tl.to(this.element, { opacity: 1 })
    await this._fetchAbout()
    this._displayData()
    super.show(tl)
  }

  hide () {
    this.bg.hide()
    const tl = new TimelineMax()
    tl.to(this.element, { opacity: 0 })
    super.hide(tl)
  }
}
