<template>
	<main id="content">
		<page-header>
			<template slot="title">QoS Overview</template>
			<template slot="subtitle"
				>QoS Overview for Syringa Networks</template
			>
		</page-header>
		<tabs>
			<tab :selected="true" name="Overview">
				<over-vue></over-vue>
			</tab>
			<tab name="Phase 1">
				<phase-one></phase-one>
			</tab>
			<tab name="Phase 2">
				<phase-two></phase-two>
			</tab>
			<tab name="Phase 3">
				<phase-three></phase-three>
			</tab>
			<tab name="Show Commands">
				<show-commands></show-commands>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import OverVue from './QoS/OverVue';
import PhaseOne from './QoS/PhaseOne';
import PhaseTwo from './QoS/PhaseTwo';
import PhaseThree from './QoS/PhaseThree';
import ShowCommands from './QoS/ShowCommands';

export default {
	components: {
		PageHeader,
		OverVue,
		PhaseOne,
		PhaseTwo,
		PhaseThree,
		ShowCommands
	}
};
</script>
