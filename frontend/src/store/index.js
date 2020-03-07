import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken: null,
		userId: null
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData;
			axios.defaults.headers.common['Authorization'] = 'jwt ' + userData;
		}
	},
	actions: {
		login({ commit }, authData) {
			commit('authUser', authData);
		}
	},
	modules: {}
});
