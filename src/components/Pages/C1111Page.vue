<template>
	<main id="content">
		<page-header>
			<template slot="title">Cisco C1111 Configuration</template>
			<template slot="subtitle">Cisco C1111 Configuration and Troubleshooting</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Dialer Interface">
				<dialer-section></dialer-section>
			</tab>
			<tab name="LTE Modem Upgrade">
				<modem-upgrade-section></modem-upgrade-section>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import DialerSection from '../PageSections/DialerInterface';
import ModemUpgradeSection from '../PageSections/ModemUpgrade';

export default {
	components: {
		PageHeader,
		DialerSection,
		ModemUpgradeSection
	}
};
</script>
