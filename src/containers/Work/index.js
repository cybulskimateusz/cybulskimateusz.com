import Page from 'abstracts/Page'
import graphHelper from 'utils/graphHelper'
import './style.scss'
import { TimelineMax } from 'gsap'
import WorkItem from 'components/WorkItem'
import Dom from 'utils/Dom'

export default class Work extends Page {
  constructor () {
    super('ol', 'Work', document.querySelector('#app'))
    this.scrollPosition = -1
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
    this.projects.forEach(({ image, header, subpage }) => {
      const workItem = new WorkItem(this.element, image.url, header, subpage)
      workItem.show()
    })
  }

  async show () {
    await this._fetchProjects()
    this._displayData()
    const tl = new TimelineMax()
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    super.show(tl)

    this._setWidth()
  }

  async hide () {
    const tl = new TimelineMax()
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    tl.to(this.element, 0.1, { opacity: 1 })
    tl.to(this.element, 0.1, { opacity: 0 })
    await super.hide(tl)
    this.element.innerHTML = ''
  }

  async _setWidth () {
    this.maxScrollX = (this.element.childNodes.length * await this._getChildWidth()) / 2
  }

  async _getChildWidth () {
    const node = await this.element.querySelector('.work_item')
    const { marginLeft, marginRight } = node.currentStyle || window.getComputedStyle(node)
    return node.offsetWidth + parseFloat(marginLeft) + parseFloat(marginRight)
  }

  _scrollLeft () {
    if (this.scrollPosition < 0) {
      this.scrollPosition += 30
      this.element.style.transform = `translateX(${this.scrollPosition}px)`
    }
  }

  _scrollRight () {
    if (this.scrollPosition > -(this.maxScrollX)) {
      this.scrollPosition -= 30
      this.element.style.transform = `translateX(${this.scrollPosition}px)`
    }
  }

  async _next () {
    if (this.scrollPosition > -(this.maxScrollX)) {
      this.scrollPosition -= await this._getChildWidth()
      new TimelineMax().to(this.element, { x: this.scrollPosition })
    }
  }

  async _previous () {
    if (this.scrollPosition < 0) {
      this.scrollPosition += await this._getChildWidth()
      new TimelineMax().to(this.element, { x: this.scrollPosition })
    }
  }

  _onWheel ({ deltaY }) {
    if (deltaY > 0) this._scrollRight()
    else if (deltaY < 0) this._scrollLeft()
  }

  _onTouchStart (e) {
    this.touchDimensions = Dom.getPointerPosition(document.body, e).px
  }

  _onTouchEnd (e) {
    const touchDimensions = Dom.getPointerPosition(document.body, e).px

    if (this.touchDimensions.x < touchDimensions.x) this._previous()
    if (this.touchDimensions.x > touchDimensions.x) this._next()
  }

  _addEventListeners () {
    window.addEventListener('resize', this._setWidth)
    window.addEventListener('mousewheel', this._onWheel)
    window.addEventListener('touchstart', this._onTouchStart)
    window.addEventListener('touchend', this._onTouchEnd)
  }

  _removeEventListeners () {
    window.removeEventListener('resize', this._setWidth)
    window.removeEventListener('mousewheel', this._onWheel)
    window.removeEventListener('touchstart', this._onTouchStart)
    window.removeEventListener('touchend', this._onTouchEnd)
  }
}
