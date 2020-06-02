import App from '@/App'

const index = () => import('../views/index');
const login = () => import('../views/login');
const home = () => import('../views/home');
const search = () => import('../views/search');

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '',
            redirect: '/index'
        },
        {
            path: '/index',
            component: index,
        },
        {
            path: 'login',
            component: login
        },
        {
            path: 'home',
            component: home
        },
        {
            path: 'search',
            component: search
        }
    ]
}]
