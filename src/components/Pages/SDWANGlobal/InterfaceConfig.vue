<template>
	<div>
		<h3>Interface Configuration</h3>

		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					Public (Gi0/0/0) IP Address
				</h6>
				<input :class="$style.input" v-model="outsideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Inside (Gi0/0/1) IP Address
				</h6>
				<input :class="$style.input" v-model="insideIP" />
			</div>
			<div>
				<h6 :class="$style.h6">
					Standby (Gi0/0/2) IP Address
				</h6>
				<input :class="$style.input" v-model="mgmtIP" />
			</div>
			<div>
				<h6 :class="$style.h6">Loopback0 IP Address</h6>
				<input :class="$style.input" v-model="loopIP" />
			</div>
			<div>
				<h6 :class="$style.h6">IP SLA Track IP Address</h6>
				<input :class="$style.input" v-model="trackIP" />
			</div>
		</div>
		<pre>
      <code>
  interface GigabitEthernet0/0/0
   description DIST to External vrf PRIMARY-ISP
   vrf forwarding PRIMARY-ISP
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
  interface GigabitEthernet0/0/2
    description MGMT to Standby vrf SYG
    vrf forwarding SYG
    ip address <span>{{ mgmtIP }}</span>
    no shutdown
    negotiation auto
  !
  interface Loopback0
    description MGMT to Loopback vrf SYG
    vrf forwarding SYG
    ip address <span>{{ loopIP }}</span>
  !
  ip route vrf PRIMARY-ISP 0.0.0.0 0.0.0.0 <span>{{ trackIP }}</span> track 1
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			outsideIP: '1.1.1.1 255.255.255.252',
			insideIP: '10.255.10.1 255.255.255.0',
			mgmtIP: '10.50.0.1 255.255.255.252',
			loopIP: '10.16.164.64 255.255.255.255',
			trackIP: '66.232.64.82'
		};
	}
};
</script>

<style lang="stylus" module>
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
