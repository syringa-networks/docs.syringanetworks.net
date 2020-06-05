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
					CUST Primary Tunnel Interface
				</h6>
				<input
					:class="$style.input"
					v-model="custPrimary"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">
					CUST Backup Tunnel Interface
				</h6>
				<input :class="$style.input" v-model="custBackup" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel136 IP Address</h6>
				<input
					:class="$style.input"
					v-model="custPrimaryIp"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel1136 IP Address</h6>
				<input
					:class="$style.input"
					v-model="custBackupIp"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel136 Hub1</h6>
				<input
					:class="$style.input"
					v-model="custPrimaryHub1"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel136 Hub2</h6>
				<input
					:class="$style.input"
					v-model="custPrimaryHub2"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel1136 Hub1</h6>
				<input
					:class="$style.input"
					v-model="custBackupHub1"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel1136 Hub2</h6>
				<input
					:class="$style.input"
					v-model="custBackupHub2"
				/>
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
  interface Tunnel<span>{{ custPrimary }}</span>
    description CUST to ATM/TDM vrf CUST/ISP1
    vrf forwarding CUST
    ip address <span>{{ custPrimaryIp }}</span> 255.255.252.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 136
    ip nhrp nhs <span>{{ custPrimaryHub1 }}</span> nbma 66.232.64.83 multicast
    ip nhrp nhs <span>{{ custPrimaryHub2 }}</span> nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source GigabitEthernet0/0/0
    tunnel mode gre multipoint
    tunnel key 136
    tunnel vrf ISP1
    tunnel protection ipsec profile PRIMARY-IPSEC-PROFILE shared
  !
  interface Tunnel<span>{{ custBackup }}</span>
    description CUST to ATM/TDM vrf CUST/ISP2
    vrf forwarding CUST
    ip address <span>{{ custBackupIp }}</span> 255.255.255.0
    no ip redirects
    ip mtu 1400
    ip nhrp authentication VPN
    ip nhrp network-id 1136
    ip nhrp nhs <span>{{ custBackupHub1 }}</span> nbma 66.232.64.83 multicast
    ip nhrp nhs <span>{{ custBackupHub2 }}</span> nbma 66.232.64.82 multicast
    ip nhrp shortcut
    ip tcp adjust-mss 1360
    tunnel source Cellular0/2/0
    tunnel mode gre multipoint
    tunnel key 1136
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
			custPrimary: '136',
			custBackup: '1136',
			custPrimaryIp: '10.255.12.x',
			custBackupIp: '10.255.33.x',
			custPrimaryHub1: '10.255.12.1',
			custPrimaryHub2: '10.255.12.2',
			custBackupHub1: '10.255.33.1',
			custBackupHub2: '10.255.33.2'
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
