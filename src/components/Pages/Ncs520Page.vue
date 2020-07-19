<template>
	<main id="content">
		<page-header>
			<template slot="title">NCS 520 Configuration</template>
			<template slot="subtitle">NCS 520 Configuration for L2 and L3 rings</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="520 Routed">
				Thing
			</tab>
			<tab name="520 Switched">
				Other Things
			</tab>
			<tab name="Common Config">
				Stuff
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';

export default {
	components: {
		PageHeader
	}
};
</script>
