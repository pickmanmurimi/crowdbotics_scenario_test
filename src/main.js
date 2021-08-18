import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import VuePageTransition from 'vue-page-transition'



Vue.config.productionTip = false

require("./App/Common/Helpers/Axios/Axios");

import { default as Helpers } from "./App/Common/Helpers";
import { default as swalPlugin } from './App/Common/Helpers/Plugins/swal/swal'
import { default as FullLoaderPlugin } from './App/Common/Helpers/Plugins/FullLoader/index'
import Authentication from "./App/Common/Mixins/Authentication";
import Permissions from "./App/Common/Mixins/Permissions";

Vue.use(VuePageTransition)

Vue.use(swalPlugin);
Vue.use(FullLoaderPlugin);
Vue.use(Helpers);
Vue.mixin( Authentication )
Vue.mixin( Permissions )

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
