<template>
	<div>
		<h3 :class="$style.h3">Interface Configuration</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Gi0/0/0 Interface</h6>
				<input :class="$style.input" v-model="outsideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">Gi0/0/1 Interface</h6>
				<input :class="$style.input" v-model="insideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">Loopback0 Interface</h6>
				<input :class="$style.input" v-model="loopIP" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Cellular Interface (0/1/0 or 0/2/0)
				</h6>
				<input
					:class="$style.input"
					v-model="cellularInterface"
				/>
			</div>
		</div>
		<pre>
      <code>
  interface GigabitEthernet0/0/0
    description DIST to External vrf ISP1
    vrf forwarding ISP1
    ip address <span>{{ outsideIP }}</span>
    ip nat outside
    no shutdown
    negotiation auto
  !
  interface GigabitEthernet0/0/1
    description CUST to Internal vrf CUST
    vrf forwarding CUST
    ip address <span>{{ insideIP }}</span>
    ip helper-address 10.10.4.12
    ip helper-address 10.12.4.14
    ip nat inside
    no shutdown
    negotiation auto
  !
  interface Cellular<span>{{ cellularInterface }}</span>
    vrf forwarding ISP2
    ip address negotiated
    dialer in-band
    dialer idle-timeout 0
    dialer watch-group 1
    dialer-group 1
    ipv6 enable
    pulse-time 1
    no shutdown
  !
  interface Loopback0
    description MGMT to Loopback vrf SYG
    vrf forwarding SYG
    ip address <span>{{ loopIP }}</span>
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const outsideIP = '24.166.38.92 255.255.255.252';
		const insideIP = '10.255.10.1 255.255.255.0';
		const mgmtIP = '10.50.0.1 255.255.255.252';
		const loopIP = '10.16.164.64 255.255.255.255';
		const trackIP = '66.232.64.82';
		const cellularInterface = '0/2/0';

		return {
			outsideIP,
			insideIP,
			mgmtIP,
			loopIP,
			trackIP,
			cellularInterface
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
