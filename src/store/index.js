import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import * as getters from "./getters";
import { default as mutations } from "./mutations";
import * as actions from "./actions";
// import { commonStore } from "../app/store";

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		// ...commonStore
	}
});