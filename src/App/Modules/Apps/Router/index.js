import { Apps,CreateApp, ManageApp, BasicInfo,Settings, Plans } from "../Views";

export default [
    {
        path: "/apps",
        component: Apps,
        name: "Apps",
        meta: {
            requiresAuth: true,
            onmenu: true,
            title: "Apps",
            icon: "ni ni-spaceship",
            permission: '*'
        }
    },
    {
        path: "/create-app",
        component: CreateApp,
        name: "CreateApp",
        meta: {
            requiresAuth: true,
            onmenu: false,
            title: "Create App",
            icon: "fa fa-rocket",
            permission: '*'
        }
    },
    {
        path: "/manage/:app_id",
        component: ManageApp,
        name: "ManageApp",
        meta: {
            requiresAuth: true,
            onmenu: false,
            title: "Manage App",
            icon: "fa fa-rocket",
            permission: '*'
        },
        props:true,
        children : [
            {
                path: "manage/basic-info/:app_id",
                component: BasicInfo,
                name: "BasicInfo",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: false,
                    ManageAppMenu: true,
                    title: "Basic Info",
                    icon: "fa fa-rocket",
                    permission: '*'
                }
            },
            {
                path: "manage/app-plans/:app_id",
                component: Plans,
                name: "AppPlans",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: false,
                    ManageAppMenu: true,
                    title: "Plans",
                    icon: "fa fa-plane",
                    permission: '*'
                }
            },
            {
                path: "manage/app-settings/:app_id",
                component: Settings,
                name: "Settings",
                props: true,
                meta: {
                    requiresAuth: true,
                    onmenu: false,
                    ManageAppMenu: true,
                    title: "Settings",
                    icon: "fa fa-cog",
                    permission: '*'
                }
            },

        ]
    },
]
