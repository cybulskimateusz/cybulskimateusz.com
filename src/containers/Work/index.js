import Page from 'abstracts/Page'
import graphHelper from 'utils/graphHelper'
import './style.scss'
import { TimelineMax, Expo } from 'gsap'
import WorkItem from 'components/WorkItem'
import Dom from 'utils/Dom'
import { debounce } from 'lodash'

export default class Work extends Page {
  constructor () {
    super('section', 'Work', document.querySelector('#app'))

    this.projectInViewport = 0
    this.scrollPosition = 0
    this._debounceOnWheel = debounce(this._onWheel, 200)
    this._debounceTouchMove = debounce(this._onTouchMove, 200)
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
      .to(this.element, 1, { x: this.scrollPosition }, Expo.easeIn)
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
    if (e.originalEvent.detail > 200) this._next()
    else if (e.originalEvent.detail < -200) this._previous()
  }

  _onTouchStart (e) {
    this.touchDimensions = Dom.getPointerPosition(document.body, e).px
  }

  _onTouchMove (e) {
    if (e.changedTouches[0].clientX < 0) this.direction = 'right'
    else if (e.changedTouches[0].clientX > 0) this.direction = 'left'
  }

  _onTouchEnd (e) {
    const touchDimensions = Dom.getPointerPosition(document.body, e).px

    if (this.touchDimensions.x < touchDimensions.x) this.direction = 'left'
    else if (this.touchDimensions.x > touchDimensions.x) this.direction = 'right'
    this._handleNewDirection()
  }

  _handleNewDirection () {
    if (this.direction === 'left') this._previous()
    if (this.direction === 'right') this._next()
  }

  _addEventListeners () {
    window.addEventListener('wheel', this._debounceOnWheel)
    window.addEventListener('touchmove', this._onTouchMove)
    window.addEventListener('DOMMouseScroll', this._onDomMouseScroll)
    window.addEventListener('touchstart', this._onTouchStart)
    window.addEventListener('mousedown', this._onTouchStart)
    window.addEventListener('touchend', this._onTouchEnd)
    window.addEventListener('mouseup', this._onTouchEnd)
  }

  _removeEventListeners () {
    window.removeEventListener('wheel', this._debounceOnWheel)
    window.removeEventListener('touchmove', this._debounceTouchMove)
    window.removeEventListener('DOMMouseScroll', this._onDomMouseScroll)
    window.removeEventListener('touchstart', this._onTouchStart)
    window.removeEventListener('mousedown', this._onTouchStart)
    window.removeEventListener('touchend', this._onTouchEnd)
    window.removeEventListener('mouseup', this._onTouchEnd)
  }
}
