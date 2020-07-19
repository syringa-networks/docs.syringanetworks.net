<template>
	<div>
		<h3>{{ title }}</h3>
		<pre>
      <code>
ip domain name {{ domainName }}
!
ip dns view vrf CUST default
  dns forwarder vrf PRIMARY-ISP 66.232.66.3
  dns forwarder vrf PRIMARY-ISP 66.232.64.10
!
ip dns view vrf CUST simplot
  dns forwarder vrf CUST 10.10.4.10
  dns forwarder vrf CUST 10.10.4.11
!
ip dns view-list primaryview
  view vrf CUST simplot 10
    restrict name-group 1
  view vrf CUST default 99
!
ip dns name-list 1 permit .*.SIMPLOT.COM
ip dns server view-group primaryview
ip dns server
ip domain-lookup
!
logging source-interface Loopback0 vrf SYG
logging source-interface GigabitEthernet0/0/1 vrf CUST
logging host 10.10.7.21 vrf CUST
logging host 192.168.7.235 vrf SYG
logging host 192.168.71.224 vrf SYG
logging host 192.168.80.16 vrf SYG
!
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: 'DNS Configuration',
			domainName: 'syringanetworks.net'
		};
	}
};
</script>
