import AuthenticationRoutes from "./Modules/Authentication/Router"
import HomeRoutes from "./Modules/Home/Router"
import AppsRoutes from "./Modules/Apps/Router"
import AccountRoutes from "./Modules/Account/Router"

export default [
    ...AuthenticationRoutes,
    ...HomeRoutes,
    ...AppsRoutes,
    ...AccountRoutes,
]
