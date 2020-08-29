import Page from 'abstracts/Page'
import graphHelper from 'utils/graphHelper'
import './style.scss'
import { TimelineMax, Expo } from 'gsap'
import WorkItem from 'components/WorkItem'
import { debounce } from 'lodash'

export default class Work extends Page {
  constructor () {
    super('section', 'Work', document.querySelector('#app'))

    this.projectInViewport = 0
    this.scrollPosition = 0
    this.x = { start: 0, end: 0 }

    this._debounceOnWheel = debounce(this._onWheel, 200)
    this._debounceDomMouseScroll = debounce(this._onDomMouseScroll, 200)
  }

  _setup () {
    this.element.classList.add('work')
    super._setup()
  }

  async _fetchProjects () {
    const query = `
      query {
        projects {
          header
          image {
            url
          }
          subpage
        }
      }
    `
    const { data } = await graphHelper(query)
    this.projects = data.projects
  }

  _displayData () {
    const list = document.createElement('ol')
    list.classList.add('work__list')
    this.projects.forEach(({ image, header, subpage }) => {
      const workItem = new WorkItem(list, image.url, header, subpage)
      workItem.show()
    })
    this.element.appendChild(list)
  }

  async show () {
    await this._fetchProjects()
    this._displayData()
    const tl = new TimelineMax()
    tl
      .from(this.element, { x: -5000 })
      .to(this.element.querySelector('.work__list'), 1, { x: this.scrollPosition }, Expo.easeIn)
    super.show(tl)

    this._setChildrenLegth()
  }

  async hide () {
    const tl = new TimelineMax()
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    await super.hide(tl)
  }

  async _setChildrenLegth () {
    this.childrenLength = this.element.querySelectorAll('.work_item').length
  }

  async _getChildWidth () {
    const node = await this.element.querySelector('.work_item')
    const { marginLeft, marginRight } = node.currentStyle || window.getComputedStyle(node)
    return node.offsetWidth + parseFloat(marginLeft) + parseFloat(marginRight)
  }

  async _next () {
    if (this.projectInViewport < this.childrenLength - 1) {
      this.scrollPosition -= await this._getChildWidth()
      new TimelineMax().to(this.element.querySelector('.work__list'), { x: this.scrollPosition })
      this.projectInViewport += 1
    }
  }

  async _previous () {
    if (this.projectInViewport > 0) {
      this.scrollPosition += await this._getChildWidth()
      new TimelineMax().to(this.element.querySelector('.work__list'), { x: this.scrollPosition })
      this.projectInViewport -= 1
    }
  }

  _onWheel ({ deltaY }) {
    if (deltaY > 0) this._next()
    else if (deltaY < 0) this._previous()
  }

  _onDomMouseScroll (e) {
    if (e.originalEvent.detail > 0) this._next()
    else if (e.originalEvent.detail < 0) this._previous()
  }

  _onTouchStart (event) {
    this.x.start = event.touches ? event.touches[0].clientX : event.clientX
  }

  _onTouchMove (event) {
    this.isMooved = true

    this.x.end = event.touches ? event.touches[0].clientX : event.clientX
  }

  _onTouchEnd () {
    if (this.isMooved) {
      if (this.x.start > this.x.end) this._next()
      else if (this.x.start < this.x.end) this._previous()
    }

    this.x = { start: 0, end: 0 }
    this.isMooved = false
  }

  async _onResize () {
    this.scrollPosition = -1 * (await this._getChildWidth() * this.projectInViewport)
    new TimelineMax().to(this.element.querySelector('.work__list'), { x: this.scrollPosition })
  }

  _addEventListeners () {
    window.addEventListener('resize', this._onResize)
    window.addEventListener('wheel', this._debounceOnWheel)
    window.addEventListener('touchmove', this._onTouchMove)
    window.addEventListener('DOMMouseScroll', this._debounceDomMouseScroll)
    window.addEventListener('touchstart', this._onTouchStart)
    window.addEventListener('mousedown', this._onTouchStart)
    window.addEventListener('touchend', this._onTouchEnd)
    window.addEventListener('mouseup', this._onTouchEnd)
  }

  _removeEventListeners () {
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('wheel', this._debounceOnWheel)
    window.removeEventListener('touchmove', this._onTouchMove)
    window.removeEventListener('DOMMouseScroll', this._debounceDomMouseScroll)
    window.removeEventListener('touchstart', this._onTouchStart)
    window.removeEventListener('mousedown', this._onTouchStart)
    window.removeEventListener('touchend', this._onTouchEnd)
    window.removeEventListener('mouseup', this._onTouchEnd)
  }
}
