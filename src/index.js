import { gsap, CSSPlugin } from 'gsap/all'

import Background from 'components/Background'
import Header from 'components/Header'
import RootPage from 'containers/RootPage'
import NavBar from 'containers/NavBar'
import LogoSpinner from 'components/LogoSpinner'
import About from 'containers/About'
import Contact from 'containers/Contact'
import Work from 'containers/Work'
import Router from 'components/Router'
import Project from 'containers/Project'
import NotFoundPage from 'containers/NotFoundPage'
import graphHelper from 'utils/graphHelper'
import 'style.scss'

gsap.registerPlugin(CSSPlugin)

const bg = new Background({
  amountX: 50,
  amountY: 50,
  spaceBetween: 100,
  clearColor: 0x696969,
  hoverColor: 0xffffff,
  tempo: 0.1,
  amplitude: 10
})
bg.show()

const logoSpinner = new LogoSpinner()

const header = new Header()
header.show()

const navbar = new NavBar()
navbar.show()

const root = new RootPage()
const nfp = new NotFoundPage()
const about = new About()
const contact = new Contact()
const work = new Work()

let currentPath

const onSubpage = async () => {
  if (currentPath === '/' || currentPath === undefined) {
    header.toLeft()
    try {
      await logoSpinner.hide()
    } catch (err) { } finally {
      logoSpinner.toCorner()
      logoSpinner.show()
    }
  }
  currentPath = window.location.pathname
}

const onRoot = async () => {
  header.toCenter()
  try {
    await logoSpinner.hide()
  } catch (err) { } finally {
    logoSpinner.toBottom()
    logoSpinner.show()
  }
  currentPath = window.location.pathname
}

const fetchProjects = async () => {
  const query = `
    query {
      projects {
        header
        image {
          url
        }
        subpage
        stack
        github
        url
      }
    }
  `
  const { data } = await graphHelper(query)
  return data.projects
}

const enableRouting = async () => {
  const routes = {
    '/': { component: root, sideEffect: onRoot },
    '/404': { component: nfp, sideEffect: onSubpage },
    '/about': { component: about, sideEffect: onSubpage },
    '/work': { component: work, sideEffect: onSubpage },
    '/contact': { component: contact, sideEffect: onSubpage }
  }

  const projects = await fetchProjects()

  await projects.forEach(({ header, image, subpage, stack, github, url }) => {
    routes[`/work${subpage}`] =
    { component: new Project(header, image, stack, github, url), sideEffect: onSubpage }
  })

  const router = new Router(routes)
  router.listen()
}

enableRouting()
