import Vue from 'vue';
import Vuex from 'vuex';
import header from './modules/header';
import footer from './modules/footer';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		header,
		footer
	}
});
