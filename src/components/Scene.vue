<script setup lang="ts">
import * as THREE from 'three'
import gsap from "gsap";
import {onMounted, ref} from "vue";
//three start
import {sceneInit} from "../three/sceneInit";
import {camera} from "../three/camera";
import {gui} from "../three/gui.ts";
import {acesHelper} from "../three/acesHelper";
import {init} from "../three/init";
import {animate} from "../three/animate";
import {renderer} from "../three/renderer";
//three end

const scene = ref<HTMLElement | null>(null)

sceneInit.add(camera)
sceneInit.add(acesHelper)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({color:0xffffff})
)
sceneInit.add(plane)

onMounted(()=>{
  init()
  animate()
  scene.value?.appendChild(renderer.domElement)
})

</script>
<template>
  <div ref="scene" class="scene"></div>
</template>
<style lang="less" scoped>
.scene {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
}
</style>