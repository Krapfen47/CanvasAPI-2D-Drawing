import {Text} from 'troika-three-text'

export class MenuItem {

    constructor(text, posY){

        this.meshes = []
        

        this.text = new Text()
        this.sphereHull = null
        this.sphereBlinker = null

        this.text.text = text
        this.text.font = 'src/assets/BlockarRegular15455.ttf'
        this.text.fontSize = 2
        this.text.orientation
        this.text.position.x = 2
        this.text.position.y = posY
        this.text.position.z = 4
        this.text.color = 0x008000
        this.text.userData.initialColor = 0x008000
        this.text.userData.type = 'text'

        this.meshes.push(this.text)
    }

}