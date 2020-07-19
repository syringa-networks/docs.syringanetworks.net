<template>
	<main id="content">
		<page-header>
			<template slot="title">QoS Phase 1</template>
			<template slot="subtitle">QoS Configuration for Phase 1</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="IOS-XE Standard">
				<phase-one-xe-standard></phase-one-xe-standard>
			</tab>
			<tab name="IOS-XE Custom">
				<phase-one-xe-custom></phase-one-xe-custom>
			</tab>
			<tab name="IOS-XR Standard">
				<phase-one-xr-standard></phase-one-xr-standard>
			</tab>
			<tab name="IOS-XR Custom">
				<phase-one-xr-custom></phase-one-xr-custom>
			</tab>
			<tab name="REP Segments">
				NEED TO ADD SOME REP SEGMENTS
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import PhaseOneXeStandard from './qos-phases/PhaseOneXeStandard';
import PhaseOneXeCustom from './qos-phases/PhaseOneXeCustom';
import PhaseOneXrStandard from './qos-phases/PhaseOneXrStandard';
import PhaseOneXrCustom from './qos-phases/PhaseOneXrCustom';

export default {
	components: {
		PageHeader,
		PhaseOneXeStandard,
		PhaseOneXeCustom,
		PhaseOneXrStandard,
		PhaseOneXrCustom
	}
};
</script>
