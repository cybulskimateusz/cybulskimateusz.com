import Page from 'abstracts/Page'
import graphHelper from 'utils/graphHelper'
import './style.scss'
import { TimelineMax } from 'gsap/gsap-core'

export default class Contact extends Page {
  constructor () {
    super('div', 'Contact', document.querySelector('#app'))
  }

  _setup () {
    this.element.classList.add('contact')
    super._setup()
  }

  async _fetchContacts () {
    const query = `
      query {
        contacts {
          type
          contact
        }
      }
    `
    const { data } = await graphHelper(query)
    this.contacts = data.contacts
  }

  _formatContact (contact) {
    const element = document.createElement('span')
    const link = document.createElement('a')
    element.classList.add('contact_item')

    switch (contact.type) {
      case 'phone': {
        link.href = `tel:${contact.contact}`
        element.innerHTML = '<i class="fas fa-phone icon icon_phone"></i>:'
        link.innerHTML = 'Call me'
        element.appendChild(link)
        return element
      }
      case 'email': {
        link.href = `mailto:${contact.contact}`
        element.innerHTML = '<i class="fas fa-envelope icon icon_mail"></i>:'
        link.innerHTML = 'E-mail'
        element.appendChild(link)
        return element
      }
      case 'messenger': {
        link.href = `${contact.contact}`
        element.innerHTML = '<i class="fab fa-facebook-messenger icon icon_messenger"></i>:'
        link.innerHTML = 'messenger'
        element.appendChild(link)
        return element
      }
      case 'linkedin': {
        link.href = `${contact.contact}`
        element.innerHTML = '<i class="fab fa-linkedin-in icon icon_linkedin"></i>:'
        link.innerHTML = 'linkedIn'
        element.appendChild(link)
        return element
      }
      case 'github': {
        link.href = `tel:${contact.contact}`
        element.innerHTML = '<i class="fab fa-github icon icon_github"></i>:'
        link.innerHTML = 'github'
        element.appendChild(link)
        return element
      }
      default: return null
    }
  }

  async show () {
    await this._fetchContacts()
    this.contacts.forEach(contact => this.element.appendChild(this._formatContact(contact)))
    this.contactSelectors = this.element.querySelectorAll('.contact_item')

    const tl = new TimelineMax()
    this.contactSelectors.forEach(el => {
      tl
        .from(el, { opacity: 0, y: 50 })
        .to(el, 0.1, { opacity: 1, y: 0 })
    })
    super.show(tl)
  }

  async hide () {
    const tl = new TimelineMax()
    this.contactSelectors.forEach(el => {
      tl.to(el, 0.1, { opacity: 0, y: 50 })
    })
    super.hide(tl)
    this.element.innerHTML = ''
  }
}
