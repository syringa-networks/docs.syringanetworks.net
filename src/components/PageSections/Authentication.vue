<template>
	<div>
		<h3>Authentication Configuration</h3>
		<!-- RADIUS REQUIREMENT -->
		<div class="inputFlex">
			<div>
				<h6>
					Is this box 16.9.x with Radius Source in a VRF?
				</h6>
				<select v-model="radius.selectedRadius">
					<option :value="{ id: radius.id, name: radius.name }" v-for="radius in radiusChoice" :key="radius.id">{{
						radius.name
					}}</option>
				</select>
			</div>
		</div>
		<!-- END RADIUS REQUIREMENT -->
		<div class="inputFlex">
			<div>
				<h6>Hostname</h6>
				<input v-model="hostName" />
			</div>
			<div>
				<h6>Trouble Password</h6>
				<input v-model="troublePassword" />
			</div>
			<div>
				<h6>Radius Server Key</h6>
				<input v-model="radiusKey" />
			</div>
		</div>
		<pre>
      <code>
hostname <span>{{ hostName }}</span>
!
username trouble privilege 15 secret <span>{{ troublePassword }}</span>
!
aaa new-model
!<template v-if="radius.selectedRadius.name === 'Yes'">
aaa group server radius RAD-SERVER
 server name RADIUS
 ip vrf forwarding SYG
!
aaa authentication login default group RAD-SERVER local
aaa authorization exec default group RAD-SERVER local
!</template><template v-if="radius.selectedRadius.name === 'No'">
aaa authentication login default group radius local
aaa authorization exec default group radius local
aaa authorization network default local 
!</template>
aaa session-id common
!
interface lo0
 vrf forwarding SYG
!
ip radius source-interface Loopback0 vrf SYG
!
radius-server retry method reorder
radius-server retransmit 1
radius-server timeout 1
radius-server key <span>{{ radiusKey }}</span>
!
radius server RADIUS
 address ipv4 192.168.80.132 auth-port 1645 acct-port 1646
!
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			radius: {
				selectedRadius: {
					id: 2,
					name: 'No'
				}
			},
			radiusChoice: [
				{ id: 1, name: 'Yes' },
				{ id: 2, name: 'No' }
			]
		};
	},
	setup() {
		const hostName = 'BOI-GEN-DEMO-1';
		const troublePassword = '!#*G4#Ebd8w';
		const radiusKey = 'football49';
		return { hostName, troublePassword, radiusKey };
	}
};
</script>
