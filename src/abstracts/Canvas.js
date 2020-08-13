import * as THREE from 'three'
import AutoBind from 'auto-bind'
import Element from 'abstracts/Element'

export default class Canvas extends Element {
  constructor () {
    super('canvas', document.querySelector('#app'))

    AutoBind(this)
  }

  _setup () {
    this.element.classList.add('canvas')

    this._createScene()
    this._createCamera()
    this._createRenderer()
  }

  _createScene () {
    this.scene = new THREE.Scene()
  }

  _createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
  }

  _createRenderer () {
    this._updateDimensions()
    this.renderer = new THREE.WebGL1Renderer({ antialias: true, canvas: this.element })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
  }

  _onResize () {
    this._updateDimensions()
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  _updateDimensions () { }

  _animate () {
    requestAnimationFrame(this._animate)
    this._render()
  }

  _render () {
    this.renderer.render(this.scene, this.camera)
  }

  _addEventListeners () {
    window.addEventListener('resize', this._onResize, false)
  }

  _removeEventListeners () {
    window.removeEventListener('resize', this._onResize, false)
  }
}
