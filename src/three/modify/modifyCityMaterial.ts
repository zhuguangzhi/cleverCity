import * as THREE from "three";
import {Box3, Material, Mesh, Shader} from "three";
import gsap from "gsap";

export const ModifyCityMaterial = (mesh: Mesh) => {
    //在编译shader程序之前立即执行的可选回调
    (mesh.material as Material).onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <dithering_fragment>`,
            `#include <dithering_fragment>
                        //#end#
        `
        )
        gradColor(mesh,shader)
        spread(shader,new THREE.Vector2(0,0))
        addLightLine(shader)
    }

}
// 渐变
export const gradColor = (mesh: Mesh, shader: Shader) => {
    //computeBoundingBox 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]
    mesh.geometry.computeBoundingBox();
    const {min, max} = mesh.geometry.boundingBox as Box3
//    获取物体的高度差
    const uHeight = max.y - min.y;

    shader.uniforms.uTopColor = {
        value: new THREE.Color("#aaaeff")
    };
    shader.uniforms.uHeight = {
        value: uHeight
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
        `//#end#`,
        `
                vec4 distGradColor = gl_FragColor;
                
                // 设置混合百分比 
                float gradMix = (vPosition.y + uHeight/2.0)/uHeight;
                // 计算出混合颜色
                vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
                gl_FragColor = vec4(gradMixColor,1);
                //#end#
            `
    )
}

// 添加建筑材质光波扩散特效
export const spread =  (shader: Shader,center:THREE.Vec2) => {
//    设置原点扩散的中心
    shader.uniforms.u_SpreadCenter = {value:center}
//    设置扩散时间
    shader.uniforms.u_SpreadTime = {value:-2000}
// 波光宽度
    shader.uniforms.u_SpreadWidth = {value:20}

    shader.fragmentShader = shader.fragmentShader.replace(
        `#include <common>`,
        `
            #include <common>
            uniform vec2 u_SpreadCenter;
            uniform float u_SpreadTime;
            uniform float u_SpreadWidth;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        `//#end#`,
        `
            // 计算顶点到中心的距离
            float radius = distance(vPosition.xz,u_SpreadCenter);
            // 扩散范围函数 一元二次方程 开口向下 获取最大值
            float spread = -(radius - u_SpreadTime)*(radius - u_SpreadTime)+u_SpreadWidth;
            if(spread>0.0) {
                gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spread/u_SpreadWidth);
            }
            //#end#
        `
    )
    gsap.to(shader.uniforms.u_SpreadTime, {
        value: 800,
        duration: 3,
        ease: "none",
        repeat: -1,
    });
}
export const addLightLine = (shader:Shader)=>{
    //   扩散的时间
    shader.uniforms.uLightLineTime = { value: -1500 };
    //   设置条带的宽度
    shader.uniforms.uLightLineWidth = { value: 200 };

    shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `
        #include <common>
  
        
        uniform float uLightLineTime;
        uniform float uLightLineWidth;
        `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
        "//#end#",
        `
      float LightLineMix = -(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;
  
      if(LightLineMix>0.0){
          gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /uLightLineWidth);
          
      }
  
      //#end#
      `
    );

    gsap.to(shader.uniforms.uLightLineTime, {
        value: 1500,
        duration: 5,
        ease: "none",
        repeat: -1,
    });
}