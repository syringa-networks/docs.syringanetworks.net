<template>
	<div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">
				IOS-XR CORE and DIST Policies
			</h3>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_IN</h6>
				<input :class="$style.input" v-model="coreInXr" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_OUT_M</h6>
				<input :class="$style.input" v-model="coreOutM" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map CORE_OUT_Q</h6>
				<input :class="$style.input" v-model="coreOutQ" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_IN</h6>
				<input :class="$style.input" v-model="distInXr" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_OUT_M</h6>
				<input :class="$style.input" v-model="distOutM" />
			</div>
			<div>
				<h6 :class="$style.h6">Policy-Map DIST_OUT_Q</h6>
				<input :class="$style.input" v-model="distOutQ" />
			</div>
			<pre>
        <code>
  policy-map <span>{{ coreInXr }}</span>
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

  class-map match-any <span>EXP1</span>
   match mpls experimental topmost 1 
   end-class-map
  ! 
  class-map match-any <span>EXP2</span>
   match mpls experimental topmost 2 
   end-class-map
  ! 
  class-map match-any <span>EXP3</span>
   match mpls experimental topmost 3 
   end-class-map
  ! 
  class-map match-any <span>EXP4</span>
   match mpls experimental topmost 4 
   end-class-map
  ! 
  class-map match-any <span>EXP5</span>
   match mpls experimental topmost 5 
   end-class-map
  ! 
  class-map match-any <span>EXP6</span>
   match mpls experimental topmost 6 
   end-class-map
  ! 
  class-map match-any <span>EXP7</span>
   match mpls experimental topmost 7 
   end-class-map
  !

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

  class-map match-any <span>Q1</span>
   match qos-group 1 
   end-class-map
  ! 
  class-map match-any <span>Q2</span>
   match qos-group 2 
   end-class-map
  ! 
  class-map match-any <span>Q3</span>
   match qos-group 3 
   end-class-map
  ! 
  class-map match-any <span>Q4</span>
   match qos-group 4 
   end-class-map
  ! 
  class-map match-any <span>Q5</span>
   match qos-group 5 
   end-class-map
  ! 
  class-map match-any <span>Q6</span>
   match qos-group 6 
   end-class-map
  ! 
  class-map match-any <span>Q7</span>
   match qos-group 7 
   end-class-map
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
    priority level 3
   ! 
   class <span>TC2</span>
    priority level 3
   ! 
   class <span>TC1</span>
    priority level 3 
   ! 
   class <span>class-default</span>
    bandwidth remaining percent 1
   ! 
  end-policy-map

  class-map match-any <span>TC1</span>
   match traffic-class 1 
   end-class-map
  ! 
  class-map match-any <span>TC2</span>
   match traffic-class 2 
   end-class-map
  ! 
  class-map match-any <span>TC3</span>
   match traffic-class 3 
   end-class-map
  ! 
  class-map match-any <span>TC4</span>
   match traffic-class 4 
   end-class-map
  ! 
  class-map match-any <span>TC5</span>
   match traffic-class 5 
   end-class-map
  ! 
  class-map match-any <span>TC6</span>
   match traffic-class 6
   end-class-map
  ! 
  class-map match-any <span>TC7</span>
   match traffic-class 7 
   end-class-map
  ! 

  policy-map <span>{{ distInXr }}</span>
   class <span>C7</span>
    set traffic-class 7
    set qos-group 7
   !
   class <span>C6</span>
    set traffic-class 6
    set qos-group 6
   !
   class <span>C5</span>
    set traffic-class 5
    set qos-group 5
   !
   class <span>C4</span>
    set traffic-class 4
    set qos-group 4
   !
   class <span>C3</span>
    set traffic-class 3
    set qos-group 3
   !
   class <span>C2</span>
    set traffic-class 2
    set qos-group 2
   !
   class <span>C1</span>
    set traffic-class 1
    set qos-group 1
   !
   class <span>class-default</span>
    set traffic-class 0
    set qos-group 0
   !
  end-policy-map
  !

  class-map match-any <span>C1</span>
   match cos 1 
   end-class-map
  ! 
  class-map match-any <span>C2</span>
   match cos 2 
   end-class-map
  ! 
  class-map match-any <span>C3</span>
   match cos 3 
   end-class-map
  ! 
  class-map match-any <span>C4</span>
   match cos 4 
   end-class-map
  ! 
  class-map match-any <span>C5</span>
   match cos 5 
   end-class-map
  ! 
  class-map match-any <span>C6</span>
   match cos 6 
   end-class-map
  ! 
  class-map match-any <span>C7</span>
   match cos 7 
   end-class-map
  !

  policy-map <span>{{ distOutQ }}</span>
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
    priority level 3
   ! 
   class <span>TC2</span>
    priority level 3
   ! 
   class <span>TC1</span>
    priority level 3
   ! 
   class <span>class-default</span>
    bandwidth remaining percent 1
   ! 
  end-policy-map

  class-map match-any <span>TC1</span>
   match traffic-class 1 
   end-class-map
  ! 
  class-map match-any <span>TC2</span>
   match traffic-class 2 
   end-class-map
  ! 
  class-map match-any <span>TC3</span>
   match traffic-class 3 
   end-class-map
  ! 
  class-map match-any <span>TC4</span>
   match traffic-class 4 
   end-class-map
  ! 
  class-map match-any <span>TC5</span>
   match traffic-class 5 
   end-class-map
  ! 
  class-map match-any <span>TC6</span>
   match traffic-class 6
   end-class-map
  ! 
  class-map match-any <span>TC7</span>
   match traffic-class 7 
   end-class-map
  ! 
 
  policy-map <span>{{ distOutM }}</span>
   class <span>Q7</span>
    set cos 7
   ! 
   class <span>Q6</span>
    set cos 6
   ! 
   class <span>Q5</span>
    set cos 5
   ! 
   class <span>Q4</span>
    set cos 4
   ! 
   class <span>Q3</span>
    set cos 3
   ! 
   class <span>Q2</span>
    set cos 2
   ! 
   class <span>Q1</span>
    set cos 1
   ! 
   class <span>class-default</span>
    set cos 0
   ! 
  end-policy-map
  !
  
  class-map match-any <span>Q1</span>
   match qos-group 1 
   end-class-map
  ! 
  class-map match-any <span>Q2</span>
   match qos-group 2 
   end-class-map
  ! 
  class-map match-any <span>Q3</span>
   match qos-group 3 
   end-class-map
  ! 
  class-map match-any <span>Q4</span>
   match qos-group 4 
   end-class-map
  ! 
  class-map match-any <span>Q5</span>
   match qos-group 5 
   end-class-map
  ! 
  class-map match-any <span>Q6</span>
   match qos-group 6 
   end-class-map
  ! 
  class-map match-any <span>Q7</span>
   match qos-group 7 
   end-class-map
  !
        </code>
      </pre>
		</div>
		<div :class="$style.inputFlex">
			<h3 :class="$style.h3">
				IOS-XR Interface Configuration
			</h3>
			<div>
				<h6 :class="$style.h6">CORE Interface</h6>
				<input
					:class="$style.input"
					v-model="coreInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">CORE Inbound Policy</h6>
				<input :class="$style.input" v-model="coreInXr" />
			</div>
			<div>
				<h6 :class="$style.h6">CORE Outbound Policy</h6>
				<input :class="$style.input" v-model="coreOutQ" />
			</div>
			<div>
				<h6 :class="$style.h6">DIST Interface</h6>
				<input
					:class="$style.input"
					v-model="distInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">DIST Inbound Policy</h6>
				<input :class="$style.input" v-model="distInXr" />
			</div>
			<div>
				<h6 :class="$style.h6">DIST Outbound Policy</h6>
				<input :class="$style.input" v-model="distOutQ" />
			</div>
			<pre>
        <code>
  interface <span>{{ coreInterface }}</span>
    service-policy input <span>{{ coreInXr }}</span>
    service-policy output <span>{{ coreOutQ }}</span>
  !
  
  interface <span>{{ distInterface }}</span>
    service-policy input <span>{{ distInXr }}</span>
    service-policy output <span>{{ distOutQ }}</span>
  !
        </code>
      </pre>
		</div>
	</div>
</template>

<script>
export default {
	setup() {
		const coreInXr = 'CORE_IN';
		const coreOutM = 'CORE_OUT_M';
		const coreOutQ = 'CORE_OUT_Q';
		const distInXr = 'DIST_IN';
		const distOutM = 'DIST_OUT_M';
		const distOutQ = 'DIST_OUT_Q';
		const coreInterface = 'TenGigE0/0/0/0';
		const distInterface = 'TenGigE0/0/0/0';

		return {
			coreInXr,
			coreOutM,
			coreOutQ,
			distInXr,
			distOutM,
			distOutQ,
			coreInterface,
			distInterface
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
  background-color: var(--color-gradient-4);
}

.inputFlex {
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  border: 2px solid var(--color-gradient-4);
  margin-bottom: 2rem;

  div {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    border-image: var(--gradient-purple) 1;
  }

  .h6 {
    font-family: 'Source Code Pro';
    text-transform: none;
    color: var(--color-gradient-4);
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
  border: 1px solid var(--color-gradient-4);
  padding: 1rem;
  margin-bottom: 1rem;

  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}
</style>
