import {controls} from "./controls";
import {renderer} from "./renderer";
import {sceneInit} from "./sceneInit";
import {camera} from "./camera";

export const animate = ()=> {
    controls.update()
//    动画帧，每帧执行一次
    requestAnimationFrame(animate)
    //使用渲染器，通过相机将场景渲染进来
    renderer.render(sceneInit, camera)
}