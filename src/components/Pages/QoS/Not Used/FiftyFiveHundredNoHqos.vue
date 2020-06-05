<template>
	<div>
		<h3>5500 HQoS Configuration</h3>
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
				<h6 :class="$style.h6">Policy-Map CORE_OUT_M</h6>
				<input :class="$style.input" v-model="coreOutM" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_OUT_Q</h6>
				<input :class="$style.input" v-model="coreOutQ" />
			</div>
		</div>
		<pre>
      <code>
  policy-map <span>{{ coreIn }}</span>
   class <span>EXP7</span>
    set traffic-class 7
    set qos-group 7
   !
   class <span>EXP6</span>
    set traffic-class 6
    set qos-group 6
   !
   class <span>EXP5</span>
    set traffic-class 5
    set qos-group 5
   !
   class <span>EXP4</span>
    set traffic-class 4
    set qos-group 4
   !
   class <span>EXP3</span>
    set traffic-class 3
    set qos-group 3
   !
   class <span>EXP2</span>
    set traffic-class 2
    set qos-group 2
   !
   class <span>EXP1</span>
    set traffic-class 1
    set qos-group 1
   !
   class <span>class-default</span>
    set traffic-class 0
    set qos-group 0
   !
  end-policy-map
  !
  policy-map <span>{{ coreOutQ }}</span>
   class <span>TC7</span>
    priority level 1
    shape average percent 10 
    queue-limit 1 packets 
   !
   class <span>TC6</span>
    priority level 1
    shape average percent 10 
    queue-limit 1 packets
   ! 
   class <span>TC5</span>
    priority level 2 
   ! 
   class <span>TC4</span>
    priority level 3 
   ! 
   class <span>TC3</span>
    priority level 4 
   ! 
   class <span>TC2</span>
    priority level 5
   ! 
   class <span>TC1</span>
    priority level 6
   ! 
   class <span>class-default</span>
    bandwidth remaining percent 100
   !
  end-policy-map

  policy-map <span>{{ coreOutM }}</span>
   class <span>Q7</span>
    set mpls experimental imposition 7
   ! 
   class <span>Q6</span>
    set mpls experimental imposition 6
   ! 
   class <span>Q5</span>
    set mpls experimental imposition 5
   ! 
   class <span>Q4</span>
    set mpls experimental imposition 4
   ! 
   class <span>Q3</span>
    set mpls experimental imposition 3
   ! 
   class <span>Q2</span>
    set mpls experimental imposition 2
   ! 
   class <span>Q1</span>
    set mpls experimental imposition 1
   ! 
   class <span>class-default</span>
   ! 
  end-policy-map
  !
  class-map match-any Q1
   match qos-group 1 
   end-class-map
  ! 
  class-map match-any Q2
   match qos-group 2 
   end-class-map
  ! 
  class-map match-any Q3
   match qos-group 3 
   end-class-map
  ! 
  class-map match-any Q4
   match qos-group 4 
   end-class-map
  ! 
  class-map match-any Q5
   match qos-group 5 
   end-class-map
  ! 
  class-map match-any Q6
   match qos-group 6 
   end-class-map
  ! 
  class-map match-any Q7
   match qos-group 7 
   end-class-map
  !
  class-map match-any TC1
   match traffic-class 1 
   end-class-map
  ! 
  class-map match-any TC2
   match traffic-class 2 
   end-class-map
  ! 
  class-map match-any TC3
   match traffic-class 3 
   end-class-map
  ! 
  class-map match-any TC4
   match traffic-class 4 
   end-class-map
  ! 
  class-map match-any TC5
   match traffic-class 5 
   end-class-map
  ! 
  class-map match-any TC6
   match traffic-class 6
   end-class-map
  ! 
  class-map match-any TC7
   match traffic-class 7 
   end-class-map
  ! 
  class-map match-any EXP1
   match mpls experimental topmost 1 
   end-class-map
  ! 
  class-map match-any EXP2
   match mpls experimental topmost 2 
   end-class-map
  ! 
  class-map match-any EXP3
   match mpls experimental topmost 3 
   end-class-map
  ! 
  class-map match-any EXP4
   match mpls experimental topmost 4 
   end-class-map
  ! 
  class-map match-any EXP5
   match mpls experimental topmost 5 
   end-class-map
  ! 
  class-map match-any EXP6
   match mpls experimental topmost 6 
   end-class-map
  ! 
  class-map match-any EXP7
   match mpls experimental topmost 7 
   end-class-map
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const coreIn = 'CORE_IN';
		const coreOutM = 'CORE_OUT_M';
		const coreOutQ = 'CORE_OUT_Q';

		return { coreIn, coreOutM, coreOutQ };
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
