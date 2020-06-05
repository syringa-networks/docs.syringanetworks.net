<template>
	<div>
		<h3 :class="$style.h3">NAT Configuration</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Primary ISP VRF/ACL</h6>
				<input :class="$style.input" v-model="primaryIsp" />
			</div>
			<div>
				<h6 :class="$style.h6">Secondary ISP VRF/ACL</h6>
				<input
					:class="$style.input"
					v-model="secondaryIsp"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Primary ISP Interface</h6>
				<input
					:class="$style.input"
					v-model="primaryIspInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Secondary ISP Interface</h6>
				<input
					:class="$style.input"
					v-model="secondaryIspInterface"
				/>
			</div>
		</div>
		<pre>
        <code>
  ip nat inside source route-map <span>{{ primaryIsp }}</span> interface <span>{{ primaryIspInterface }}</span> vrf CUST overload
  ip nat inside source route-map <span>{{ secondaryIsp }}</span> interface <span>{{ secondaryIspInterface }}</span> vrf CUST overload
  !
  ip access-list extended <span>{{ primaryIsp }}</span>
    permit ip any any
  !
  ip access-list extended <span>{{ secondaryIsp }}</span>
    permit ip any any
  !
  route-map <span>{{ primaryIsp }}</span> permit 10
    match ip address <span>{{ primaryIsp }}</span>
    match interface <span>{{ primaryIspInterface }}</span>
  !
  route-map <span>{{ secondaryIsp }}</span> permit 10
    match ip address <span>{{ secondaryIsp }}</span>
    match interface <span>{{ secondaryIspInterface }}</span>
  !
        </code>
      </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const primaryIsp = 'ISP1';
		const secondaryIsp = 'ISP2';
		const primaryIspInterface = 'GigabitEthernet0/0/0';
		const secondaryIspInterface = 'Cellular0/2/0';

		return {
			primaryIsp,
			secondaryIsp,
			primaryIspInterface,
			secondaryIspInterface
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
