import * as THREE from 'three' 
import EntryScene from './EntryScene'
import { OrbitControls } from './OrbitControls'

export default class TextureMagicScene extends EntryScene {

    constructor(el) {
        if(el) {
            super(el);
        }
    }

    effects () {
        const time = this._clock.getElapsedTime()
        this._cube.position.set(Math.cos(-time), Math.sin(-time), Math.tan(-time))
    }

}