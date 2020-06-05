<template>
	<main id="content">
		<page-header>
			<template slot="title"
				>ASR 920 Configuration</template
			>
			<template slot="subtitle"
				>ASR 920 Configuration for L2 and L3 rings</template
			>
		</page-header>
		<tabs>
			<tab :selected="true" name="920 Routed">
				<Routed />
			</tab>
			<tab name="920 REP">
				<Rep />
			</tab>
			<!-- <tab name="Test">
				<Test />
			</tab> -->
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import Routed from '@/components/Pages/Asr920/Routed';
import Rep from '@/components/Pages/Asr920/Rep';
// import Test from '@/components/Pages/Asr920/Test';

export default {
	components: {
		PageHeader,
		Routed,
		Rep
		// Test
	}
};
</script>
