import * as THREE from 'three' 
import {Text, preloadFont} from 'troika-three-text'
import SelectionScreen from '../classes/SelectionScreen'

export default class XBoxScene {
    constructor(el) {
        if(el) {
            preloadFont({
                font: 'src/assets/BlockarRegular15455.ttf',
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
        this.mouseMoveHandler = this.handleMouseMoveEvent.bind(this)
        this.el.addEventListener('pointermove', this.mouseMoveHandler, false)
    }

    init (el) {
        this.el = el
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1)
        THREE.Cache.enabled = true

        const fieldOfView = 60
        const aspect = el.clientWidth / el.clientHeight
        const near = 0.1
        const far = 5000
        this.camera = new THREE.PerspectiveCamera(fieldOfView, aspect, near, far)
        this.camera.position.set(0,0,20)
        this.camera.up.set(0,0,1)
        this.camera.name = 'camera'
        this.scene = new THREE.Scene()

        this.scene.add(this.camera)

        this.light = new THREE.AmbientLight(0x404040 )
        this.light.name = 'light'
        this.scene.add( this.light )

        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );

        this.meshes = []
        this.textures = []

        this.startScreen = new SelectionScreen(['memory', 'music', 'xbox live', 'settings'])
        this.startScreen.menuItems.forEach(item => item.meshes.forEach(m => {
            this.scene.add(m)
            this.meshes.push(m)
            if(m.userData.type === 'text') m.sync()
        }))

        // this.addMenuTextObjects()
        this.addSkyBall()

        
        this.raycaster = new THREE.Raycaster(),

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
        
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(el.clientWidth, el.clientHeight)
    
        this.el.appendChild(this.renderer.domElement)
        this.renderer.physicallyCorrectLights = true
        this.renderer.outputEncoding = THREE.sRGBEncoding
    
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.5
    
        this.renderer.setClearColor(0x000000, 0)

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.clock = new THREE.Clock()


        this.mouse = new THREE.Vector2(-2, -2, -2)

    }

    addSkyBall() {
        const geometry = new THREE.SphereGeometry( 30, 30, 30 );
        const mat = new THREE.MeshBasicMaterial({
            color: 0x008000
        })

        const sphereMesh = new THREE.Mesh(geometry, mat)
        console.log(sphereMesh)
        this.scene.add(sphereMesh)

        const edges = new THREE.EdgesGeometry( geometry )
        const matEdge = new THREE.LineBasicMaterial( { color: 0x008000, linewidth: 2 } );
        this.edgeframe = new THREE.LineSegments( edges, matEdge );
        this.scene.add( this.edgeframe );

        const wireframe = new THREE.WireframeGeometry( geometry );
        const lineFrame = new THREE.LineSegments( wireframe );
        lineFrame.color = 'green'
        lineFrame.material.depthTest = false;
        lineFrame.material.opacity = 0.25;
        lineFrame.material.transparent = true;

        // this.scene.add( lineFrame );
    }

    addMenuTextObjects() {
        // Create:
        const memory = new Text()
        const music = new Text()
        const Xboxlive = new Text()
        const settings = new Text()
        this.scene.add(memory)
        this.scene.add(music)
        this.scene.add(Xboxlive)
        this.scene.add(settings)
        this.meshes.push(memory, music, Xboxlive, settings)
        console.log('this.meshes', this.meshes)

        

        // Set properties to configure:
        memory.text = 'memory'
        memory.font = 'src/assets/BlockarRegular15455.ttf'
        memory.fontSize = 2
        memory.orientation
        memory.position.x = 2
        memory.position.y = 2
        memory.position.z = 4
        memory.color = 0x008000
        memory.userData.initialColor = 0x008000

        music.text = 'music'
        music.font = 'src/assets/BlockarRegular15455.ttf'
        music.fontSize = 2
        music.position.x = 2
        music.position.y = 6
        music.position.z = 4
        music.color = 0x008000
        music.userData.initialColor = 0x008000

        Xboxlive.text = 'Xboxlive'
        Xboxlive.font = 'src/assets/BlockarRegular15455.ttf'
        Xboxlive.fontSize = 2
        Xboxlive.position.x = 2
        Xboxlive.position.y = 4
        Xboxlive.position.z = 4
        Xboxlive.color = 0x008000
        Xboxlive.userData.initialColor = 0x008000

        settings.text = 'settings'
        settings.font = 'src/assets/BlockarRegular15455.ttf'
        settings.fontSize = 2
        settings.position.x = 2
        settings.position.y = 8
        settings.position.z = 4
        settings.color = 0x008000
        settings.userData.initialColor = 0x008000

        

        // Update the rendering:
        memory.sync()
        music.sync()
        Xboxlive.sync()
        settings.sync()
    }

    animate () {
        requestAnimationFrame(() => this.animate())

        this.handleIntersectionScene()

        this.renderScene()
    }

    renderScene () {
        this.resizeCanvasToDisplaySize()
        
        this.effects()

        this.renderer.render(this.scene, this.camera)
    }

    effects () {
        const time = this.clock.getElapsedTime()

        // this.mesh.position.set(Math.pow(Math.cos(time), 5), Math.pow(Math.sin(time),3), Math.tan(time))
        // TODO: turn the sphere around funny haha
        if(this.edgeframe) this.edgeframe.rotation.set(this.edgeframe.rotation.x, this.edgeframe.rotation.y + ((time % 42) * 0.0001 + (Math.log(Math.PI)) * 0.0001), this.edgeframe.rotation.z)

    }

    resizeCanvasToDisplaySize () {
        const canvas = this.renderer.domElement
        const width = this.el.clientWidth
        const height = this.el.clientHeight

        if (canvas.width !== width || canvas.height !== height) {
            this.renderer.setSize(width, height)
            this.camera.aspect = width / height
            this.camera.updateProjectionMatrix()
        }
    }

    handleMouseMoveEvent (e) {

        this.updateMouse(e)
    }

    updateMouse (e) {
        this.mouse.x = (e.offsetX / this.el.clientWidth) * 2 - 1
        this.mouse.y = -(e.offsetY / this.el.clientHeight) * 2 + 1
    }

    handleIntersectionScene () {
        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersections = this.raycaster.intersectObjects(this.meshes, true)
        const intersectedObjects = intersections.map(i => i.object)

        const unintersected = this.meshes.filter((m) => !intersectedObjects.includes(m))
        unintersected.forEach(obj => obj.color = obj.userData.initialColor)
        intersections.forEach(int => int.object.color = 'red')
    }


    disposeObject3D (obj3d) {
        if (obj3d === undefined || obj3d === null) return

        const cleanMaterial = material => {
            if (material instanceof Array) {
            material.materials.forEach(function (mtrl, idx) {
                if (mtrl.map) mtrl.map.dispose()
                if (mtrl.lightMap) mtrl.lightMap.dispose()
                if (mtrl.bumpMap) mtrl.bumpMap.dispose()
                if (mtrl.normalMap) mtrl.normalMap.dispose()
                if (mtrl.specularMap) mtrl.specularMap.dispose()
                if (mtrl.envMap) mtrl.envMap.dispose()

                mtrl.dispose()
            })
            } else {
            if (material.map) material.map.dispose()
            if (material.lightMap) material.lightMap.dispose()
            if (material.bumpMap) material.bumpMap.dispose()
            if (material.normalMap) material.normalMap.dispose()
            if (material.specularMap) material.specularMap.dispose()
            if (material.envMap) material.envMap.dispose()

            material.dispose()
            }

            // dispose textures
            for (const key of Object.keys(material)) {
            const value = material[key]
            if (value && typeof value === 'object' && 'minFilter' in value) {
                value.dispose()
            }
            }
        }

        obj3d.traverse(object => {
            if (!(object instanceof THREE.Mesh)) return

            if (object.geometry) object.geometry.dispose()

            if (object.material && object.material.length) {
            // an array of materials
            for (const material of object.material) cleanMaterial(material)
            } else if (object.material) cleanMaterial(object.material)
        })
    }

    disposeEventHandlers() {
        this.el.removeEventListener('pointermove', this.mouseMoveHandler, false)
    }

    dispose () {

        this.disposeEventHandlers()
    
        // dispose of geometries, materials & textures to free GPU memory
        Object.values(this.textures).forEach(t => {
          if (t && t.dispose) t.dispose()
        })
        this.disposeObject3D(this.scene)
    
        this.scene.clear()
        this.renderer.clear()
        this.renderer.dispose()
        this.renderer.renderLists.dispose()
    
        this.el.removeChild(this.renderer.domElement)
      }
}