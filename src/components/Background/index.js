import * as THREE from 'three'
import Canvas from 'abstracts/Canvas'
import './style.scss'

export default class Background extends Canvas {
  constructor ({ amountX, amountY, spaceBetween, tempo, amplitude, clearColor, hoverColor }) {
    super()

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

    super._setup()
    this._createBallsMap()
    this._crearteRaycaster()

    this.scene.add(new THREE.AmbientLight(new THREE.Color(0xffffff)))

    this._animate()
  }

  _createCamera () {
    super._createCamera()
    this.camera.position.set(0, 0, 750)
    this.camera.rotation.x = THREE.MathUtils.degToRad(25)
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

  _updateDimensions () {
    super._updateDimensions()
    this.width = window.innerWidth
    this.height = window.innerHeight
  }

  _render () {
    this._moveWave()
    super._render()
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
    super._addEventListeners()
    window.addEventListener('mousemove', this._onDocumentMouseMove)
  }

  _removeEventListeners () {
    super._removeEventListeners()
    window.removeEventListener('mousemove', this._onDocumentMouseMove)
  }
}
