import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SDwanGlobal from './views/SDwanGlobal.vue';
import SDwanOne from './views/SDwanOne.vue';
import SDwanTwo from './views/SDwanTwo.vue';
import SDwanPinnacle from './views/SDwanPinnacle';
import C1111 from './views/C1111';
import PaloAlto from './views/PaloAlto';

Vue.use(Router);

const routes = [
	{
		path: '*',
		redirect: '/',
		component: Home
	},
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/vpe',
		name: 'vpe',
		component: () => import(/* webpackChunkName: "azure" */ './views/Vpe.vue')
	},
	{
		path: '/sdwan-global',
		name: 'sdwan-global',
		component: SDwanGlobal
	},
	{
		path: '/sdwan-one',
		name: 'sdwan-one',
		component: SDwanOne
	},
	{
		path: '/sdwan-two',
		name: 'sdwan-two',
		component: SDwanTwo
	},
	{
		path: '/sdwan-pinnacle',
		name: 'sdwan-pinnacle',
		component: SDwanPinnacle
	},
	{
		path: '/c1111',
		name: 'c1111',
		component: C1111
	},
	{
		path: '/palo-alto',
		name: 'palo-alto',
		component: PaloAlto
	},
	{
		path: '/qos',
		name: 'qos',
		component: () => import(/* webpackChunkName: "qos" */ './views/Qos.vue')
	},
	{
		path: '/qos/phase-one',
		name: 'qos-phase-one',
		component: () => import(/* webpackChunkName: "qos" */ './views/QosPhaseOne.vue')
	},
	{
		path: '/asr-920',
		name: 'asr-920',
		component: () => import(/* webpackChunkName: "asr-920" */ './views/Asr920.vue')
	},
	{
		path: '/ncs-520',
		name: 'ncs-520',
		component: () => import(/* webpackChunkName: "ncs-520" */ './views/Ncs520.vue')
	}
];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes
});

export default router;
