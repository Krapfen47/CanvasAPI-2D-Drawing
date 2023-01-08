import * as THREE from 'three' 
import EntryScene from './EntryScene'
import { OrbitControls } from './OrbitControls'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

export default class TextureMagicScene extends EntryScene {

    constructor(el) {
        if(el) {
            super(el);

            this.setupTexture()
            this.animate()
        }
    }

    effects () {
        const time = this._clock.getElapsedTime()
        this._mesh.position.set(Math.cos(-time), Math.sin(-time), Math.tan(-time))
        this._mesh.scale.set(Math.cos(time - 1), Math.cos(time - 2)*2, Math.cos(time - 4)*4)
    }

    setupTexture () {

        // this.loadSVG()
        this.loadImageTexture()
    }

    loadImageTexture () {
        
        
        new Promise((resolve) => {
            this._loader = new THREE.TextureLoader()

            this._loader.load(
            // resource URL
            '/grid_0.png',
        
            // onLoad callback
            ( texture ) => {
                // in this example we create the material when the texture is loaded
                this._material = new THREE.MeshBasicMaterial( {
                    map: texture
                 } );
                resolve()
            },
        
            // onProgress callback currently not supported
            undefined,
        
            // onError callback
            function ( err ) {
                console.error( 'An error happened.' );
            }
        )
        }).then(() => {
            this._mesh.material = this._material
        })
       
    
    }

    loadSVG () {
        this._loader = new SVGLoader();
        this._loader.load(
            // resource URL
            '/grid_0.svg',
            // called when the resource is loaded
            ( data ) => {
                const paths = data.paths;
                const group = new THREE.Group();
        
                for ( let i = 0; i < paths.length; i ++ ) {
        
                    const path = paths[ i ];
        
                    const material = new THREE.MeshBasicMaterial({
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    });

                    const shapes = SVGLoader.createShapes( path );

                    for ( let j = 0; j < shapes.length; j ++ ) {
                        const shape = shapes[ j ];
                        const geometry = new THREE.ShapeGeometry( shape );
                        const mesh = new THREE.Mesh( geometry, material );
                        group.add( mesh );
                    }
                }
                this._scene.add( group );
            },
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    }

}