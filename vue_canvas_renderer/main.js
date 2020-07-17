import {createApp} from './src/runtime-canvas'
import App from './src/App.js'
import {getCanvasRootContainer}  from './src/Game'

// stage是canvas的一个根容器

createApp(App).mount(getCanvasRootContainer())

