# canvas 概述

canvas 一张画布 js在canvas里绘制图形

设置canvas dom元素的width height属性 不能用css设置canvas尺寸
canvas尺寸过大，其中的图像不会显示 
canvas尺寸尽量控制在4000以内 具体极限值因浏览器、平台不同而不同

canvas 上下文对象----画笔 canvas.getContext('2d')

## canvas绘图方法

* canvas坐标系和栅格

  
  (0, 0)处于左上角 x轴正方向---水平向右 y轴正方向----垂直向下
  由像素点组成，像素的数量等于canvas的宽度*高度 每个像素具有rgba数据

* 矩形的绘制
  + 填充矩形方法 fillRect(x, y, w, h)
  + 描边矩形方法 strokeRect(x, y, w, , h) 原点在边框中间 居中描边
  + 清理矩形方法 clearRect(x, y, w, h)  清理描边矩形至内边框 外边框不清出

  

* 绘制路径
  + 建立路径 beginPath()

    ctx.beginPath()除了字面上的意思 开始路径集合
    当用在再次使用该属性时 将前一个路径集合清空

  + 向路径集合中添加子路径

  

    

``` js
       [
         // 移动到起点 子路径的第一个路径可省略moveTo(x,y)
         // 省略后为形状的第一个起始点
         // 直线不可省略。
         形状;closePath() --可选--路径闭合,
         moveTo(x, y);形状;closePath() --可选,
         moveTo(x, y);形状;closePath() --可选
       ]

       +
       子路径的形状

       // 直线 第一个直线子路径 不可以省略moveTo()
       // 没有设置结束路径时
       // moveTo()将两个子路径分隔开，否则下一个子路径的起始点是以上一个子路径结束的点作为起始坐标点
       // 设置结束路径
       // 则下一个子路径的起始点与上一个子路径的起始点是一样的
       lineTo(x, y)

       // 圆弧 (x,y)圆心的位置 α = (n * π) / 180
       // 弧度制 顺时针弧度为正值 x轴正方向 α = 0
       // 画圆时 最好使用moveTo()将两个子路径作为独立的路径
       // 不指定起始点 两个圆认为是一个子路径。
       arc(x, y, 半径， 开始弧度， 结束弧度， 方向)

       // 切线圆弧 
       arcTo(x1, y1, x2, y2, 半径)
       // 二次贝塞尔曲线 控制点(cpx1,cpx2) 
       quadraticCurveTo(cpx1, cpy1, x, y)
       // 三次贝塞尔曲线、
       bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y)

       // 矩形 遵循路径原则 rect函数集成了moveTo()方法 
       // 两个子路径不需要显示调用moveTo()分割两个路径
       rect(x, y, w, h)

         +
         closePath()
       // 闭合路径 
       // 不影响填充 填充的效果都是一样的
```

  + 显示路径 填充fill() 描边stroke()

  + 路径

    一个上下文对象同时只能有一个路径集合，想要绘制新的路径，就要将当前路径置空，
    beginPath()方法将当前路径置空，也就是将路径集合恢复到默认状态，让之后绘制的路径不受以之前的路径的影响

  + 子路径

    是一条只有一个起点、连续不断开的线、
    moveTo(x,y)是设置路径起点的方法，也是创建一条新的子路径的方法
    路径里的第一条子路径可以无需设置起始点，他的起始点默认是子路径中的第一个点

* 图形的样式
  + 描边样式 strokeStyle

    影响描边样式的因素

``` js
      strokeStyle: 描边颜色
      lineWidth: 描边宽
      lineCap： 描边端点样式 端点使用什么样式来封口 默认butt： 没有样式 round: 圆 square长方形
      lineJoin: 描边拐角类型 miter: 尖角 round： 圆角 bevel: 平的
      miterLimit: 拐角最大厚度 若拐角过小 会导致厚度过大-- - 内角与外角之间的距离--变得特别尖， miterLimit: 1 斜接长度超过 miterLimit 的值， 边角会以 lineJoin 的 "bevel"
      类型来显示
      setLineDash(segments): 描边设置为虚线 segments = [实线长度, 虚线长度] 相互交替
      lineDashOffset: 虚线偏移量 虚线绘制的起点-- - 表现为虚线向左(+) / 向右(-) 缩进多少个像素
```

  + 填充样式 fillStyle
  + 纯色---与css颜色一致
  + 渐变
    1. 建立渐变对象

        正、长方形 是以对象线为线性渐变的状态
        线性渐变---gradient = createLinearGradient(x1,y1,x2,y2)
        径向渐变---gradient = createRadialGradient(x1,y1,r1,x2,y2,r2)

    2. 定义渐变的颜色节点

        gradient.addColorStop(position,color)

    3. 赋值方式

        ctx.fillStyle = gradient
        ctx.strokeStyle = gradient

  + 纹理
    1. 建立纹理对象 image 为h5的image标签

       pattern = context.createPattern(image,"repeat|repeat-x|repeat-y|no-repeat")

    2. 为着色样式赋值

       ctx.fillStyle = pattern

* 投影

  位置：shadowOffsetX = float

        shadowOffsetY = float

  模糊度：shadowBlur = float 值越大 越模糊
  颜色：shadowColor = color
  投影是上下文对象的一种属性，在绘制图形时，无论执行的是描边方法，还是填充方法，都会在其
  所绘制图形的后面添加投影

* 文本

  字体：font 设置文本的字号、字体等属性
  水平对齐：textAlign start: 基线在左边 end: 基线在右边 center: 居中
  垂直对齐：textBaseline top: 上--顶部对齐 bottom: 下--底部对齐 middle
  填充文字： fillText(text, x, y, maxWidth)
  描边文字： strokeText(text, x, y, maxWidth)
  获取文字宽度：ctx.measureText(text).width

* 图像

  将现有图片等放到canvas中去，便于以后获取图片的像素集合, (getImageData()方法获取)
  图像源 JS绘制

  1. <img> 图像 new Image()
  2. <video> 视频  h5标签 

``` js
    const vid = document.getElementById('vid')
    let interval = null
    vid.addEventListener('play', function() {
      // 当视频播放时 将其绘制在canvas帆布上面
      interval = setInterval(function() {
        ctx.drawImage(vid, 0, 0)
      }, 40)
      // 40ms  25帧每秒-->1000ms--25帧 40ms一帧 
    })
    vid.addEventListener('pause', function() {
      clearInterval(interval)
    })
```

  1. <canvas> canvas

  绘制图像的方法 drawImage() 

  1. 绘图+位移 drawImage(image,x,y) x/y 图片左上角的位置
  2. 绘图+位移+缩放 drawImage(image,x,y，width,height) width/height 缩放以后的宽高
  3. 绘图+裁切+位移+缩放 drawImage(image,x1,y1,w1,h1,x2,y2,w2,h2)

     x1 y1 w1 h1 对应裁切 是一个相机视角，
     x1,y1 裁切就是移动相机的视角
     w1,h1 缩放相机的视角，可见范围变大变小
     x2 y2 w2 h2则是对裁切以后的图片进行操作

``` js
//雪碧图裁剪图像
//小图的数量
const len = 8
//小图大小
const size = 256
//当前帧
let fm = 0
const img = new Image()
img.src = './bomb.jpg'
img.onload = draw()

function draw() {
  //先将相机缩放至左上角 裁剪下一张图片时，直接平移相机视角
  ctx.drawImage(img, fm * size, 0, size, size, 0, 0, size, size)
  fm = fm === len ? 0 : fm + 1
}
let timer = setInterval(draw, 100)
```

  

* 获取图像像素级操作

imageData 是图片的数据化 
  --data:8位无符号整型固定数组 <0 就是0 >255则为255 小数则取为整数 [r, g, b, a]

    width
    height

  1. 建立ImageData()对象 -- 相当于自己新建了一个一张图片

  ----new ImageData()
  ----ctx.createImageData()

  2. 获取canvas的imageData()对象,可以获取到真实图片的数据,可以灵活操作像素

  ----ctx.getImageData(x, y, width, height)

  3. 将imageData画在canvas帆布上

  putImageData(imgDt, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
  dx, dy 数据放到canvas中的位置
  dirtyX, dirtyY, dirtyWidth, dirtyHeight 相对于图片的左上角进行计算 裁切

  

``` js
  //根据行列遍历 先遍历列 知道每个像素的坐标
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (y * width + x) * 4
      let r = data[index]
      let g = data[index + 1]
      let b = data[index + 2]
      let a = data[index + 3]
      console.log(y, x) //对应在图片中的二维坐标
    }
  }
```

  + 彩色图片变灰的公式

  
   

``` js
    for (let i = 0; i < data.length; i++) {
      const [r, g, b] = [
        data[i],
        data[i + 1],
        data[i + 2]
      ]
      //灰度的计算公式
      const lm = 0.299 * r + 0.587 * g + 0.114 * b
      data[i] = lm;
      data[i + 1] = lm
      data[i + 2] = lm
    }
```

* 马赛克

  获取每一个矩形的左上角的像素点rgb, 再将这一点的rgb填充给每一个矩形

  

``` js
   const img = new Image()
   img.src = './river.jpg'
   img.onload = draw
   let size = 3

   function draw() {
     const {
       width,
       height
     } = img
     ctx.drawImage(img, 0, 0)
     const imgDt = ctx.getImageData(0, 0, width, height)
     const data = imgDt.data
     for (let y = 0; y < height; y += size) {
       for (let x = 0; x < width; x += size) {
         let index = (y * width + x) * 4
         let [r, g, b] = [
           data[index],
           data[index + 1],
           data[index + 2]
         ]
         ctx.fillStyle = `rgb(${r},${g},${b})` 
         ctx.fillRect(x, y, size, size)
       }
     }
   }
```

  + 上下文状态 

    上下文状态就是上下文对象的属性，比如描边颜色，填充颜色，投影，线条样式，变换信息
    ctx.save() 保存当前状态
    ctx.restore() 恢复上一次保存的状态

  

  + 变换的本质是对canvas坐标系的操作

    translate(x,y) 移动
    rotate(angle) 旋转
    scale(x,y) 缩放 范围为0--1

## 动画

* 制作动画的4步

  清空canvas
  保存canvas状态
  绘制动画图形
  恢复canvas状态

* 驱动动画的方法

  setTimeOut(fn, time)
  setInterval(fn, time)
  requestAnimationFrame(fn)
  隐藏浏览器标签后，便不会运行，与浏览器刷新频率同步。动画的时间间隔无法自定义

* 补间动画

  是在两个关键帧之间，以某种算法自动计算物体运动的差值，从而形成一种过渡效果

* canvas图形没有监听事件的方法，用鼠标选择图形时，只能使用canvas画布监听事件，获取鼠标、触摸点在canvas中的位置，再基于canvas中的位置和形状，判断选择的点位是否在图形中。

## 合成

* 透明度合成 globalAlpha 基于像素

  ctx.globalAlpha = xxx, 范围为0-1之间

* 路径裁剪 clip()

  在画布上设置一个路径，之后绘制的图像只显示存在该这路径中的部分。
  裁剪步骤：定义路径

           ctx.clip()
           绘制其他图形

* 全局合成 globalCompositeOption 基于像素

  canvas画布中的现有图像和即将绘制的图像融合方式，
  可以从形状和色彩两方面解读全局合成
  destination-out:(原图形-即将绘制的图形)所得到剩下的图形---->刮刮乐。

  
