<template>
	<div>
		<h3 :class="$style.h3">Failover Script</h3>
		<pre>
      <code>
  event manager applet FAILOVER

  event syslog pattern "TRACK-6-STATE: 1 ip sla 1 reachability Up -> Down"

  action 1.0 cli command "enable"

  action 1.1 cli command "conf t"

  action 1.2 cli command "vrf definition CUST"

  action 1.3 cli command "no route-target import 1:1"

  action 1.4 cli command "route-target import 1:2"

  action 1.5 cli command "vrf definition ISP1"

  action 1.6 cli command "no route-target import 2:1"

  action 1.7 cli command "vrf definition ISP2"

  action 1.8 cli command "route-target import 2:1"

  action 1.9 cli command "interface GigabitEthernet0/0/0"

  action 2.0 cli command "no ip nat outside"

  action 2.1 cli command "do clear ip nat translation *"

  action 2.2 cli command "no ip nat inside source route-map ISP1 interface GigabitEthernet0/0/0 vrf CUST overload"

  action 2.3 cli command "interface Cellular0/2/0"

  action 2.4 cli command "ip nat outside"

  action 2.5 cli command "ip nat inside source route-map ISP2 interface Cellular0/2/0 vrf CUST overload"

  action 2.6 exit

  event manager applet FAILBACK

  event syslog pattern "TRACK-6-STATE: 1 ip sla 1 reachability Down -> Up"

  action 1.0 cli command "enable"

  action 1.1 cli command "conf t"

  action 1.2 cli command "vrf definition CUST"

  action 1.3 cli command "no route-target import 1:2"

  action 1.4 cli command "route-target import 1:1"

  action 1.5 cli command "vrf definition ISP1"

  action 1.6 cli command "route-target import 2:1"

  action 1.7 cli command "vrf definition ISP2"

  action 1.8 cli command "no route-target import 2:1"

  action 1.9 cli command "interface Cellular0/2/0"

  action 2.0 cli command "no ip nat outside"

  action 2.1 cli command "do clear ip nat translation *"

  action 2.2 cli command "no ip nat inside source route-map ISP2 interface Cellular0/2/0 vrf CUST overload"

  action 2.3 cli command "interface GigabitEthernet0/0/0"

  action 2.4 cli command "ip nat outside"

  action 2.5 cli command "ip nat inside source route-map ISP1 interface GigabitEthernet0/0/0 vrf CUST overload"

  action 2.6 exit
      </code>
    </pre>
	</div>
</template>

<script>
export default {};
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
