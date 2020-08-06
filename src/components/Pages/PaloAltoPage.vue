<template>
	<main id="content">
		<page-header>
			<template slot="title">Palo Alto Configuration</template>
			<template slot="subtitle">Palo Alto 220 Configuration and XML</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Palo Alto 220">
				<palo-section></palo-section>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import PaloSection from '../PageSections/PaloAlto';

export default {
	components: {
		PageHeader,
		PaloSection
	}
};
</script>
