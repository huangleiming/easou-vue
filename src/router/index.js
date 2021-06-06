import App from '@/App'

const index = () => import('../views/index');
const login = () => import('../views/login');
const home = () => import('../views/home');
const search = () => import('../views/search');
const reading = () => import('../views/reading');

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
            component: home,
            redirect: '/home/bookrack',
            children:[
                {
                    path: 'bookrack',
                    component: ()=>import('../components/bookrack/bookrack'),
                    meta:{
                        keepAlive:true
                    }
                },
                {
                    path: 'handpick',
                    component: ()=>import('../components/handpick/handpick'),
                    meta:{
                        keepAlive:true
                    }
                },
                {
                    path: 'ranking',
                    component: ()=>import('../components/ranking/ranking'),
                    meta:{
                        keepAlive:true
                    }
                },
                {
                    path: 'classify',
                    component: ()=>import('../components/classify/classify'),
                    meta:{
                        keepAlive:true
                    }
                },
                {
                    path: 'mine',
                    component: ()=>import('../components/mine/mine'),
                    meta:{
                        keepAlive:true
                    }
                }
            ]
        },
        {
            path: 'search',
            component: search
        },
        {
            path: 'reading/:id',
            component: reading
        }
    ]
}]
