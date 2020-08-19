<template>
	<main id="content">
		<page-header>
			<template slot="title">Accedian NID</template>
			<template slot="subtitle">Accedian NID Configuration and Testing</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Configuration - 1G">
				<configuration-section></configuration-section>
			</tab>
			<tab name="Testing - 1G">
				<testing-section></testing-section>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import ConfigurationSection from './AccedianNid/Configuration';
import TestingSection from './AccedianNid/Testing';

export default {
	components: {
		PageHeader,
		ConfigurationSection,
		TestingSection
	}
};
</script>
