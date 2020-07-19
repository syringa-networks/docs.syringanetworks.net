<template>
	<div>
		<h3>IOS-XE Show Commands</h3>
		<pre>
      <code>
  <span>// Show the running config on the interface in question</span>
  <span class="bold">show run interface gigabitEthernet 0/0/1</span>
  !
  interface GigabitEthernet0/0/1
    mtu 9216
    no ip address
    load-interval 30
    negotiation auto
    service instance 220 ethernet
      description PtP Terminate on PE
      encapsulation dot1q 220
      <span>service-policy input 200M_STD_ENT_IN</span>
      xconnect 10.255.254.3 220 encapsulation mpls
    !
    service instance 250 ethernet
      description MtP Terminate on PE
      encapsulation dot1q 250
      <span>service-policy input 200M_STD_ENT_IN</span>
      <span>service-policy output 200M_STD_ENT_OUT</span>
      bridge-domain 250
    !
    service instance 270 ethernet
      description MtP Terminate on L2 Device
      encapsulation dot1q 270
      <span>service-policy output 200M_STD_ENT_OUT</span>
      bridge-domain 270
    !
    service instance 300 ethernet
      description MtP Terminate on PE Customer QoS
      encapsulation dot1q 300
      <span>service-policy input 200M_CUST_ENT_IN</span>
      <span>service-policy output 200M_CUST_ENT_OUT</span>
      bridge-domain 300
    !

  <span>// Show the running config on the service-policy inbound</span>
  <span class="bold">show run policy-map 200M_STD_ENT_IN</span>
  !
  policy-map 200M_STD_ENT_IN
  class class-default
    police cir 215000000 bc 1000000
    conform-action set-qos-transmit 1
    conform-action set-mpls-exp-imposition-transmit 1
  !

  <span>// Show the running config on the service-policy outbound</span>
  <span class="bold">show run policy-map 200M_STD_ENT_OUT</span>
  !
  policy-map 200M_STD_ENT_OUT
  class class-default
    shape average 220000000   
  !

  <span>// Show the inbound policy on the interface</span>
  <span class="bold">show policy-map interface gigabitEthernet 0/0/1 service instance 250 input</span>
  !
  GigabitEthernet0/0/1: EFP 250 

    Service-policy input: 200M_STD_ENT_IN

      Class-map: class-default (match-any)  
        0 packets, 0 bytes
        30 second offered rate 0000 bps, drop rate 0000 bps
        Match: any 
        police:
            cir 215000000 bps, bc 1000000 bytes
          conformed 0 packets, 0 bytes; actions:
            set-qos-transmit 1
            set-mpls-exp-imposition-transmit 1
          exceeded 0 packets, 0 bytes; actions:
            drop 
          conformed 0000 bps, exceeded 0000 bps
  !

  <span>// Show the outbound policy on the interface</span>
  <span class="bold">show policy-map interface gigabitEthernet 0/0/1 service instance 250 output</span>
  !
  GigabitEthernet0/0/1: EFP 250 

    Service-policy output: 200M_STD_ENT_OUT

      Class-map: class-default (match-any)  
        0 packets, 0 bytes
        30 second offered rate 0000 bps, drop rate 0000 bps
        Match: any 
        Queueing
        queue limit 1787 us/ 49152 bytes
        (queue depth/total drops/no-buffer drops) 0/0/0
        (pkts output/bytes output) 0/0
        shape (average) cir 220000000, bc 880000, be 880000
        target shape rate 220000000
  !

  <span>// Show CORE Policies</span>
  <span class="bold">show run policy-map CORE_IN</span>
  !
  policy-map CORE_IN
    class EXP7
      set qos-group 7
      set cos 7
    class EXP6
      set qos-group 6
      set cos 6
    class EXP5
      set qos-group 5
      set cos 5
    class EXP4
      set qos-group 4
      set cos 4
    class EXP3
      set qos-group 3
      set cos 3
    class EXP2
      set qos-group 2
      set cos 2
    class EXP1
      set qos-group 1
      set cos 1
    class class-default
      set qos-group 0
      set cos 0
  !

  <span class="bold">show run policy-map CORE_OUT</span>
  !
  policy-map CORE_OUT
    class Q67
      priority level 1 percent 10
    class Q5
      priority level 2
    class Q4321
      bandwidth remaining percent 99 
    class class-default
      bandwidth remaining percent 1 
  !

  <span>// Show CORE Policies Interface</span>
  <span class="bold">show policy-map interface te0/0/24 input</span>
  !
  TenGigabitEthernet0/0/24 

  Service-policy input: CORE_IN

    Class-map: EXP7 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 7 
      QoS Set
        qos-group 7
          Marker statistics: Disabled
        cos 7
          Marker statistics: Disabled

    Class-map: EXP6 (match-any)  
      10382 packets, 893064 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 6 
      QoS Set
        qos-group 6
          Marker statistics: Disabled
        cos 6
          Marker statistics: Disabled

    Class-map: EXP5 (match-any)  
      10115579145 packets, 1618492663200 bytes
      30 second offered rate 514594000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 5 
      QoS Set
        qos-group 5
          Marker statistics: Disabled
        cos 5
          Marker statistics: Disabled

    Class-map: EXP4 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 4 
      QoS Set
        qos-group 4
          Marker statistics: Disabled
        cos 4
          Marker statistics: Disabled

    Class-map: EXP3 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 3 
      QoS Set
        qos-group 3
          Marker statistics: Disabled
        cos 3
          Marker statistics: Disabled

    Class-map: EXP2 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 2 
      QoS Set
        qos-group 2
          Marker statistics: Disabled
        cos 2
          Marker statistics: Disabled

    Class-map: EXP1 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: mpls experimental topmost 1 
      QoS Set
        qos-group 1
          Marker statistics: Disabled
        cos 1
          Marker statistics: Disabled

    Class-map: COS5 (match-all)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: cos  5 
      QoS Set
        cos 5
          Marker statistics: Disabled

    Class-map: class-default (match-any)  
      24271142573 packets, 29659027387738 bytes
      30 second offered rate 9430009000 bps, drop rate 0000 bps
      Match: any 
      QoS Set
        qos-group 0
          Marker statistics: Disabled
        cos 0
          Marker statistics: Disabled
  !
  
  <span class="bold">show policy-map interface te0/0/24 output</span>
  !
  TenGigabitEthernet0/0/24 

  Service-policy output: CORE_OUT

    queue stats for all priority classes:
      Queueing
      priority level 1
      queue limit 983 us/ 122880 bytes
      (queue depth/total drops/no-buffer drops) 0/0/0
      (pkts output/bytes output) 14995/779740

    queue stats for all priority classes:
      Queueing
      priority level 2
      queue limit 99 us/ 122880 bytes
      (queue depth/total drops/no-buffer drops) 158/0/0
      (pkts output/bytes output) 10166988375/1403044395750

    Class-map: Q67 (match-any)  
      14995 packets, 779740 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: qos-group 7
      Match: qos-group 6
      Priority: 10% (1000000 kbps), burst bytes 25000000, b/w exceed drops: 0
      
      Priority Level: 1 

    Class-map: Q5 (match-any)  
      10166988375 packets, 1403044395750 bytes
      30 second offered rate 436820000 bps, drop rate 0000 bps
      Match: qos-group 5
      Priority: Strict, b/w exceed drops: 0
      
      Priority Level: 2 

    Class-map: Q4321 (match-any)  
      0 packets, 0 bytes
      30 second offered rate 0000 bps, drop rate 0000 bps
      Match: qos-group 4
      Match: qos-group 3
      Match: qos-group 2
      Match: qos-group 1
      Queueing
      queue limit 98 us/ 122880 bytes
      (queue depth/total drops/no-buffer drops) 0/0/0
      (pkts output/bytes output) 0/0
      bandwidth remaining 99%

    Class-map: class-default (match-any)  
      26334251219 packets, 31601101298468 bytes
      30 second offered rate 9838653000 bps, drop rate 724779000 bps
      Match: any 
      Queueing
      queue limit 98 us/ 122880 bytes
      (queue depth/total drops/no-buffer drops) 122000/1939956112/0
      (pkts output/bytes output) 24394295107/29273153985158
      bandwidth remaining 1%
  !
      </code>
    </pre>
	</div>
</template>
