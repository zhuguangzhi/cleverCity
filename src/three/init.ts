import {camera} from "./camera";
import {renderer} from "./renderer";

export const init = ()=>{
    //监听页面变化 更新渲染页面
    window.addEventListener('resize', () => {
//    更新摄像头的可视区域横纵比
        camera.aspect = window.innerWidth / window.innerHeight
//    更新摄像头的投影矩阵
        camera.updateProjectionMatrix()
//    更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
//    设置渲染器的像素比
        renderer.setPixelRatio(window.devicePixelRatio)
    })
}