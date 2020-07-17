import {createRenderer} from '@vue/runtime-core'
import {Graphics,Text,Container,Sprite, Texture} from 'pixi.js'

//创建渲染器
const renderer = createRenderer({
    createElement(type){ //根据虚拟的dom开始生成真实的dom节点
        // const element = new Graphics()
        // if(type === 'circle'){
        //   element.beginFill(0xff0000,1)
        //   element.drawCircle(0,0,100)
        //   element.endFill()
        // }
        // return element

        let element
        switch (type) {
            case "Container":
                element = new Container()
                break;
            case "Sprite":
                element = new Sprite()
                break
            default:
                break;
        }
       return element
    },
    //将真实的dom节点添加到父元素
    insert(el,parent){
        parent.addChild(el)
    },
    patchProp(el,key,prevValue,nextValue){
        
        //el[key] = nextValue
        switch (key) {
            case "texture":
                //给图片设置资源路径
                el.texture = Texture.from(nextValue);
                break;
            case "onClick":
                //给元素注册点击事件
                el.on("pointertap",nextValue)
                break;
            default:
                el[key] = nextValue
                break;
        }
    },
    setElementText(el,text){
        
        const canvasText = new Text(text)
        el.addChild(canvasText)
    },
    createText(text){
        return new Text(text)
    },
    // 处理注释
    createComment(){},
    //获取父节点
    parentNode(){},
    //获取兄弟节点
    nextSibling(){},
    //删除节点时调用
    remove(el){
        const parent = el.parent
        if(parent) {
            parent.removeChild(el)
        }
    }
    

})


export function createApp(rootComponent){
    // vue的一个实例饿
     return renderer.createApp(rootComponent)
}