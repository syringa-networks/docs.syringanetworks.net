<template>
	<div>
		<h3>Crypto Configuration</h3>
		<div class="inputFlex">
			<div>
				<h6>Certificate Server VRF</h6>
				<input v-model="certVrf" />
			</div>
			<div>
				<h6>Primary VRF</h6>
				<input v-model="primaryVrf" />
			</div>
			<div>
				<h6>Backup VRF</h6>
				<input v-model="backupVrf" />
			</div>
			<div>
				<h6>Crypto Server Password</h6>
				<input v-model="cryptoPassword" />
			</div>
			<div>
				<h6>Cert Enable Password</h6>
				<input v-model="enablePassword" />
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
      </code>
		</pre>
		<pre>
      <code>
crypto pki authenticate cert-ca
      </code>
		</pre>
		<pre>
      <code>
crypto pki enroll cert-ca
      </code>
    </pre>
		<pre>
      <code>
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
		const cryptoPassword = 'yfW?BWEmvc@^9w9D';
		const enablePassword = 'oLOw8RI3rLIZ';

		return { certVrf, primaryVrf, backupVrf, cryptoPassword, enablePassword };
	}
};
</script>
