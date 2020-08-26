import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TimelineMax } from 'gsap'
import Canvas from 'abstracts/Canvas'
import laptop from 'assets/laptop.gltf'
import './style.scss'

export default class AboutBackground extends Canvas {
  show () {
    const tl = new TimelineMax()
    tl
      .from(this.element, { scaleX: 0 })
      .to(this.element, 5, { scaleX: 1 })
    super.show(tl)
  }

  hide () {
    const tl = new TimelineMax()
    tl
      .to(this.element, { scaleX: 0 })
    super.hide(tl)
  }

  _setup () {
    super._setup()
    this.element.classList.add('about_background_canvas')

    this.scene.add(new THREE.AmbientLight(new THREE.Color(0xffffff)))
    this._loadGLTF()
    this._animate()
  }

  _createCamera () {
    super._createCamera()
    this.camera.position.set(0, 0, 100)
    this.camera.rotation.x = THREE.MathUtils.degToRad(25)
  }

  _updateDimensions () {
    super._updateDimensions()
    this.width = window.innerWidth - window.innerWidth / 10
    this.height = window.innerHeight - window.innerHeight / 10
  }

  _loadGLTF () {
    const loadingManager = this._loadingManager()
    const loader = new GLTFLoader(loadingManager)
    loader.load(laptop, (gltf) => {
      gltf.scene.traverse((object) => {
        if (object) {
          object.material = new THREE.MeshNormalMaterial()
          object.scale.set(1.4, 1.4, 1.4)
          object.position.y = 25
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
      this.scene.children[1].rotation.y -= 0.01
    }
  }

  _loadingCallback (progress) {
    sessionStorage.setItem('gltf-laptop', progress)
  }

  _animate () {
    this._rotateLaptop()
    super._animate()
  }
}
