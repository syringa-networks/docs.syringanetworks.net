<template>
	<div>
		<h3>IP SLA Configuration</h3>
		<pre>
      <code>
ip sla 1
 icmp-echo 66.232.64.82 source-interface GigabitEthernet0/0/0
  vrf ISP1
  threshold 200
  timeout 500
  frequency 1
!
track 1 ip sla 1 reachability
delay down 5 up 10
!
ip sla schedule 1 life forever start-time now
      </code>
    </pre>
	</div>
</template>
