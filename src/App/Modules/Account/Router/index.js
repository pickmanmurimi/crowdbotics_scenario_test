import { Account } from "../Views";

export default [
    {
        path: "/account",
        component: Account,
        name: "Account",
        meta: {
            requiresAuth: true,
            onmenu: true,
            title: "Account",
            icon: "ni ni-single-02",
            permission: '*'
        }
    },
]
