<template>
	<div>
		<h3>Interface Configuration</h3>
		<div class="inputFlex">
			<div>
				<h6>Gi0/0/0 Interface</h6>
				<input v-model="outsideIP" />
			</div>
			<div>
				<h6>Gi0/0/1 Interface</h6>
				<input v-model="insideIP" />
			</div>
			<div>
				<h6>Circuit ID (CID)</h6>
				<input v-model="cId" />
			</div>
			<div>
				<h6>Service Order</h6>
				<input v-model="serviceOrder" />
			</div>
			<div>
				<h6>Customer Name</h6>
				<input v-model="customerName" />
			</div>
			<div>
				<h6>Unique Customer Location (City)</h6>
				<input v-model="customerLocation" />
			</div>
			<div>
				<h6>Palo Alto Hostname</h6>
				<input v-model="paloAltoHostname" />
			</div>
			<div>
				<h6>Loopback0 Interface</h6>
				<input v-model="loopIP" />
			</div>
			<div>
				<h6>VLAN 99 IP Address</h6>
				<input v-model="vlan99IP" />
			</div>
			<div>
				<h6>VLAN 136 IP Address</h6>
				<input v-model="vlan136IP" />
			</div>
		</div>
		<pre>
      <code>
interface GigabitEthernet0/0/0
 description DIST to External fvrf ISP1
 vrf forwarding ISP1
 ip address <span>{{ outsideIP }}</span>
 ip nat outside
 no shutdown
 negotiation auto
!
interface GigabitEthernet0/0/1
 description CUST <span>{{ cId }}</span> <span>{{ serviceOrder }} {{ customerName }} {{ customerLocation }} via {{ paloAltoHostname }}</span> 
 vrf forwarding CUST
 ip address <span>{{ insideIP }}</span>
 ip helper-address 10.10.4.12
 ip helper-address 10.12.4.14
 ip nat inside
 no shutdown
 negotiation auto
!
interface GigabitEthernet0/1/0
 description MGMT to <span>{{ paloAltoHostname }}</span> Trunk Port
 switchport trunk allowed vlan 99,136
 switchport mode trunk
 load-interval 30
!
interface Vlan99
 description MGMT to <span>{{ paloAltoHostname }}</span> vrf SYG
 vrf forwarding SYG
 ip address <span>{{ vlan99IP }}</span> 255.255.255.254
 load-interval 30
!
interface Vlan136
 description MGMT to <span>{{ paloAltoHostname }}</span> vrf SIMPLOT
 vrf forwarding CUST
 ip address <span>{{ vlan136IP }}</span> 255.255.255.254
 load-interval 30
!
interface Loopback0
 description MGMT to Loopback vrf SYG
 vrf forwarding SYG
 ip address <span>{{ loopIP }}</span>
!
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const outsideIP = '24.130.90.2 255.255.255.252';
		const insideIP = '10.255.10.1 255.255.255.0';
		const cId = '99/KRFS/102647//SYG';
		const serviceOrder = 'SO-151678';
		const customerName = 'Simplot';
		const customerLocation = 'Chicago';
		const paloAltoHostname = 'SNGWU2001PA001';
		const loopIP = '10.16.164.64 255.255.255.255';
		const vlan99IP = '10.50.2.20';
		const vlan136IP = '10.255.32.20';
		return {
			outsideIP,
			insideIP,
			cId,
			serviceOrder,
			customerName,
			customerLocation,
			paloAltoHostname,
			loopIP,
			vlan99IP,
			vlan136IP
		};
	}
};
</script>
