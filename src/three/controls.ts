import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {camera} from "./camera";
import {renderer} from "./renderer";

export const controls = new OrbitControls(camera, renderer.domElement)
//控制器阻尼
controls.enableDamping = true