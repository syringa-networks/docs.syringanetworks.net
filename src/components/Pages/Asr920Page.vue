<template>
	<main id="content">
		<page-header>
			<template slot="title">ASR 920 Configuration</template>
			<template slot="subtitle">ASR 920 Configuration for L2 and L3 rings</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Base: Routed">
				<BaseRouted />
			</tab>
			<tab name="Base: REP">
				<Rep />
			</tab>
			<tab name="Routed">
				<Routed />
			</tab>
			<tab name="BGP">
				Thing
			</tab>
			<tab name="Customer">
				Thing
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import Routed from '@/components/Pages/Asr920/Routed';
import BaseRouted from '@/components/Pages/Asr920/Routed/Base';
import Rep from '@/components/Pages/Asr920/Rep';

export default {
	components: {
		PageHeader,
		Routed,
		BaseRouted,
		Rep
	}
};
</script>
