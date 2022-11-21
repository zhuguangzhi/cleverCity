import * as THREE from "three";
import {sceneInit} from "./sceneInit";
import createCity from "./mesh/city";

export const createMesh = ()=>{
    createCity()
    // const plane = new THREE.Mesh(
    //     new THREE.PlaneGeometry(20,20),
    //     new THREE.MeshBasicMaterial({color:0xffffff})
    // )
    // plane.position.set(0,0,-5)
    // plane.receiveShadow = true
    // sceneInit.add(plane)
}