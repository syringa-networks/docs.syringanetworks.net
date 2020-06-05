import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		navList: [
			{
				name: 'Azure VPE',
				location: { name: 'vpe' }
			},
			{
				name: 'SDWAN Global',
				location: { name: 'sdwan-global' }
			},
			{
				name: 'SDWAN 1.0',
				location: { name: 'sdwan-one' }
			},
			{
				name: 'SDWAN 2.0',
				location: { name: 'sdwan-two' }
			},
			{
				name: 'SDWAN Pinnacle',
				location: { name: 'sdwan-pinnacle' }
			},
			// {
			// 	name: 'QoS Overview',
			// 	location: { name: 'qos' }
			// },
			// {
			// 	name: 'QoS Phase 1',
			// 	location: { name: 'qos-phase-one' }
			// },
			{
				name: 'ASR 920',
				location: { name: 'asr-920' }
			},
			{
				name: 'NCS 520',
				location: { name: 'ncs-520' }
			}
		]
	}
};
