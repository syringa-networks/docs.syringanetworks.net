<template>
	<div>
		<h3 :class="$style.h3">Tunnel Interfaces</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Tunnel99 IP Address</h6>
				<input :class="$style.input" v-model="tunnel99" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel999 IP Address</h6>
				<input :class="$style.input" v-model="tunnel999" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Tunnel136 IP Address
				</h6>
				<input :class="$style.input" v-model="tunnel136" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Tunnel1136 IP Address
				</h6>
				<input :class="$style.input" v-model="tunnel1136" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel69 IP Address</h6>
				<input :class="$style.input" v-model="tunnel69" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel169 IP Address</h6>
				<input :class="$style.input" v-model="tunnel169" />
			</div>
		</div>
		<pre>
      <code>
  interface Tunnel99
    description MGMT to ATM/TDM vrf SYG/ISP1
    vrf forwarding SYG
    ip address <span>{{ tunnel99 }}</span> 255.255.248.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 99
    ip nhrp nhs 10.16.192.1 nbma 66.232.64.83 multicast
    ip nhrp nhs 10.16.192.2 nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source GigabitEthernet0/0/0
    tunnel mode gre multipoint
    tunnel key 99
    tunnel vrf ISP1
    tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
  !
  interface Tunnel999
    description MGMT to ATM/TDM vrf SYG/ISP2
    vrf forwarding SYG
    ip address <span>{{ tunnel999 }}</span> 255.255.248.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 999
    ip nhrp nhs 10.16.200.1 nbma 66.232.64.83 multicast
    ip nhrp nhs 10.16.200.2 nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source Cellular0/2/0
    tunnel mode gre multipoint
    tunnel key 999
    tunnel vrf ISP2
    tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
  !
  interface Tunnel136
    description CUST to ATM/TDM vrf CUST/ISP1
    vrf forwarding CUST
    ip address <span>{{ tunnel136 }}</span> 255.255.252.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 136
    ip nhrp nhs 10.255.12.1 nbma 66.232.64.83 multicast
    ip nhrp nhs 10.255.12.2 nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source GigabitEthernet0/0/0
    tunnel mode gre multipoint
    tunnel key 136
    tunnel vrf ISP1
    tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
  !
  interface Tunnel1136
    description CUST to ATM/TDM vrf CUST/ISP2
    vrf forwarding CUST
    ip address <span>{{ tunnel1360 }}</span> 255.255.255.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 1136
    ip nhrp nhs 10.255.33.1 nbma 66.232.64.83 multicast
    ip nhrp nhs 10.255.33.2 nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source Cellular0/2/0
    tunnel mode gre multipoint
    tunnel key 1136
    tunnel vrf ISP2
    tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
  !
  interface Tunnel69
    description CUST to EGVGILN2001/EGVGILN2002 vrf CUST/ISP1
    vrf forwarding CUST
    ip address <span>{{ tunnel69 }}</span> 255.255.255.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 69
    ip nhrp nhs 10.255.36.1 nbma 184.106.15.236 multicast
    ip nhrp nhs 10.255.36.2 nbma 184.106.15.237 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source GigabitEthernet0/0/0
    tunnel mode gre multipoint
    tunnel key 69
    tunnel vrf ISP1
    tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
  !
  interface Tunnel169
    description CUST to EGVGILN2001/EGVGILN2002 vrf CUST/ISP2
    vrf forwarding CUST
    ip address <span>{{ tunnel169 }}</span> 255.255.255.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 169
    ip nhrp nhs 10.255.37.1 nbma 184.106.15.236 multicast
    ip nhrp nhs 10.255.37.2 nbma 184.106.15.237 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source Cellular0/2/0
    tunnel mode gre multipoint
    tunnel key 169
    tunnel vrf ISP2
    tunnel protection ipsec profile BACKUP-IPSEC-PROFILE shared
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tunnel99: '10.16.192.x',
			tunnel999: '10.16.200.x',
			tunnel69: '10.255.36.x',
			tunnel169: '10.255.37.x',
			tunnel136: '10.255.12.x',
			tunnel1136: '10.255.33.x'
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
