<template>
	<div>
		<h3>IOS XE QoS Configuration</h3>
		<p>
			Set inbound service-policy to set QoS group/EXP/COS and outbound policy to queue the traffic.
		</p>
		<div class="inputFlex">
			<div>
				<h6>Policy-Map INBOUND</h6>
				<input v-model="inboundPolicy" />
			</div>
			<div>
				<h6>Policy-Map OUTBOUND</h6>
				<input v-model="outboundPolicy" />
			</div>
			<div>
				<h6>Policy-Map CORE_IN</h6>
				<input v-model="coreIn" />
			</div>
			<div>
				<h6>Policy-Map CORE_OUT</h6>
				<input v-model="coreOut" />
			</div>
			<div>
				<h6>Policy-Map DIST_IN</h6>
				<input v-model="distIn" />
			</div>
			<div>
				<h6>Policy-Map DIST_OUT</h6>
				<input v-model="distOut" />
			</div>
		</div>
		<pre>
      <code>
  policy-map
      </code>
		</pre>
		<pre>
      <code>
  policy-map <span>{{ coreIn }}</span>
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
  policy-map <span>{{ coreOut }}</span>
   class <span>Q67</span>
    priority level 1 percent 10
   !
   class <span>Q5</span>
    priority level 2
   !
   class <span>Q4</span>
    bandwidth remaining percent 10
   !
   class <span>Q3</span>
    bandwidth remaining percent 30
   !
   class <span>Q2</span>
    bandwidth remaining percent 30
   !
   class <span>Q1</span> 
    bandwidth remaining percent 29
   !
   class <span>class-default</span>
    bandwidth remaining percent 1
   !
  !
  policy-map <span>{{ distIn }}</span>
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
  policy-map <span>{{ distOut }}</span>
   class <span>Q67</span>
    priority level 1 percent 10
   !
   class <span>Q5</span>
    priority level 2
   !
   class <span>Q4</span>
    bandwidth remaining percent 10
   !
   class <span>Q3</span>
    bandwidth remaining percent 30
   !
   class <span>Q2</span>
    bandwidth remaining percent 30
   !
   class <span>Q1</span>
    bandwidth remaining percent 29
   !
   class <span>class-default</span>
    bandwidth remaining percent 1
   !
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
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const inboundPolicy = '99KRGSxxxxxx_100M_IN';
		const outboundPolicy = '99KRGSxxxxxx_100M_OUT';
		const coreIn = 'CORE_IN';
		const coreOut = 'CORE_OUT';
		const distIn = 'DIST_IN';
		const distOut = 'DIST_OUT';

		return {
			inboundPolicy,
			outboundPolicy,
			coreIn,
			coreOut,
			distIn,
			distOut
		};
	}
};
</script>
