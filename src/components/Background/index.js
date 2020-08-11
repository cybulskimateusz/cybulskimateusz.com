import * as THREE from 'three'
import Element from 'abstracts/Element'
import './style.scss'

export default class Background extends Element {
  constructor ({ amountX, amountY, spaceBetween, tempo, amplitude, clearColor, hoverColor }) {
    super('canvas', document.querySelector('#app'))

    this.amountX = amountX
    this.amountY = amountY
    this.spaceBetween = spaceBetween
    this.tempo = tempo
    this.amplitude = amplitude
    this.clearColor = clearColor
    this.hoverColor = hoverColor
    this.count = 0
  }

  _setup () {
    this.element.classList.add('background_canvas')

    this._createScene()
    this._createCamera()
    this._createRenderer()
    this._createBallsMap()
    this._crearteRaycaster()

    this.scene.add(new THREE.AmbientLight(new THREE.Color(0xffffff)))

    this._animate()
  }

  _createScene () {
    this.scene = new THREE.Scene()
  }

  _createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    this.camera.position.set(0, 0, 750)
    this.camera.rotation.x = THREE.MathUtils.degToRad(25)
  }

  _createRenderer () {
    this.renderer = new THREE.WebGL1Renderer({ antialias: true, canvas: this.element })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  _createBallsMap () {
    const ballsMap = new THREE.Group()
    for (let i = 0; i <= this.amountX * this.spaceBetween; i += this.spaceBetween) {
      for (let j = 0; j <= this.amountY * this.spaceBetween; j += this.spaceBetween) {
        const circleGeometry = new THREE.CircleGeometry(0.3, 36)
        const material = new THREE.MeshBasicMaterial({ color: this.clearColor })
        const circle = new THREE.Mesh(circleGeometry, material)
        circle.position.set(i, j, 0)
        circle.rotation.set(THREE.MathUtils.degToRad(90), 0, 0)
        ballsMap.add(circle)
      }
    }
    ballsMap.position.set(-3000, -400, 100)
    ballsMap.rotation.x = -45

    this.points = ballsMap.children

    this.scene.add(ballsMap)
  }

  _onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  _animate () {
    requestAnimationFrame(this._animate)
    this._render()
  }

  _render () {
    this._moveWave()
    this.renderer.render(this.scene, this.camera)
  }

  _moveWave () {
    let i = 0
    let j = 0

    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        this.points[i].position.z = (Math.sin((ix + this.count) * 0.3) * this.amplitude * 10) + (Math.sin((iy + this.count) * 0.5) * this.amplitude * 5)
        this.points[j].scale.x = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8
        this.points[j].scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8

        i++
        j++
      }
    }
    this.count += this.tempo
  }

  _crearteRaycaster () {
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
  }

  _onDocumentMouseMove (e) {
    e.preventDefault()

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)

    const intersects = this.raycaster.intersectObjects(this.points, true)

    intersects.forEach(intersect => {
      intersect.object.material.color.set(this.hoverColor)
    })
  }

  _addEventListeners () {
    window.addEventListener('resize', this._onResize, false)
    window.addEventListener('mousemove', this._onDocumentMouseMove)
  }

  _removeEventListeners () {
    window.removeEventListener('resize', this._onResize, false)
    window.removeEventListener('mousemove', this._onDocumentMouseMove)
  }
}
