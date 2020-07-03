const ImgLoader = {
    onload(imgs,fn){
        const imgPros = imgs.map((img=>{
            return ImgLoader.imgPro(img)
        }));
        Promise.all(imgPros).then(res=>{
            fn(res);
        },()=>{
            console.log('图片加载失败!')
        })
    },
    imgPro(img){
        return new Promise(resolve=>{
            img.onload = function(){
                resolve(img);
            }
        })
    }
}
export default ImgLoader;