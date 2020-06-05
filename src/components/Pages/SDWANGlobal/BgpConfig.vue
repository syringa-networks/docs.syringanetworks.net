<script>
export default {
	data() {
		return {
			title: 'BGP Configuration',
			asn: 'router bgp 65501',
			preList:
				'ip prefix-list DENY_DEFAULT seq 5 deny 0.0.0.0/0',
			preListTwo:
				'ip prefix-list DENY_DEFAULT seq 10 permit 0.0.0.0/0 le 32'
		};
	}
};
</script>

<template>
	<div>
		<h3>{{ title }}</h3>
		<pre>
      <code>
  {{ asn }}
  bgp router-id 10.16.164.<span>81</span>
  bgp log-neighbor-changes
    address-family ipv4 vrf BACKUP-ISP
      redistribute static metric 150000
      default-information originate
    exit-address-family
    !
    address-family ipv4 vrf PRIMARY-ISP
      redistribute static
      default-information originate
    exit-address-family
    !
    address-family ipv4 vrf CUST
      redistribute connected
      neighbor SIMPLOT-PRIMARY-136 peer-group
      neighbor SIMPLOT-PRIMARY-136 remote-as 15305
      neighbor SIMPLOT-PRIMARY-136 soft-reconfiguration inbound
      neighbor SIMPLOT-PRIMARY-136 route-map DENY_DEFAULT_RMAP out
      neighbor SIMPLOT-BACKUP-1360 peer-group
      neighbor SIMPLOT-BACKUP-1360 remote-as 15305
      neighbor SIMPLOT-BACKUP-1360 soft-reconfiguration inbound
      neighbor SIMPLOT-BACKUP-1360 route-map LOCAL_PREF_90 in
      neighbor SIMPLOT-BACKUP-1360 route-map MED_25 out
      neighbor 10.255.22.<span>49</span> peer-group SIMPLOT-PRIMARY-136
      neighbor 10.255.22.<span>49</span> activate
      neighbor 10.255.22.<span>65</span> peer-group SIMPLOT-BACKUP-1360
      neighbor 10.255.22.<span>65</span> activate
      neighbor 10.255.24.<span>9</span> remote-as 64512
      neighbor 10.255.24.<span>9</span> local-as 15305 no-prepend replace-as
      neighbor 10.255.24.<span>9</span> activate
      neighbor 10.255.24.<span>9</span> remove-private-as all replace-as
      neighbor 10.255.24.<span>9</span> as-override
    exit-address-family
  !
    address-family ipv4 vrf SYG
      redistribute connected
      neighbor 10.16.192.1 remote-as 15305
      neighbor 10.16.192.1 activate
      neighbor 10.16.192.1 soft-reconfiguration inbound
      neighbor 10.16.192.2 remote-as 15305
      neighbor 10.16.192.2 activate
      neighbor 10.16.192.2 soft-reconfiguration inbound
      neighbor 10.16.192.2 route-map LOCAL_PREF_90 in
      neighbor 10.16.192.2 route-map MED_25 out
      neighbor 10.16.200.1 remote-as 15305
      neighbor 10.16.200.1 activate
      neighbor 10.16.200.1 soft-reconfiguration inbound
      neighbor 10.16.200.1 route-map LOCAL_PREF_80 in
      neighbor 10.16.200.1 route-map MED_50 out
      neighbor 10.16.200.2 remote-as 15305
      neighbor 10.16.200.2 activate
      neighbor 10.16.200.2 soft-reconfiguration inbound
      neighbor 10.16.200.2 route-map LOCAL_PREF_75 in
      neighbor 10.16.200.2 route-map MED_65 out
      neighbor 10.30.0.<span>1</span> remote-as 15305
      neighbor 10.30.0.<span>1</span> activate
      neighbor 10.30.0.<span>1</span> soft-reconfiguration inbound
      neighbor 10.30.0.<span>1</span> route-map LOCAL_PREF_85 in
      neighbor 10.30.0.<span>1</span> route-map MED_35 out
      neighbor 10.40.0.<span>1</span> remote-as 15305
      neighbor 10.40.0.<span>1</span> activate
      neighbor 10.40.0.<span>1</span> soft-reconfiguration inbound
      neighbor 10.40.0.<span>1</span> route-map LOCAL_PREF_70 in
      neighbor 10.40.0.<span>1</span> route-map MED_75 out
      neighbor 10.50.0.<span>21</span> remote-as 65501
      neighbor 10.50.0.<span>21</span> activate
      neighbor 10.50.0.<span>21</span> soft-reconfiguration inbound
    exit-address-family
    !
  route-map DENY_DEFAULT_RMAP permit 10
    match ip address prefix-list DENY_DEFAULT
  !
  {{ preList }}
  {{ preListTwo }}
  route-map MED_65 permit 10
    match ip address prefix-list DENY_DEFAULT
    set metric 65
  !
  route-map MED_75 permit 10
    match ip address prefix-list DENY_DEFAULT
    set metric 75
  !
  route-map MED_25 permit 10
    match ip address prefix-list DENY_DEFAULT
    set metric 25
  !
  route-map MED_35 permit 10
    match ip address prefix-list DENY_DEFAULT
    set metric 35
  !
  route-map MED_50 permit 10
    match ip address prefix-list DENY_DEFAULT
    set metric 50
  !
  route-map LOCAL_PREF_85 permit 10
    set local-preference 85
  !
  route-map LOCAL_PREF_80 permit 10
    set local-preference 80
  !
  route-map LOCAL_PREF_90 permit 10
    set local-preference 90
  !
  route-map LOCAL_PREF_70 permit 10
    set local-preference 70
  !
  route-map LOCAL_PREF_75 permit 10
    set local-preference 75
  !
  route-map LOCAL_PREF_65 permit 10
    set local-preference 65
  !
      </code>
    </pre>
	</div>
</template>
