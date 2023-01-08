import * as THREE from 'three' 
import EntryScene from './EntryScene'
import { OrbitControls } from './OrbitControls'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

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
        this._cube.position.set(Math.cos(-time), Math.sin(-time), Math.tan(-time))
    }

    setupTexture () {

        this.loadSVG()
    }

    loadSVG () {
        this._loader = new SVGLoader();
        this._loader.load(
            // resource URL
            '/grid_0-min.svg',
            // called when the resource is loaded
            ( data ) => {
                const paths = data.paths;
                const group = new THREE.Group();
        
                for ( let i = 0; i < paths.length; i ++ ) {
        
                    const path = paths[ i ];
        
                    const material = new THREE.MeshBasicMaterial( {
                        color: path.color,
                        side: THREE.DoubleSide,
                        depthWrite: false
                    } );
        
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