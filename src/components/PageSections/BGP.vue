<template>
	<div>
		<h3 :class="$style.h3">
			BGP and Route Policy Configuration
		</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">BGP Router ID</h6>
				<input :class="$style.input" v-model="routerId" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel136 1</h6>
				<input :class="$style.input" v-model="primaryTunnel1" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel136 2</h6>
				<input :class="$style.input" v-model="primaryTunnel2" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel1136 1</h6>
				<input :class="$style.input" v-model="backupTunnel1" />
			</div>
			<div>
				<h6 :class="$style.h6">Tunnel1136 2</h6>
				<input :class="$style.input" v-model="backupTunnel2" />
			</div>
			<div>
				<h6 :class="$style.h6">LAN BGP Neighbor</h6>
				<input :class="$style.input" v-model="lanBGPNeighbor" />
			</div>
		</div>
		<pre>
      <code>
router bgp 65501
bgp router-id <span>{{ routerId }}</span>
bgp log-neighbor-changes
!
address-family ipv4 vrf ISP1
 redistribute static
 default-information originate
exit-address-family
!
address-family ipv4 vrf ISP2
 redistribute static route-map DENY_STATIC_CELLULAR metric 150000
 default-information originate
exit-address-family
!
address-family ipv4 vrf CUST
 redistribute connected
  neighbor CUST_PRIMARY_1 peer-group
  neighbor CUST_PRIMARY_1 remote-as 15305
  neighbor CUST_PRIMARY_1 soft-reconfiguration inbound
  neighbor CUST_PRIMARY_1 route-map DENY_DEFAULT_RMAP out
  neighbor CUST_PRIMARY_2 peer-group
  neighbor CUST_PRIMARY_2 remote-as 15305
  neighbor CUST_PRIMARY_2 soft-reconfiguration inbound
  neighbor CUST_PRIMARY_2 route-map LOCAL_PREF_90 in
  neighbor CUST_PRIMARY_2 route-map MED_25 out
  neighbor CUST_BACKUP_1 peer-group
  neighbor CUST_BACKUP_1 remote-as 15305
  neighbor CUST_BACKUP_1 soft-reconfiguration inbound
  neighbor CUST_BACKUP_1 route-map LOCAL_PREF_80 in
  neighbor CUST_BACKUP_1 route-map MED_50 out
  neighbor CUST_BACKUP_2 peer-group
  neighbor CUST_BACKUP_2 remote-as 15305
  neighbor CUST_BACKUP_2 soft-reconfiguration inbound
  neighbor CUST_BACKUP_2 route-map LOCAL_PREF_70 in
  neighbor CUST_BACKUP_2 route-map MED_75 out
  neighbor <span>{{ primaryTunnel1 }}</span> peer-group CUST_PRIMARY_1
  neighbor <span>{{ primaryTunnel1 }}</span> activate
  neighbor <span>{{ primaryTunnel2 }}</span> peer-group CUST_PRIMARY_2
  neighbor <span>{{ primaryTunnel2 }}</span> activate
  neighbor <span>{{ backupTunnel1 }}</span> peer-group CUST_BACKUP_1
  neighbor <span>{{ backupTunnel1 }}</span> activate
  neighbor <span>{{ backupTunnel2 }}</span> peer-group CUST_BACKUP_2
  neighbor <span>{{ backupTunnel2 }}</span> activate
  neighbor <span>{{ lanBGPNeighbor }}</span> remote-as 64512
  neighbor <span>{{ lanBGPNeighbor }}</span> local-as 15305 no-prepend replace-as
  neighbor <span>{{ lanBGPNeighbor }}</span> activate
  neighbor <span>{{ lanBGPNeighbor }}</span> remove-private-as all replace-as
  neighbor <span>{{ lanBGPNeighbor }}</span> as-override
  neighbor <span>{{ lanBGPNeighbor }}</span> soft-reconfiguration inbound
exit-address-family
!
address-family ipv4 vrf SYG
 redistribute connected
  neighbor SYG_PRIMARY_1 peer-group
  neighbor SYG_PRIMARY_1 remote-as 15305
  neighbor SYG_PRIMARY_1 soft-reconfiguration inbound
  neighbor SYG_PRIMARY_1 route-map DENY_DEFAULT_RMAP out
  neighbor SYG_PRIMARY_2 peer-group
  neighbor SYG_PRIMARY_2 remote-as 15305
  neighbor SYG_PRIMARY_2 soft-reconfiguration inbound
  neighbor SYG_PRIMARY_2 route-map LOCAL_PREF_90 in
  neighbor SYG_PRIMARY_2 route-map MED_25 out
  neighbor SYG_BACKUP_1 peer-group
  neighbor SYG_BACKUP_1 remote-as 15305
  neighbor SYG_BACKUP_1 soft-reconfiguration inbound
  neighbor SYG_BACKUP_1 route-map LOCAL_PREF_80 in
  neighbor SYG_BACKUP_1 route-map MED_50 out
  neighbor SYG_BACKUP_2 peer-group
  neighbor SYG_BACKUP_2 remote-as 15305
  neighbor SYG_BACKUP_2 soft-reconfiguration inbound
  neighbor SYG_BACKUP_2 route-map LOCAL_PREF_70 in
  neighbor SYG_BACKUP_2 route-map MED_75 out
  neighbor 10.16.192.1 peer-group SYG_PRIMARY_1
  neighbor 10.16.192.1 activate
  neighbor 10.16.192.2 peer-group SYG_PRIMARY_2
  neighbor 10.16.192.2 activate
  neighbor 10.16.200.1 peer-group SYG_BACKUP_1
  neighbor 10.16.200.1 activate
  neighbor 10.16.200.2 peer-group SYG_BACKUP_2
  neighbor 10.16.200.2 activate
exit-address-family
!
route-map DENY_DEFAULT_RMAP permit 10
 match ip address prefix-list DENY_DEFAULT
!
ip prefix-list DENY_DEFAULT seq 5 deny 0.0.0.0/0
ip prefix-list DENY_DEFAULT seq 10 permit 0.0.0.0/0 le 32
!
route-map DENY_STATIC_CELLULAR permit 10 
 match ip address prefix-list DENY_STATIC
!
ip prefix-list DENY_STATIC seq 5 deny 66.232.64.82/32
ip prefix-list DENY_STATIC seq 10 deny 66.232.64.83/32
ip prefix-list DENY_STATIC seq 15 deny 67.215.44.4/32
ip prefix-list DENY_STATIC seq 20 permit 0.0.0.0/0 le 32
!
route-map MED_25 permit 10
 match ip address prefix-list DENY_DEFAULT
 set metric 25
!
route-map MED_50 permit 10
 match ip address prefix-list DENY_DEFAULT
 set metric 50
!
route-map MED_75 permit 10
 match ip address prefix-list DENY_DEFAULT
 set metric 75
!
route-map LOCAL_PREF_90 permit 10
 set local-preference 90
!
route-map LOCAL_PREF_80 permit 10
 set local-preference 80
!
route-map LOCAL_PREF_70 permit 10
 set local-preference 70
!
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const routerId = '10.16.164.64';
		const primaryTunnel1 = '10.255.12.1';
		const primaryTunnel2 = '10.255.12.2';
		const backupTunnel1 = '10.255.33.1';
		const backupTunnel2 = '10.255.33.2';
		const lanBGPNeighbor = '10.255.4.37';

		return {
			routerId,
			primaryTunnel1,
			primaryTunnel2,
			backupTunnel1,
			backupTunnel2,
			lanBGPNeighbor
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
