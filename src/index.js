import Page from 'abstracts/Page'
import Router from 'components/Router'
import Link from 'components/Link'

class One extends Page {
  constructor () {
    super('div', 'Root', document.body)
  }

  show () {
    this.element.innerHTML = 'One'
    const linkTonfp = new Link('/404', 'toNFP', this.element)
    super._setChildren([linkTonfp])
    super.show()
  }

  setup () {
    console.log('one')
    super._setup()
  }
}

class Two extends Page {
  constructor () {
    super('div', 'Page not found', document.body)
  }

  show () {
    this.element.innerHTML = 'Two'
    const linkTonfp = new Link('/', 'toRoot', this.element)
    super._setChildren([linkTonfp])
    super.show()
  }
}

const one = new One()
const two = new Two()

const router = new Router({
  '/': { component: one },
  '/404': { component: two, sideEffect: () => console.log('buu') }
})

router.listen()
