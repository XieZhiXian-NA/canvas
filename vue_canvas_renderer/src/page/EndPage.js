import {defineComponent,h, withCtx} from '@vue/runtime-core'
import endPageImg from '../assets/end_page.jpg'
import restBtn from '../assets/restartBtn.png'
export default defineComponent({
    render(ctx){
        // 操作dom 显示一张图片 <div><img src=""/></div>
        // pixi容器，图片
        return h('Container',[
            h('Sprite',{texture:endPageImg}),
            h('Sprite',{texture:restBtn,x:210,y:500,
                interactive:true, //pixi中允许绑定点击事件
                onClick(){
                    ctx.$emit('changePage','GamePage')
                }
            })
        ])
    }
})