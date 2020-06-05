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
				<h6 :class="$style.h6">LAN BGP Neighbor</h6>
				<input
					:class="$style.input"
					v-model="lanBGPNeighbor"
				/>
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
    neighbor TUNNEL69_PRIMARY peer-group
    neighbor TUNNEL69_PRIMARY remote-as 65502
    neighbor TUNNEL69_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL69_PRIMARY route-map DENY_DEFAULT_RMAP out
    neighbor TUNNEL69_BACKUP peer-group
    neighbor TUNNEL69_BACKUP remote-as 65502
    neighbor TUNNEL69_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL69_BACKUP route-map DENY_DEFAULT_RMAP out
    neighbor TUNNEL169_PRIMARY peer-group
    neighbor TUNNEL169_PRIMARY remote-as 65502
    neighbor TUNNEL169_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL169_PRIMARY route-map LOCAL_PREF_90 in
    neighbor TUNNEL169_PRIMARY route-map MED_25 out
    neighbor TUNNEL169_BACKUP peer-group
    neighbor TUNNEL169_BACKUP remote-as 65502
    neighbor TUNNEL169_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL169_BACKUP route-map LOCAL_PREF_90 in
    neighbor TUNNEL169_BACKUP route-map MED_25 out
    neighbor TUNNEL136_PRIMARY peer-group
    neighbor TUNNEL136_PRIMARY remote-as 15305
    neighbor TUNNEL136_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL136_PRIMARY route-map DENY_DEFAULT_RMAP out
    neighbor TUNNEL136_BACKUP peer-group
    neighbor TUNNEL136_BACKUP remote-as 15305
    neighbor TUNNEL136_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL136_BACKUP route-map LOCAL_PREF_90 in
    neighbor TUNNEL136_BACKUP route-map MED_25 out
    neighbor TUNNEL1136_PRIMARY peer-group
    neighbor TUNNEL1136_PRIMARY remote-as 15305
    neighbor TUNNEL1136_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL1136_PRIMARY route-map LOCAL_PREF_80 in
    neighbor TUNNEL1136_PRIMARY route-map MED_50 out
    neighbor TUNNEL1136_BACKUP peer-group
    neighbor TUNNEL1136_BACKUP remote-as 15305
    neighbor TUNNEL1136_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL1136_BACKUP route-map LOCAL_PREF_70 in
    neighbor TUNNEL1136_BACKUP route-map MED_75 out
    neighbor 10.255.36.1 peer-group TUNNEL69_PRIMARY
    neighbor 10.255.36.1 activate
    neighbor 10.255.36.2 peer-group TUNNEL69_BACKUP
    neighbor 10.255.36.2 activate
    neighbor 10.255.37.1 peer-group TUNNEL169_PRIMARY
    neighbor 10.255.37.1 activate
    neighbor 10.255.37.2 peer-group TUNNEL169_BACKUP
    neighbor 10.255.37.2 activate
    neighbor 10.255.12.1 peer-group TUNNEL136_PRIMARY
    neighbor 10.255.12.1 activate
    neighbor 10.255.12.2 peer-group TUNNEL136_BACKUP
    neighbor 10.255.12.2 activate
    neighbor 10.255.33.1 peer-group TUNNEL1136_PRIMARY
    neighbor 10.255.33.1 activate
    neighbor 10.255.33.2 peer-group TUNNEL1136_BACKUP
    neighbor 10.255.33.2 activate
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
    neighbor TUNNEL99_PRIMARY peer-group
    neighbor TUNNEL99_PRIMARY remote-as 15305
    neighbor TUNNEL99_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL99_PRIMARY route-map DENY_DEFAULT_RMAP out
    neighbor TUNNEL99_BACKUP peer-group
    neighbor TUNNEL99_BACKUP remote-as 15305
    neighbor TUNNEL99_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL99_BACKUP route-map LOCAL_PREF_90 in
    neighbor TUNNEL99_BACKUP route-map MED_25 out
    neighbor TUNNEL999_PRIMARY peer-group
    neighbor TUNNEL999_PRIMARY remote-as 15305
    neighbor TUNNEL999_PRIMARY soft-reconfiguration inbound
    neighbor TUNNEL999_PRIMARY route-map LOCAL_PREF_80 in
    neighbor TUNNEL999_PRIMARY route-map MED_50 out
    neighbor TUNNEL999_BACKUP peer-group
    neighbor TUNNEL999_BACKUP remote-as 15305
    neighbor TUNNEL999_BACKUP soft-reconfiguration inbound
    neighbor TUNNEL999_BACKUP route-map LOCAL_PREF_70 in
    neighbor TUNNEL999_BACKUP route-map MED_75 out
    neighbor 10.16.192.1 peer-group TUNNEL99_PRIMARY
    neighbor 10.16.192.1 activate
    neighbor 10.16.192.2 peer-group TUNNEL99_BACKUP
    neighbor 10.16.192.2 activate
    neighbor 10.16.200.1 peer-group TUNNEL999_PRIMARY
    neighbor 10.16.200.1 activate
    neighbor 10.16.200.2 peer-group TUNNEL999_BACKUP
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
		const lanBGPNeighbor = '10.255.4.37';

		return {
			routerId,
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
