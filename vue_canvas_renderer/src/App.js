import {defineComponent,h,computed,ref} from '@vue/runtime-core'
import  GamePage from './page/GamePage'
//创建一个根组件
import StartPage from './page/StartPage'

import  EndPage from './page/EndPage'

export default defineComponent({
    setup(){
        let currentPageName = ref("StartPage")
        let currentPage = computed(()=>{
            if(currentPageName.value==='StartPage')
                return StartPage
            else if(currentPageName.value === 'GamePage')
                return GamePage
            else if(currentPageName.value === 'EndPage')
                return EndPage
        })
        return {
            currentPageName,
            currentPage
        }
    }, 
    render(ctx){
        //let {currentPageName} = ctx
        //console.log(ctx.currentPageName)
       return h('Container',[h(ctx.currentPage,{
           onChangePage(page){
               ctx.currentPageName = page
               
           }
       })])
    }
})
