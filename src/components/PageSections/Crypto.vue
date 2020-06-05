<template>
	<div>
		<h3 :class="$style.h3">Crypto Configuration</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">Certificate Server VRF</h6>
				<input :class="$style.input" v-model="certVrf" />
			</div>
			<div>
				<h6 :class="$style.h6">Primary VRF</h6>
				<input :class="$style.input" v-model="primaryVrf" />
			</div>
			<div>
				<h6 :class="$style.h6">Backup VRF</h6>
				<input :class="$style.input" v-model="backupVrf" />
			</div>
		</div>
		<pre>
      <code>
  crypto pki trustpoint cert-ca
    enrollment url http://67.215.44.6
    serial-number
    vrf <span>{{ certVrf }}</span>
    revocation-check none
    rsakeypair cert-ca
    auto-enroll 90
  !
  crypto pki authenticate cert-ca
  <span>// type 'yes'</span>
  crypto pki enroll cert-ca
  <span>yfW?BWEmvc@^9w9D</span>
  !
  crypto isakmp policy 1
    encr aes 256
    hash sha256
    group 21
  !
  crypto isakmp profile PRIMARY-ISAKMP-PROFILE
   match identity address 0.0.0.0 <span>{{ primaryVrf }}</span>
   initiate mode aggressive
   local-address GigabitEthernet0/0/0
  !
  crypto isakmp profile BACKUP-ISAKMP-PROFILE
   match identity address 0.0.0.0 <span>{{ backupVrf }}</span>
   initiate mode aggressive
   local-address Cellular0/2/0
  !
  crypto ipsec transform-set SD-WAN esp-aes 256 esp-sha-hmac 
   mode transport
  !
  crypto ipsec profile BACKUP-IPSEC-PROFILE
   set transform-set SD-WAN 
   set pfs group21
   set isakmp-profile BACKUP-ISAKMP-PROFILE
  !
  crypto ipsec profile PRIMARY-IPSEC-PROFILE
   set transform-set SD-WAN 
   set pfs group21
   set isakmp-profile PRIMARY-ISAKMP-PROFILE
  !
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const certVrf = 'ISP2';
		const primaryVrf = 'ISP1';
		const backupVrf = 'ISP2';
		return { certVrf, primaryVrf, backupVrf };
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
