<template>
	<div>
		<h3>901 QoS Configuration</h3>
		<p>
			Set inbound service-policy to match QoS group and
			outbound policy to set EXP.
		</p>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_IN</h6>
				<input :class="$style.input" v-model="coreIn" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_IN</h6>
				<input :class="$style.input" v-model="distIn" />
			</div>
		</div>
		<pre>
      <code>
  policy-map <span>{{ coreIn }}</span>
   class EXP7
    set qos-group 7
   !
   class EXP6
    set qos-group 6
   !
   class EXP5
    set qos-group 5
   !
   class EXP4
    set qos-group 4
   !
   class EXP3
    set qos-group 3
   !
   class EXP2
    set qos-group 2
   !
   class EXP1
    set qos-group 1
   !
   class class-default
    set qos-group 0
   !
  !
  policy-map <span>{{ distIn }}</span>
   class C7
    set qos-group 7
   !
   class C6
    set qos-group 6
   !
   class C5
    set qos-group 5
   !
   class C4
    set qos-group 4
   !
   class C3
    set qos-group 3
   !
   class C2
    set qos-group 2
   !
   class C1
    set qos-group 1
   !
   class class-default
    set qos-group 0
   !
  !
  class-map match-any EXP2
   match mpls experimental topmost 2
  !
  class-map match-any EXP3
   match mpls experimental topmost 3
  !
  class-map match-any EXP1
   match mpls experimental topmost 1
  !
  class-map match-any EXP6
   match mpls experimental topmost 6
  !
  class-map match-any EXP7
   match mpls experimental topmost 7
  !
  class-map match-any EXP4
   match mpls experimental topmost 4
  !
  class-map match-any EXP5
   match mpls experimental topmost 5
  !
  class-map match-any C3
   match cos  3 
  !
  class-map match-any C2
   match cos  2 
  !
  class-map match-any C1
   match cos  1 
  !
  class-map match-any C7
   match cos  7 
  !
  class-map match-any C6
   match cos  6 
  !
  class-map match-any C5
   match cos  5 
  !
  class-map match-any C4
   match cos  4
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const coreIn = 'CORE_IN';
		const distIn = 'DIST_IN';

		return { coreIn, distIn };
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
