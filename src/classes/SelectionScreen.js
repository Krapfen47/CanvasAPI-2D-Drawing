import { MenuItem } from "./MenuItem"

export default class SelectionScreen {

    constructor(items) {
        this.menuItems = []
        items.forEach((item, index) => {
            this.menuItems.push(new MenuItem(item, (index + 1) * 2))
        })
        
        this.skyBall = null


    }

}