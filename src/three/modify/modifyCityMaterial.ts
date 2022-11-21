import {Box3, Material, Mesh} from "three";
import * as THREE from "three"

export const ModifyCityMaterial = (mesh:Mesh)=>{
    //computeBoundingBox 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]
    mesh.geometry.computeBoundingBox()
    const {min,max} = mesh.geometry.boundingBox as Box3
//    获取物体的高度差
    const uHeight = max.y - min.y;
    //在编译shader程序之前立即执行的可选回调
    (mesh.material as Material).onBeforeCompile = (shader)=>{
        shader.uniforms.uTopColor = {
            value:new THREE.Color("#aaaeff")
        };
        shader.uniforms.uHeight = {
            value:uHeight
        };
        shader.vertexShader = shader.vertexShader.replace(
            `#include <common>`,
            `
                #include <common>
                varying vec3 vPosition;
            `
        )
        shader.vertexShader = shader.vertexShader.replace(
            `#include <begin_vertex>`,
            `
                #include <begin_vertex>
                vPosition = position;
            `
        )
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <common>`,
            `
                #include <common>
                uniform float uHeight;
                uniform vec3 uTopColor;
                varying vec3 vPosition;
            `
        )
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <dithering_fragment>`,
            `
                #include <dithering_fragment>
                vec4 distGradColor = gl_FragColor;
                
                // 设置混合百分比 
                float gradMix = (vPosition.y + uHeight/2.0)/uHeight;
                // 计算出混合颜色
                vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
                gl_FragColor = vec4(gradMixColor,1);
            `
        )
    }
}