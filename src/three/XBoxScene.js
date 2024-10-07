import * as THREE from 'three' 
import { OrbitControls } from './OrbitControls'
import {Text, preloadFont} from 'troika-three-text'

export default class XBoxScene {
    constructor(el) {
        if(el) {
            preloadFont({
                font: 'src/assets/Blockar_Regular_15455.ttf',
                characters: 'abcdefghijklmnopqrstuvwxyz'
            },
        (res) => {
            
            this.init(el)
            this.initHandlers()
            this.animate()
        })
            
        }
    }

    initHandlers() {
        this._mouseMoveHandler = this.handleMouseMoveEvent.bind(this)
        this._el.addEventListener('pointermove', this._mouseMoveHandler, false)
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
        this._camera.position.set(0,0,20)
        this._camera.up.set(0,0,1)
        this._camera.name = 'camera'
        this._scene = new THREE.Scene()

        this._scene.add(this._camera)

        this._light = new THREE.AmbientLight(0x404040 )
        this._light.name = 'light'
        this._scene.add( this._light )

        const axesHelper = new THREE.AxesHelper( 5 );
        this._scene.add( axesHelper );

        this._meshes = []

        this.addMenuTextObjects()
        


        this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
        
        this._renderer.setPixelRatio(window.devicePixelRatio)
        this._renderer.setSize(el.clientWidth, el.clientHeight)
    
        this._el.appendChild(this._renderer.domElement)
        this._renderer.physicallyCorrectLights = true
        this._renderer.outputEncoding = THREE.sRGBEncoding
    
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping
        this._renderer.toneMappingExposure = 0.5
    
        this._renderer.setClearColor(0x000000, 0)

        this._controls = new OrbitControls(this._camera, this._renderer.domElement)

        this._clock = new THREE.Clock()


        this._mouse = new THREE.Vector2(-2, -2, -2)

    }

    addMenuTextObjects() {
        // Create:
        const memory = new Text()
        const music = new Text()
        const Xboxlive = new Text()
        const settings = new Text()
        this._scene.add(memory)
        this._scene.add(music)
        this._scene.add(Xboxlive)
        this._scene.add(settings)

        // Set properties to configure:
        memory.text = 'memory'
        memory.font = 'src/assets/Blockar_Regular_15455.ttf'
        memory.fontSize = 2
        memory.orientation
        memory.position.x = 2
        memory.position.y = 2
        memory.position.z = 2
        memory.color = 0x008000

        music.text = 'music'
        music.font = 'src/assets/Blockar_Regular_15455.ttf'
        music.fontSize = 2
        music.position.x = 2
        music.position.y = 6
        music.position.z = 6
        music.color = 0x008000

        Xboxlive.text = 'Xboxlive'
        Xboxlive.font = 'src/assets/Blockar_Regular_15455.ttf'
        Xboxlive.fontSize = 2
        Xboxlive.position.x = 2
        Xboxlive.position.y = 4
        Xboxlive.position.z = 4
        Xboxlive.color = 0x008000

        settings.text = 'settings'
        settings.font = 'src/assets/Blockar_Regular_15455.ttf'
        settings.fontSize = 2
        settings.position.x = 8
        settings.position.y = 8
        settings.position.z = 4
        settings.color = 0x008000

        // Update the rendering:
        memory.sync()
        music.sync()
        Xboxlive.sync()
        settings.sync()
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
        // this._mesh.position.set(Math.pow(Math.cos(time), 5), Math.pow(Math.sin(time),3), Math.tan(time))
        // this._mesh.rotation.set(this._mesh.rotation.x + 0.01, this._mesh.rotation.y + 0.01, this._mesh.rotation.z + 0.01)

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

    handleMouseMoveEvent (e) {

        this.updateMouse(e)
    }

    updateMouse (e) {
        this._mouse.x = (e.offsetX / this._el.clientWidth) * 2 - 1
        this._mouse.y = -(e.offsetY / this._el.clientHeight) * 2 + 1
      }
}