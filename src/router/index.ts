import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeDasboard from "../pages/master/HomeDashboard.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'dashboard',
        component: HomeDasboard,
        children: [

            {
                path: '/home',
                name: 'home',
                component: () => import('../pages/HomePage.vue'),

            },
            {
                path: '/users/:id',
                name: 'users',
                component: () => import('../pages/UserTodos.vue'),

            },
            {
                path: '/users-post/:id',
                name: 'usersPost',
                component: () => import('../pages/UserPost.vue'),

            },
            {
                path:'/albums/:id',
                name:'albums',
                component: () => import('../pages/UserAlbum.vue'),
            },
            {
                path:'/albums/show/:albumId',
                name:'albumPhotos',
                component: () => import('../pages/UserAlbumPhotos.vue'),
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})




export default router
