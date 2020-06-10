<template>
	<main id="content">
		<page-header>
			<template slot="title">SDWAN - Simplot Pinnacle</template>
			<template slot="subtitle">SDWAN Configuration for the CPE Simplot Pinnacle sites</template>
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
			<tab name="Routing">
				<routing-section></routing-section>
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
			<tab name="nat">
				<nat-section></nat-section>
			</tab>
			<tab name="ip sla">
				<sla-section></sla-section>
			</tab>
			<tab name="palo alto">
				<palo-section></palo-section>
			</tab>
			<tab name="EEM Script">
				<failover-section></failover-section>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import LicensingSection from '../PageSections/RegularLicensing';
import VrfSection from '../PageSections/Vrf';
import AuthenticationSection from '../PageSections/Authentication';
import ManagementSection from '../PageSections/Management';
import InterfaceSection from '../PageSections/InterfaceConfig';
import CellularSection from '../PageSections/Cellular';
import CryptoSection from '../PageSections/Crypto';
import TunnelSection from '../PageSections/TunnelsPinnacle';
import BgpSection from '../PageSections/BGPPinnacle';
import RoutingSection from '../PageSections/Routing';
import NatSection from '../PageSections/NAT';
import SlaSection from '../PageSections/Sla';
import PaloSection from '../PageSections/PaloAlto';
import FailoverSection from '../PageSections/FailoverScript';

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
		NatSection,
		SlaSection,
		PaloSection,
		FailoverSection
	}
};
</script>
