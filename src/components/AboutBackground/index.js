import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Element from 'abstracts/Element'
import laptop from 'assets/laptop.gltf'
import './style.scss'

export default class AboutBackground extends Element {
  constructor () {
    super('canvas', document.querySelector('#app'))
  }

  _setup () {
    this.element.classList.add('about_background_canvas')

    this._createScene()
    this._createCamera()
    this._createRenderer()

    this.scene.add(new THREE.AmbientLight(new THREE.Color(0xffffff)))
    this._loadGLTF()

    this._animate()
  }

  _createScene () {
    this.scene = new THREE.Scene()
  }

  _createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.set(0, 0, 100)
    this.camera.rotation.x = THREE.MathUtils.degToRad(25)
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

  _updateDimensions () {
    this.width = window.innerWidth - window.innerWidth / 10
    this.height = window.innerHeight - window.innerHeight / 10
  }

  _animate () {
    requestAnimationFrame(this._animate)
    this._render()
    this._rotateLaptop()
  }

  _render () {
    this.renderer.render(this.scene, this.camera)
  }

  _loadGLTF () {
    const loadingManager = this._loadingManager()
    const loader = new GLTFLoader(loadingManager)
    loader.load(laptop, (gltf) => {
      gltf.scene.traverse((object) => {
        if (object) {
          object.material = new THREE.MeshNormalMaterial()
          object.scale.set(1.4, 1.4, 1.4)
          object.position.y = 30
        }
      })
      gltf.scene.position.set(0, 0, 0)
      this.scene.add(gltf.scene)
    })
  }

  _loadingManager () {
    const lManager = new THREE.LoadingManager()
    lManager.onProgress = (url, loaded, total) => {
      const progress = (loaded / total) * 100
      this._loadingCallback(progress)
    }
    lManager.onError = () => { throw new Error('Cannot load file') }
    return lManager
  };

  _rotateLaptop () {
    if (this.scene.children[1]) {
      this.scene.children[1].rotation.x -= 0.05
      this.scene.children[1].rotation.y -= 0.05
      this.scene.children[1].rotation.z -= 0.05
    }
  }

  _loadingCallback (progress) {
    sessionStorage.setItem('gltf-laptop', progress)
  }

  _addEventListeners () {
    window.addEventListener('resize', this._onResize, false)
  }

  _removeEventListeners () {
    window.removeEventListener('resize', this._onResize, false)
  }
}
