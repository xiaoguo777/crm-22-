import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/home.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home',
        icon: 'key',
        name: 'home',
        title: '主页',
        component: Main,
        children: [
            { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/home.vue') }
        ]
    },
    {
        path: '/userManagement',
        icon: 'social-buffer',
        name: '数据一览',
        title: '用户',
        component: Main,
        children: [
            {
                path: 'user',
                icon: 'compose',
                name: 'user',
                title: '用户数据',
                component: () => import('@/views/user/user.vue')
            },
            {
                path: 'report',
                icon: 'arrow-move',
                name: 'report',
                title: '利润数据',
                component: () => import('@/views/report/report.vue')
            }
        ]
    },
    {
        path: '/effect',
        icon: 'ios-grid-view',
        name: 'news',
        title: '功能',
        component: Main,
        children: [
            { path: 'changeSub', title: '更改大冒险', name: 'changeSub', icon: 'arrow-move', component: () => import('@/views/problem/problem.vue') },
            { path: 'changeBg', title: '更改背景图', name: 'changeBg', icon: 'edit', component: () => import('@/views/smallTools/smallTools.vue') },
            { path: 'newsList', title: '群组管理', name: 'news-list', icon: 'search', component: () => import('@/views/newsList/news-list.vue') },
            { path: 'reward', title: '创建管理员', name: 'reward', icon: 'search', component: () => import('@/views/reward/reward.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
