<template>
	<div>
		<h3 :class="$style.h3">Cellular Configuration</h3>
		<p>If the SIM is Verizon, you need to use profile 3</p>
		<p>If the SIM is AT&amp;T, you need to use profile 1</p>
		<ul :class="$style.ul">
			<li>Verizon Static - we01.vzwstatic</li>
			<li>Verizon Dynamic - vzwinternet</li>
			<li>AT&amp;T Static - i2gold</li>
			<li>AT&amp;T Dynamic - broadband</li>
		</ul>

		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">
					Cellular Interface (0/1/0 or 0/2/0)
				</h6>
				<input
					:class="$style.input"
					v-model="cellularInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">Access Point Name (APN)</h6>
				<input :class="$style.input" v-model="apn" />
			</div>
			<div>
				<h6 :class="$style.h6">Profile Number</h6>
				<input
					:class="$style.input"
					v-model="profileNumber"
				/>
			</div>
		</div>
		<pre>
      <code>
  cellular <span>{{ cellularInterface }}</span> lte profile create <span>{{ profileNumber }}</span> <span>{{ apn }}</span>
  !
  controller Cellular <span>{{ cellularInterface }}</span>
    lte modem link-recovery disable 
  ! 
  chat-script lte "" "AT!CALL1" TIMEOUT 20 "OK"
  !
  dialer watch-list 1 ip 5.6.7.8 0.0.0.0
  dialer watch-list 1 delay route-check initial 60
  dialer watch-list 1 delay connect 1
  dialer-list 1 protocol ip permit
  dialer-list 1 protocol ipv6 permit
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const apn = 'we01.vzwstatic';
		const profileNumber = '3';
		const cellularInterface = '0/2/0';
		return { apn, profileNumber, cellularInterface };
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

.ul {
  padding-left: 2rem;
  margin-bottom: 2rem;
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
