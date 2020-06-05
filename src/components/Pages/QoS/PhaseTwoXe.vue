<template>
	<div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">
				IOS-XE CORE and DIST Policies
			</h3>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_IN</h6>
				<input :class="$style.input" v-model="coreInXe" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_OUT</h6>
				<input :class="$style.input" v-model="coreOutXe" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_IN</h6>
				<input :class="$style.input" v-model="distInXe" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_OUT</h6>
				<input :class="$style.input" v-model="distOutXe" />
			</div>
			<pre>
        <code>
  policy-map <span>{{ coreInXe }}</span>
   class <span>EXP7</span>
    set qos-group 7
    set cos 7
    set mpls experimental imposition 7
   !
   class <span>EXP6</span>
    set qos-group 6
    set cos 6
    set mpls experimental imposition 6
   !
   class <span>EXP5</span>
    set qos-group 5
    set cos 5
    set mpls experimental imposition 5
   !
   class <span>EXP4</span>
    set qos-group 4
    set cos 4
    set mpls experimental imposition 4
   !
   class <span>EXP3</span>
    set qos-group 3
    set cos 3
    set mpls experimental imposition 3
   !
   class <span>EXP2</span>
    set qos-group 2
    set cos 2
    set mpls experimental imposition 2
   !
   class <span>EXP1</span>
    set qos-group 1
    set cos 1
    set mpls experimental imposition 1
   !
   class <span>class-default</span>
    set qos-group 0
    set cos 0
    set mpls experimental imposition 0
   !
  !

  class-map match-any <span>EXP7</span>
   match mpls experimental topmost 7
  !
  class-map match-any <span>EXP6</span>
   match mpls experimental topmost 6
  !
  class-map match-any <span>EXP5</span>
   match mpls experimental topmost 5
  !
  class-map match-any <span>EXP4</span>
   match mpls experimental topmost 4
  !
  class-map match-any <span>EXP3</span>
   match mpls experimental topmost 3
  !
  class-map match-any <span>EXP2</span>
   match mpls experimental topmost 2
  !
  class-map match-any <span>EXP1</span>
   match mpls experimental topmost 1
  !    

  policy-map <span>{{ coreOutXe }}</span>
   class <span>Q67</span>
    priority level 1 percent 10
   !
   class <span>Q5</span>
    priority level 2
   !
   class <span>Q4</span>
    priority level 3
   !
   class <span>Q3</span>
    priority level 3
   !
   class <span>Q2</span>
    priority level 3
   !
   class <span>Q1</span> 
    priority level 3
   !
   class <span>class-default</span>
    bandwidth remaining percent 1
   !
  !

  class-map match-any <span>Q67</span>
   match qos-group 7
   match qos-group 6
  !
  class-map match-any <span>Q7</span>
   match qos-group 7
  !
  class-map match-any <span>Q6</span>
   match qos-group 6
  !
  class-map match-any <span>Q5</span>
   match qos-group 5
  !
  class-map match-any <span>Q4</span>
   match qos-group 4
  !
  class-map match-any <span>Q3</span>
   match qos-group 3
  !
  class-map match-any <span>Q2</span>
   match qos-group 2
  !
  class-map match-any <span>Q1</span>
   match qos-group 1
  !

  policy-map <span>{{ distInXe }}</span>
   class <span>C7</span>
    set qos-group 7
    set cos 7
    set mpls experimental imposition 7
   !
   class <span>C6</span>
    set qos-group 6
    set cos 6
    set mpls experimental imposition 6
   !
   class <span>C5</span>
    set qos-group 5
    set cos 5
    set mpls experimental imposition 5
   !
   class <span>C4</span>
    set qos-group 4
    set cos 4
    set mpls experimental imposition 4
   !
   class <span>C3</span>
    set qos-group 3
    set cos 3
    set mpls experimental imposition 3
   !
   class <span>C2</span>
    set qos-group 2
    set cos 2
    set mpls experimental imposition 2
   !
   class <span>C1</span>
    set qos-group 1
    set cos 1
    set mpls experimental imposition 1
   !
   class <span>class-default</span>
    set qos-group 0
    set cos 0
    set mpls experimental imposition 0
   !
  !

  class-map match-any <span>C7</span>
    match cos 7
  !
  class-map match-any <span>C6</span>
    match cos 6
  !
  class-map match-any <span>C5</span>
    match cos 5
  !
  class-map match-any <span>C4</span>
    match cos 4
  !
  class-map match-any <span>C3</span>
    match cos 3
  !
  class-map match-any <span>C2</span>
    match cos 2
  !
  class-map match-any <span>C1</span>
    match cos 1
  !

  policy-map <span>{{ distOutXe }}</span>
   class <span>Q67</span>
    priority level 1 percent 10
   !
   class <span>Q5</span>
    priority level 2
   !
   class <span>Q4</span>
    priority level 3
   !
   class <span>Q3</span>
    priority level 3
   !
   class <span>Q2</span>
    priority level 3
   !
   class <span>Q1</span>
    priority level 3
   !
   class <span>class-default</span>
    bandwidth remaining percent 1
   !
  !

  class-map match-any <span>Q67</span>
   match qos-group 7
   match qos-group 6
  !
  class-map match-any <span>Q7</span>
   match qos-group 7
  !
  class-map match-any <span>Q6</span>
   match qos-group 6
  !
  class-map match-any <span>Q5</span>
   match qos-group 5
  !
  class-map match-any <span>Q4</span>
   match qos-group 4
  !
  class-map match-any <span>Q3</span>
   match qos-group 3
  !
  class-map match-any <span>Q2</span>
   match qos-group 2
  !
  class-map match-any <span>Q1</span>
   match qos-group 1
  !

  policy-map <span>Q0_OUT</span>
   class class-default
    set qos-group 0
    set mpls experimental imposition 0
   !
  !
  policy-map <span>Q1_OUT</span>
   class class-default
    set qos-group 1
    set mpls experimental imposition 1
   !
  !
  policy-map <span>Q2_OUT</span>
   class class-default
    set qos-group 2
    set mpls experimental imposition 2
   !
  !
  policy-map <span>Q3_OUT</span>
   class class-default
    set qos-group 3
    set mpls experimental imposition 3
   !
  !
  policy-map <span>Q4_OUT</span>
   class class-default
    set qos-group 4
    set mpls experimental imposition 4
   !
  !
  policy-map <span>Q5_OUT</span>
   class class-default
    set qos-group 5
    set mpls experimental imposition 5
   !
  !
  policy-map <span>Q6_OUT</span>
   class class-default
    set qos-group 6
    set mpls experimental imposition 6
   !
  !
  policy-map <span>Q7_OUT</span>
   class class-default
    set qos-group 7
    set mpls experimental imposition 7
   !
  !
        </code>
      </pre>
		</div>
	</div>
</template>

<script>
export default {
	setup() {
		const coreInXe = 'CORE_IN';
		const coreOutXe = 'CORE_OUT';
		const distInXe = 'DIST_IN';
		const distOutXe = 'DIST_OUT';
		const coreInXr = 'CORE_IN';

		return {
			coreInXe,
			coreOutXe,
			distInXe,
			distOutXe
		};
	}
};
</script>

<style lang="stylus" module>
.h3 {
  padding: 4rem;
  margin-left: -4rem;
  margin-right: -4rem;
  margin-top: -3rem;
  color: var(--color-white);
  background-color: var(--color-orange-5);
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
