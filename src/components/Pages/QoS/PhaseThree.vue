<template>
	<div>
		<h3>Phase 3 Configuration - L2 Devices</h3>
		<div :class="$style.listDiv">
			<h3>Ingress - Matching</h3>
			<ul>
				<li v-for="item in ingress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div :class="$style.listDiv">
			<h3>Egress - Queuing Based on Markings</h3>
			<ul>
				<li v-for="item in egress" :key="item.id">
					{{ item.name }}
				</li>
			</ul>
		</div>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Policy-Map Ingress</h6>
				<input
					:class="$style.input"
					v-model="inboundPolicy"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map Egress</h6>
				<input
					:class="$style.input"
					v-model="outboundPolicy"
				/>
			</div>
		</div>
		<pre>
      <code>
  ios-xe
      </code>
		</pre>
		<pre>
      <code>
  ios-xr
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const inboundPolicy = '99KRGSxxxxxx_100M_IN';
		const outboundPolicy = '99KRGSxxxxxx_100M_OUT';
		const ingress = [
			{ name: 'Match DSCP' },
			{ name: 'Set CoS' },
			{ name: 'Set QoS Group' },
			{ name: 'Policing' }
		];
		const egress = [
			{ name: 'Match VLAN' },
			{ name: 'Match EXP' },
			{ name: 'Set CoS' }
		];

		return {
			inboundPolicy,
			outboundPolicy,
			ingress,
			egress
		};
	}
};
</script>

<style lang="stylus" module>
.listDiv {
  color: var(--color-dark-1);
  border: solid 0.2rem var(--color-dark-1);
  padding: 3rem;
  margin-bottom: 3rem;
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
