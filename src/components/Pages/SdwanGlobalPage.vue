<template>
	<main id="content">
		<page-header>
			<template slot="title">Global SD-WAN</template>
			<template slot="subtitle"
				>SDWAN Configuration for the Global SD-WAN
				Deployments</template
			>
		</page-header>
		<tabs>
			<tab :selected="true" name="VRF">
				<vrf-config></vrf-config>
			</tab>
			<tab name="Radius">
				<radius-config></radius-config>
			</tab>
			<tab name="DNS">
				<dns-config></dns-config>
			</tab>
			<tab name="Interface">
				<interface-config></interface-config>
			</tab>
			<tab name="Cellular">
				<cellular-config></cellular-config>
			</tab>
			<tab name="Crypto">
				<crypto-config></crypto-config>
			</tab>
			<tab name="Tunnels">
				<tunnel-interfaces></tunnel-interfaces>
			</tab>
			<tab name="IP SLA">
				<sla-config></sla-config>
			</tab>
			<tab name="NAT">
				<nat-config></nat-config>
			</tab>
			<tab name="BGP">
				<bgp-config></bgp-config>
			</tab>
			<tab name="Misc">
				<misc-config></misc-config>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';
import TunnelInterfaces from './SDWANGlobal/TunnelInterfaces';
import BgpConfig from './SDWANGlobal/BgpConfig';
import NatConfig from './SDWANGlobal/NatConfig.vue';
import RadiusConfig from './SDWANGlobal/RadiusConfig';
import SlaConfig from './SDWANGlobal/SlaConfig.vue';
import MiscConfig from './SDWANGlobal/MiscConfig.vue';
import CryptoConfig from './SDWANGlobal/CryptoConfig';
import CellularConfig from './SDWANGlobal/CellularConfig';
import InterfaceConfig from './SDWANGlobal/InterfaceConfig';
import DnsConfig from './SDWANGlobal/DnsConfig';
import VrfConfig from './SDWANGlobal/VrfConfig';

export default {
	components: {
		PageHeader,
		TunnelInterfaces,
		BgpConfig,
		NatConfig,
		RadiusConfig,
		SlaConfig,
		MiscConfig,
		CryptoConfig,
		CellularConfig,
		InterfaceConfig,
		DnsConfig,
		VrfConfig
	}
};
</script>
