<template>
	<div>
		<h3 :class="$style.h3">Smart Licensing</h3>
		<p>
			If you need to change the source interface and VRF for
			call-home, do it here.
		</p>
		<p>
			Cisco has introduced Smart Licensing and all the 1121X
			routers will need the following configuration to
			"check in" via call-home.
		</p>
		<p>
			What we'll need to set is a source interface for
			call-home as well as setup an http client to send
			requests to tools.cisco.com.
		</p>
		<p>
			Upon completion, you should be able to ping
			tools.cisco.com from {{ primaryVrf }}. This is why we
			need the DNS server and the domain lookup commands.
		</p>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Interface</h6>
				<input
					:class="$style.input"
					v-model="primaryInterface"
				/>
			</div>
			<div>
				<h6 :class="$style.h6">VRF</h6>
				<input :class="$style.input" v-model="primaryVrf" />
			</div>
			<div>
				<h6 :class="$style.h6">License Level</h6>
				<input
					:class="$style.input"
					v-model="licenseLevel"
				/>
			</div>
		</div>
		<pre>
      <code>
  call-home
   contact-email-addr sch-smart-licensing@cisco.com
   source-interface <span>{{ primaryInterface }}</span>
   http secure server-identity-check
   vrf <span>{{ primaryVrf }}</span>
   profile "CiscoTAC-1"
    active
    destination transport-method http
    no destination transport-method email
  !
  ip http client source-interface <span>{{ primaryInterface }}</span>
  ip domain lookup vrf <span>{{ primaryVrf }}</span> source-interface <span>{{ primaryInterface }}</span>
  ip name-server vrf <span>{{ primaryVrf }}</span> 1.1.1.1
  !
  license boot level <span>{{ licenseLevel }}</span>
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const primaryInterface = 'GigabitEthernet0/0/0';
		const primaryVrf = 'ISP1';
		const licenseLevel = 'securityk9';

		return { primaryInterface, primaryVrf, licenseLevel };
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
