import { Login } from "@/App/Modules/Authentication/Views";
import {Register} from "../Views";

export default [
    {
        path: "/",
        component: Login,
        name: "Login",
        meta: {
            requiresAuth: false,
            onmenu: false,
            title: "Login",
            strictNoAuth: true
        }
    },
    {
        path: "/register",
        component: Register,
        name: "Register",
        meta: {
            requiresAuth: false,
            onmenu: false,
            title: "Login",
            strictNoAuth: true
        }
    },
]
