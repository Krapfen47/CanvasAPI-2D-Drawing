import * as THREE from 'three' 
import { OrbitControls } from './OrbitControls'

export default class EntryScene {
    constructor(el) {
        if(el) {
            this.init(el)
            this.animate()
        }
    }

    init (el) {
        this._el = el
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1)
        THREE.Cache.enabled = true

        const fieldOfView = 60
        const aspect = el.clientWidth / el.clientHeight
        const near = 0.1
        const far = 5000
        this._camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far)
        this._camera.position.set(10,10,10)
        this._camera.up.set(0,0,1)
        this._camera.name = 'camera'

        this._scene = new THREE.Scene()

        this._scene.add(this._camera)

        this._light = new THREE.AmbientLight(0x404040 )
        this._light.name = 'light'
        this._scene.add( this._light )

        this._meshes = []
 
        this._cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({color: new THREE.Color('red')}))
        this._cube.name = 'mesh'
 
        this._meshes.push(this._cube)

        this._scene.add(this._cube)

        this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
        
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(el.clientWidth, el.clientHeight)
    
        this._el.appendChild(this._renderer.domElement)
        this._renderer.physicallyCorrectLights = true
        this._renderer.outputEncoding = THREE.sRGBEncoding
    
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping
        this._renderer.toneMappingExposure = 0.5
    
        // this._renderer.setClearColor(0xffffff, 0)
        this._renderer.setClearColor(0x000000, 0)

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)

        this._clock = new THREE.Clock()
    }

    animate () {
        requestAnimationFrame(() => this.animate())

        this.renderScene()
    }

    renderScene () {
        this.resizeCanvasToDisplaySize()
        
        this.effects()

        this._renderer.render(this._scene, this._camera)
    }

    effects () {
        const time = this._clock.getElapsedTime()
        this._cube.position.set(Math.cos(time), Math.sin(time), Math.tan(time))
        this._cube.rotation.set(this._cube.rotation.x + 0.01, this._cube.rotation.y + 0.01, this._cube.rotation.z + 0.01)

    }

    resizeCanvasToDisplaySize () {
        const canvas = this._renderer.domElement
        const width = this._el.clientWidth
        const height = this._el.clientHeight

        if (canvas.width !== width || canvas.height !== height) {
            this._renderer.setSize(width, height)
            this._camera.aspect = width / height
            this._camera.updateProjectionMatrix()
        }
    }
}