import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueCompositionApi from '@vue/composition-api';

// Global Directives
import '@/directives/directives.js';

// Global Components
import Tab from '@/components/Reusable/Tab';
import Tabs from '@/components/Reusable/Tabs';

Vue.component('Tab', Tab);
Vue.component('Tabs', Tabs);
// End Global Components

Vue.use(VueCompositionApi);

// Global Style
import './assets/style/z_main.styl';

require('typeface-fira-mono');
require('typeface-fira-sans');
require('typeface-source-code-pro');

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
