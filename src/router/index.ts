import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const pageRouters:Array<RouteRecordRaw> = []
const router = createRouter({
    history:createWebHistory(),
    routes:pageRouters
})
export default router