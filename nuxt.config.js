/*
配置自定义路由
*/
export default {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            //先清空路由
            routes.splice(0);
            routes.push(...[
                {
                    path: "/",
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: "",//默认
                            name: "home",
                            component: resolve(__dirname, 'pages/home/'),
                        },
                        {
                            path: "/login",//默认
                            name: "login",
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: "/register",//默认
                            name: "register",
                            component: resolve(__dirname, 'pages/login/'),
                        },
                        {
                            path: "/profile/:username",//默认
                            name: "profile",
                            component: resolve(__dirname, 'pages/profile/'),
                        },
                        {
                            path: "/settings",//默认
                            name: "settings",
                            component: resolve(__dirname, 'pages/settings/'),
                        },
                        {
                            path: "/editor",//默认
                            name: "editor",
                            component: resolve(__dirname, 'pages/editor/'),
                        },
                        {
                            path: "/article/:slug",//默认
                            name: "article-slug-here",
                            component: resolve(__dirname, 'pages/article/'),
                        },
                    ]
                }
            ])
        }
    },
    server: {
        host: "0.0.0.0",
        port: 3000
    },
    plugins: ['~/plugins/request.js', '~/plugins/dayjs.js']
}