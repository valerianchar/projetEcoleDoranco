import { createWebHistory, createRouter } from "vue-router";
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import SinglePage from './pages/SinglePage';
import UpdatePage from './pages/UpdatePage';


const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/post/create', name: 'create-post', component: CreatePage},
    {path: '/post/single/:id', name: 'single-post', component: SinglePage},
    {path: '/post/update/:id', name: 'update-post', component: UpdatePage},
    {path: '/login', name: 'login', component: LoginPage},
    {path: '/register', name: 'register', component: RegisterPage},
    {path: '/:catchAll(.*)', name: 'not-found', component: NotFoundPage},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router