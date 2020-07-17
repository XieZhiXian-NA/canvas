import {defineComponent,h, withCtx} from '@vue/runtime-core'
import StartPageImage from '../assets/start_page.jpg'
import StartBtn from '../assets/startBtn.png'
export default defineComponent({
    render(ctx){
        // 操作dom 显示一张图片 <div><img src=""/></div>
        // pixi容器，图片
        return h('Container',[
            h('Sprite',{texture:StartPageImage}),
            h('Sprite',{texture:StartBtn,x:210,y:500,
                interactive:true, //pixi中允许绑定点击事件
                onClick(){
                    ctx.$emit('changePage','GamePage')
                }
            })
        ])
    }
})