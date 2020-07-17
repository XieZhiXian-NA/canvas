import { defineComponent, h, ref } from '@vue/runtime-core'
import mapImage from '../assets/map.jpg'
import {getGame} from '../Game'
export default defineComponent({
    setup() {
        let mapHeight = 1080
        let mapY1 = ref(0)
        let mapY2 = ref(-mapHeight)
        //让地图动起来，setInterval pixi ticker 使用的是requestAnimation
        let game = getGame()
        let speed = 5
        game.ticker.add(()=>{
            mapY1.value+=speed
            mapY2.value+=speed
            if(mapY1.value>=mapHeight)
               mapY1.value = -mapHeight
            if(mapY2.value>=mapHeight)
               mapY2.value = -mapHeight
        })

        return {
            mapY1,
            mapY2
        }
    },
    render(ctx) {
        return h("Container", [
        h("Sprite", { texture: mapImage, y: ctx.mapY1 }),
        h("Sprite", { texture: mapImage, y: ctx.mapY2 })])
    }
})