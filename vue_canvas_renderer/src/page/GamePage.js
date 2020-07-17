import {defineComponent,h, reactive,ref, toRefs,onUnmounted,onMounted} from '@vue/runtime-core'
import Map from '../component/map'
import Plane from '../component/Plane'
import Bullte from '../component/Bullte'
import EnemyPlane from '../component/EnemyPlane'
import {getGame} from '../Game'
import {hitTestRectangle} from '../utils/index'


export default defineComponent({
    setup(props,ctx){
      
        const planeInfo = useCreatePlaneInfo()

        //子弹数据
        const bullets = reactive([])
       
        //发子弹 按空格  飞机在哪 子弹在哪
        const createBulletInfo = (x,y)=>{
                return {x:x+100,y}
            }
        const handleAttack = (info)=>{
            bullets.push(createBulletInfo(info.x,info.y))
        }  
        //敌军
         const enemyPlanes = reactive([{x:10,y:10,width:308,height:207}])

        
         getGame().ticker.add(()=>{
            //子弹动起来
            moveBullets(bullets)

            //敌军与飞机碰撞
            enemyPlanes.forEach(enemyPlaneInfo=>{
                if(hitTestRectangle(enemyPlaneInfo,planeInfo)){
                   ctx.emit('changePage',"EndPage")
                }
            })    

         })
        return {
            planeInfo,
            bullets,
            handleAttack,
            enemyPlanes
        }

    },
    render(ctx){
        const renderBullets = ()=>{
            return ctx.bullets.map(info=>{
                return h(Bullte,{x:info.x,y:info.y})
            })
        }

        const renderEnemyPlanes = ()=>{
            return ctx.enemyPlanes.map(info=>{
                return h(EnemyPlane,{x:info.x,y:info.y})
            })
        }


        return h("Container",[
            h(Map),
            h(Plane,{x:ctx.planeInfo.x,y:ctx.planeInfo.y,onAttack:ctx.handleAttack}),
            ...renderBullets(),
            ...renderEnemyPlanes()
        ])
    }
})


const useCreatePlaneInfo = ()=>{
    let  planeInfo = reactive({x:150,y:300,width:258,height:364})
    // 解构会引起响应式的丢失问题
    const {x,y} = useMovePlane(planeInfo.x,planeInfo.y)
    planeInfo.x = x
    planeInfo.y = y
    return planeInfo
}

const useMovePlane = (initX,initY)=>{
    const point = reactive({x:initX,y:initY})
    const speed = 15
 
    const handleKeyDom = e=>{
        switch(e.code){
            case "ArrowUp":
                point.y-=speed
                break;
            case "ArrowDown":
                point.y+=speed
                break;
            case "ArrowRight":
                point.x+=speed
                break;
            case "ArrowLeft":
                point.x-=speed
                break
        }
    }
    onMounted(()=>{
        window.addEventListener('keydown',handleKeyDom)
    })
    onUnmounted(()=>{
        window.removeEventListener('keydown',handleKeyDom)
    })
   
   return toRefs(point)
   //return point
}

const moveBullets = (bullets)=>{
    const speed = 5
    //改变子弹的y坐标
    bullets.forEach(bullet=>{
         bullet.y-=speed
    })
}