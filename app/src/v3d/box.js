import {
  AmbientLight,
  Color,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three";
import * as THREE from "three";

export class Box {

  scene = undefined
  debug = false

  constructor(config = {}) {
    Object.assign(this, config)
  }

  createScene() {
    this.scene = new Scene()
    this.scene.background = new Color(0xa0a0a0)
    // this.scene.rotation.z = -Math.PI / 2

    this.scene.add(this.createGrid())

    const {
      ambientLight,
      directionalLight,
      directionalLightBack
    } = this.createLight()
    this.scene.add(ambientLight)
    this.scene.add(directionalLight)
    this.scene.add(directionalLightBack)

    this.testPrimitives()

    return this.scene
  }

  createCamera(width, height) {
    const camera = new PerspectiveCamera(50, width / height, 1, 10000)
    camera.position.set(0, 0, 150)

    return camera
  }

  createRenderer(width, height, pixelRatio) {
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true
    })
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width, height)
    return renderer
  }

  createLight() {
    const ambientLight = new AmbientLight(0x333333)

    const directionalLight = new DirectionalLight(0xFFFFFF, 1.0)
    directionalLight.position.x = -1
    directionalLight.position.y = 0
    directionalLight.position.z = 1

    const directionalLightBack = new DirectionalLight(0xaaaaaa, 0.3)
    directionalLightBack.position.x = -0.6
    directionalLightBack.position.y = 0
    directionalLightBack.position.z = -1

    return {ambientLight, directionalLight, directionalLightBack}
  }

  createGrid() {
    const grid = new GridHelper(1000, 100, 0x000000, 0x000000)
    grid.material.opacity = 0.2
    grid.material.transparent = true
    grid.rotation.x = Math.PI / 2

    return grid
  }

  testPrimitives() {
    if (!this.debug) return

    const box = new THREE.BoxGeometry(1, 1, 10)
    const boxMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    const boxMesh = new THREE.Mesh(box, boxMaterial)

    const boxMesh2 = new THREE.Mesh(box, boxMaterial)
    boxMesh2.position.x = 10
    const boxMesh3 = new THREE.Mesh(box, boxMaterial)
    boxMesh3.position.y = 10

    this.scene.add(boxMesh)
    this.scene.add(boxMesh2)
    this.scene.add(boxMesh3)
  }

}
