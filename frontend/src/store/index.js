import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		idToken: getSavedState('auth.idToken'),
		userId: null
	},
	mutations: {
		authUser(state, userData) {
			state.idToken = userData;
			axios.defaults.headers.common['Authorization'] = 'jwt ' + userData;
			saveState('auth.idToken', userData);
		}
	},
	actions: {
		login({ commit }, authData) {
			commit('authUser', authData);
		}
	},
	modules: {}
});

function getSavedState(key) {
	return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, JWT) {
	window.localStorage.setItem(key, JSON.stringify(JWT));
}
