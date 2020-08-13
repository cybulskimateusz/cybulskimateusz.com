import Page from 'abstracts/Page'
import './style.scss'

export default class NotFoundPage extends Page {
  constructor () {
    super('div', 'Page not found', document.querySelector('#app'))
  }

  _setup () {
    super._setup()
    this.element.classList.add('notfound')
    this._createHeader()
  }

  _createHeader () {
    const header = document.createElement('h1')
    header.classList.add('notfound__header')
    header.innerHTML = 'PAGE NOT FOUND'
    this.element.appendChild(header)
  }
}
