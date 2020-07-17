import {defineComponent,h,toRefs,onUnmounted,onMounted} from '@vue/runtime-core'
import plane from '../assets/plane.png'
export default defineComponent({
    props:["x","y"],
    setup(props,ctx){
        const {x,y} = toRefs(props)
        const handleAttack = (e)=>{
            if(e.code === "Space"){
                ctx.emit("attack",{x:props.x,y:props.y})
            }
        }
        onMounted(()=>{
            window.addEventListener("keydown",handleAttack)
        })
        onUnmounted(()=>{
            window.removeEventListener("keydown",handleAttack)
        })

       return {
           x,y
       }
    },
    render(ctx) {
        return h("Container", {x:ctx.x,y:ctx.y},[
         h("Sprite", { texture: plane}),
        ])
    }
})