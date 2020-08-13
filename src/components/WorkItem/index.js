import Element from 'abstracts/Element'

export default class WorkItem extends Element {
  constructor (target, image, header, subpage) {
    super('li', target)

    this.image = image
    this.header = header
    this.subpage = subpage
  }

  _setup () {
    this.element.classList.add('work_item')
    this._displayData()
    this.element.tabIndex = 2
    super._setup()
  }

  _displayData () {
    const header = document.createElement('h1')
    header.classList.add('work__header')
    header.innerHTML = this.header
    this.element.appendChild(header)

    const image = document.createElement('img')
    image.classList.add('work__img')
    image.src = this.image
    this.element.appendChild(image)
  }

  _callURL () {
    history.pushState({}, this.header, `/work${this.subpage}`)
  }

  _addEventListeners () {
    this.element.addEventListener('click', this._callURL)
  }

  _removeEventListeners () {
    this.element.removeEventListener('click', this._callURL)
  }
}
