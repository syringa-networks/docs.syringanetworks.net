<template>
	<div>
		<h3 :class="$style.h3">
			Static Route Configuration
		</h3>
		<div :class="$style.inputFlex">
			<div>
				<p>
					You shouldn't need to set an AD on the secondary
					default route unless you want to. We're making
					sure the default route via ISP1 is being used in
					the BGP config, with redistribute static metric
					150000 set on address-family ipv4 vrf ISP2.
				</p>
				<h6 :class="$style.h6">Default Route Next Hop</h6>
				<input :class="$style.input" v-model="nextHop" />
			</div>
			<div>
				<h6 :class="$style.h6">Cellular Interface</h6>
				<input
					:class="$style.input"
					v-model="cellularInterface"
				/>
			</div>
		</div>
		<pre>
      <code>
  ip route vrf ISP2 66.232.64.82 255.255.255.255 <span>{{ cellularInterface }}</span>
  ip route vrf ISP2 66.232.64.83 255.255.255.255 <span>{{ cellularInterface }}</span>
  ip route vrf ISP2 67.215.44.4 255.255.255.255 <span>{{ cellularInterface }}</span>
  !
  ip route vrf ISP1 0.0.0.0 0.0.0.0 <span>{{ nextHop }}</span>
  ip route vrf ISP2 0.0.0.0 0.0.0.0 <span>{{ cellularInterface }}</span>
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const nextHop = '67.61.171.165';
		const cellularInterface = 'Cellular0/2/0';

		return { nextHop, cellularInterface };
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
