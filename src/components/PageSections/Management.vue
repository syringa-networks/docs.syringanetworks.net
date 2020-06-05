<template>
	<div>
		<h3 :class="$style.h3">Management Configuration</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Street Address</h6>
				<input
					:class="$style.input"
					v-model="streetAddress"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Latitude</h6>
				<input :class="$style.input" v-model="lat" />
			</div>
			<div>
				<h6 :class="$style.h6">Longitude</h6>
				<input :class="$style.input" v-model="long" />
			</div>
			<div>
				<h6 :class="$style.h6">SNMP Hostname</h6>
				<input :class="$style.input" v-model="hostName" />
			</div>
		</div>
		<pre>
      <code>
  ip name-server vrf ISP2 1.1.1.1
  ip domain lookup vrf CUST source-interface GigabitEthernet0/0/1
  !
  ip domain name syringanetworks.net
  !
  clock timezone MST -7 0
  clock summer-time MDT recurring
  !
  ip access-list standard IPV4_MGMT_ACCESS
    permit 192.168.7.0 0.0.0.255
    permit 192.168.64.0 0.0.63.255
    permit 10.16.0.0 0.1.255.255
    permit 10.45.0.0 0.0.255.255
    permit 172.20.4.0 0.0.0.255
    permit 172.20.16.0 0.0.0.255
    permit 172.20.20.0 0.0.0.255
    permit 66.232.64.0 0.0.0.63
    permit 66.232.64.64 0.0.0.31
    permit 67.215.44.0 0.0.0.63
    deny any
  !
  snmp-server community OcmeQTo2 RO ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server community S1lFLzMi RW ipv6 IPV6_MGMT_ACCESS IPV4_MGMT_ACCESS
  snmp-server location <span>{{ streetAddress }}</span>  [<span>{{ lat }}</span>, <span>{{ long }}</span>]
  snmp-server contact noc@syringanetworks.net
  snmp-server chassis-id <span>{{ hostName }}</span>
  !
  logging source-interface Loopback0 vrf SYG
  logging host 192.168.7.235 vrf SYG
  logging host 192.168.71.224 vrf SYG
  logging host 192.168.80.16 vrf SYG
  !
  line con 0
    exec-timeout 0 0
    stopbits 1
  line vty 0 4
    session-timeout 60 
    access-class IPV4_MGMT_ACCESS in vrf-also
    exec-timeout 15 0
    privilege level 15
    transport input ssh
  line vty 5 15
    session-timeout 60 
    access-class IPV4_MGMT_ACCESS in vrf-also
    exec-timeout 15 0
    privilege level 15
    transport input ssh
  !
  ntp source Loopback0
  ntp server vrf SYG 10.16.8.251
  !
  banner motd #
       __________________________________________________________
      |                                                          |
      |              * * *  W A R N I N G  * * *                 |
      |                                                          |
      |       This computer system is private property.          |
      |__________________________________________________________|
      |                                                          |
      | Unauthorized access to this system is a violation of the |
      | Federal Electronic Communications Privacy Act of 1986,   |
      | and may result in fines of $250,000 and/or imprisonment  |
      | under ( Title 18, USC ).  This device is subject to mon- |
      | itoring.  If you are unauthorized or do not consent to   |
      | this monitoring of usage disconnect NOW.                 |
      |__________________________________________________________|
        
  #
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const streetAddress = '1234 Street St. Boise, ID 83713';
		const hostName = 'BOI-GEN-DEMO-1';
		const lat = '43.6150';
		const long = '116.2023';
		return { streetAddress, hostName, lat, long };
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
