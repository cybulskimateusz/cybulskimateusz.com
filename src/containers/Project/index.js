import { TimelineMax } from 'gsap'
import Page from 'abstracts/Page'
import './style.scss'

export default class Project extends Page {
  constructor (header, image, stack, github, url) {
    super('div', header, document.querySelector('#app'))

    this.link = url
    this.header = header
    this.stack = stack
    this.github = github
  }

  _setup () {
    this.element.classList.add('project')

    this._createHeader()
    this._createStackList()
    this._createLinkBar()
  }

  async show () {
    const tl = new TimelineMax()
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    super.show(tl)
  }

  async hide () {
    const tl = new TimelineMax()
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    await super.hide(tl)
  }

  _createHeader () {
    const header = document.createElement('h1')
    header.classList.add('project_header')
    header.innerHTML = this.header
    this.element.appendChild(header)
  }

  _createStackList () {
    const list = document.createElement('p')
    list.classList.add('project_stack')
    list.innerHTML = this.stack

    this.element.appendChild(list)
  }

  _createLinkBar () {
    const linkBar = document.createElement('div')
    linkBar.classList.add('project_linkbar')
    if (this.link) {
      const directLink = this._createDirectLink()
      linkBar.appendChild(directLink)
    }
    if (this.github) {
      const githubLink = this._createGithubLink()
      linkBar.appendChild(githubLink)
    }
    this.element.appendChild(linkBar)
  }

  _createDirectLink () {
    const link = document.createElement('a')
    link.classList.add('project_link')
    link.setAttribute('href', this.link)
    link.innerHTML = 'Show'
    return link
  }

  _createGithubLink () {
    const link = document.createElement('a')
    link.classList.add('project_link')
    link.setAttribute('href', this.github)
    link.innerHTML = 'Github'
    return link
  }
}
