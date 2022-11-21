import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import {sceneInit} from "../sceneInit";
import {Mesh} from "three";
import {ModifyCityMaterial} from "../modify/modifyCityMaterial";

export const createCity = ()=> {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load("./model/city.glb",(gltf)=>{
        //traverse 方法循环遍历 Threejs 场景中的所有对象
        gltf.scene.traverse((item)=>{
            // console.log('item',item)
            if (item.type==="Mesh") {
                (item as Mesh).material = new THREE.MeshBasicMaterial({
                    color:new THREE.Color(0x0c0e6f)
                });
                ModifyCityMaterial(item as Mesh)
            }
        })
        sceneInit.add(gltf.scene)
    })
}
export default createCity