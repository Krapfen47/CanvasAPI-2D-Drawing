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

        this._scene = new THREE.Scene()

        this._scene.add(this._camera)

        const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({color: new THREE.Color('red')}))
        this._scene.add(cube)

    
        this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true })
        
        
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(el.clientWidth, el.clientHeight)
    
        this._el.appendChild(this._renderer.domElement)
        this._renderer.physicallyCorrectLights = true
        this._renderer.outputEncoding = THREE.sRGBEncoding
    
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping
        this._renderer.toneMappingExposure = 0.5
    
        // this._renderer.setClearColor(0xffffff)

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)
    }

    animate () {
        requestAnimationFrame(() => this.animate())

        this.renderScene()
    }

    renderScene () {
        this.resizeCanvasToDisplaySize()

        this._renderer.render(this._scene, this._camera)
    }

    resizeCanvasToDisplaySize () {
        debugger
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