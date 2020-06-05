<template>
	<div>
		<h3 :class="$style.h3">Interface Configuration</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Gi0/0/0 Interface</h6>
				<input :class="$style.input" v-model="outsideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">Gi0/0/1 Interface</h6>
				<input :class="$style.input" v-model="insideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">Circuit ID (CID)</h6>
				<input :class="$style.input" v-model="cId" />
			</div>
			<div>
				<h6 :class="$style.h6">Service Order</h6>
				<input
					:class="$style.input"
					v-model="serviceOrder"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Customer Name</h6>
				<input
					:class="$style.input"
					v-model="customerName"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Loopback0 Interface</h6>
				<input :class="$style.input" v-model="loopIP" />
			</div>
			<div>
				<h6 :class="$style.h6">VLAN 99 IP Address</h6>
				<input :class="$style.input" v-model="vlan99IP" />
			</div>
			<div>
				<h6 :class="$style.h6">VLAN 136 IP Address</h6>
				<input :class="$style.input" v-model="vlan136IP" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Cellular Interface (0/1/0 or 0/2/0)
				</h6>
				<input
					:class="$style.input"
					v-model="cellularInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Verizon Public Address</h6>
				<input
					:class="$style.input"
					v-model="verizonPublic"
				/>
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
    description CUST <span>{{ cId }}</span> <span>{{ serviceOrder }}</span> <span>{{ customerName }}</span>
    vrf forwarding CUST
    ip address <span>{{ insideIP }}</span>
    ip helper-address 10.10.4.12
    ip helper-address 10.12.4.14
    ip nat inside
    no shutdown
    negotiation auto
  !
  interface GigabitEthernet0/1/0
   description MGMT to PALO ALTO
   switchport trunk allowed vlan 99,136
   switchport mode trunk
   load-interval 30
  !
  interface Vlan99
   description MGMT to PALO vrf SYG
   vrf forwarding SYG
   ip address <span>{{ vlan99IP }}</span> 255.255.255.254
   load-interval 30
  !
  interface Vlan136
   description MGMT to PALO vrf SIMPLOT
   vrf forwarding CUST
   ip address <span>{{ vlan136IP }}</span> 255.255.255.254
   load-interval 30
  !
  interface Cellular<span>{{ cellularInterface }}</span>
    description DIST to External fvrf ISP2
    vrf forwarding ISP2
    ip address negotiated
    ip access-group 199 out
    ip nat outside
    load-interval 30
    dialer in-band
    dialer idle-timeout 0
    dialer watch-group 1
    dialer-group 1
    ipv6 enable
    pulse-time 1
    no shutdown
  !
  ip access-list extended 199
   10 permit ip host <span>{{ verizonPublic }}</span> any
   20 deny   ip any any
  !
  interface Loopback0
    description MGMT to Loopback vrf SYG
    vrf forwarding SYG
    ip address <span>{{ loopIP }}</span>
  !
  interface Cellular0/2/1
   no ip address
   shutdown
  !
  interface Vlan1
   no ip address
   shutdown
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			outsideIP: '24.130.90.2 255.255.255.252',
			insideIP: '10.255.10.1 255.255.255.0',
			cId: '99/KRFS/102647//SYG',
			serviceOrder: 'SO-151678',
			customerName: 'SIMPLOT',
			mgmtIP: '10.50.0.1 255.255.255.252',
			loopIP: '10.16.164.64 255.255.255.255',
			trackIP: '66.232.64.82',
			vlan99IP: '10.50.2.20',
			vlan136IP: '10.255.32.20',
			cellularInterface: '0/2/0',
			verizonPublic: '166.253.2.67'
		};
	}
};
</script>

<style lang="stylus" module>
.h3 {
  padding: 4rem;
  margin-top: -3rem;
  color: var(--color-white);
  background-image: var(--gradient-rainbow);
}

.inputFlex {
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  border: 2px solid var(--color-orange-5);
  margin-bottom: 2rem;

  div {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .h6 {
    font-family: 'Source Code Pro';
    text-transform: none;
    color: var(--color-orange-5);
    font-weight: 400;
    letter-spacing: 0.25px;
    font-size: 16px;
  }

  input {
    width: 35%;
  }
}

.input {
  color: rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  border: 1px solid var(--color-orange-5);
  padding: 1rem;
  margin-bottom: 1rem;

  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}
</style>
