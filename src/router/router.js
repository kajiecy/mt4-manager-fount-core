import Main from '@/views/layout/Home.vue';




// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/centermanager',
    component: Main,
    children: [
        {path: 'home', name: 'home', component: () => import('@/views/Welcome.vue')},
        {path: '/custom', name: 'custom',meta:{title: 'div拖拽Demo'}, component: () => import('@/components/ShowIdComponents.vue')},
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'centermanager',
                name: 'centermanager',
                meta:{
                    icon: 'iconfont icon-guanli',
                    title: '用户管理',
                },
                component: () => import('@/views/page/index.vue')
            }
        ]
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'moneyin',
                name: 'moneyin',
                meta:{
                    icon: 'iconfont icon-cunqian',
                    title: '入金注资',
                },
                component: () => import('@/views/page/MoneyIn.vue')
            }
        ]
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'moneyout',
                name: 'moneyout',
                meta:{
                    icon: 'iconfont icon-quqian',
                    title: '出金取款',
                },
                component: () => import('@/views/page/MoneyOut.vue')
            }
        ]
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'noticeedit',
                name: 'noticeedit',
                meta:{
                    icon: 'iconfont icon-cunqian',
                    title: '最新公告',
                },
                component: () => import('@/views/page/NoticeEdit.vue')
            }
        ]
    },
    {
        path: '/',
        component: Main,
        children: [
            {
                path: 'filemanager',
                name: 'filemanager',
                meta:{
                    icon: 'iconfont icon-wenjian',
                    title: '资源管理',
                },
                component: () => import('@/views/page/FileManager.vue')
            }
        ]
    },


];
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录界面'
    },
    component: () => import('@/views/common/Login.vue')
};
export const undefindRouter = {
    path: '/404',
    name: '404',
    meta: {
        title: '404 没有找到界面'
    },
    component: () => import('@/views/common/undefindPage.vue')
};
export const nullRouter = {
    path: '*',
    name:'null',
    redirect: '/404'
};
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    otherRouter,
    ...appRouter,
    loginRouter,
    undefindRouter,
    nullRouter
];