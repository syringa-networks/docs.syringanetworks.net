<template>
	<main id="content">
		<page-header>
			<template slot="title">SDWAN 2.0 Domestic</template>
			<template slot="subtitle">SDWAN Configuration for the CPE domestic sites</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Licensing">
				<licensing-section></licensing-section>
			</tab>
			<tab name="VRF">
				<vrf-section></vrf-section>
			</tab>
			<tab name="Authentication">
				<authentication-section></authentication-section>
			</tab>
			<tab name="Management">
				<management-section></management-section>
			</tab>
			<tab name="Interface">
				<interface-section></interface-section>
			</tab>
			<tab name="Cellular">
				<cellular-section></cellular-section>
			</tab>
			<tab name="Crypto">
				<crypto-section></crypto-section>
			</tab>
			<tab name="Tunnels">
				<tunnel-section></tunnel-section>
			</tab>
			<tab name="BGP">
				<bgp-section></bgp-section>
			</tab>
			<tab name="Routing">
				<routing-section></routing-section>
			</tab>
			<tab name="nat">
				<nat-section></nat-section>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import LicensingSection from '../PageSections/Licensing';
import VrfSection from '../PageSections/Vrf';
import AuthenticationSection from '../PageSections/Authentication';
import ManagementSection from '../PageSections/Management';
import InterfaceSection from '../PageSections/InterfaceConfig.vue';
import CellularSection from '../PageSections/Cellular';
import CryptoSection from '../PageSections/Crypto';
import TunnelSection from '../PageSections/Tunnels';
import BgpSection from '../PageSections/BGP';
import RoutingSection from '../PageSections/Routing';
import NatSection from '../PageSections/NAT';

export default {
	components: {
		PageHeader,
		LicensingSection,
		VrfSection,
		AuthenticationSection,
		ManagementSection,
		InterfaceSection,
		CellularSection,
		CryptoSection,
		TunnelSection,
		BgpSection,
		RoutingSection,
		NatSection
	}
};
</script>
