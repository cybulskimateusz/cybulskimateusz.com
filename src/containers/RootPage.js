import Page from 'abstracts/Page'

export default class RootPage extends Page {
  constructor () {
    super('div', 'Mateusz Cybulski Official', document.querySelector('#app'))
  }
}
