<template>
	<div>
		<h3>Cellular Configuration</h3>
		<div class="inputFlex">
			<p>If the SIM is Verizon, you need to use profile 3</p>
			<p>If the SIM is AT&amp;T, you need to use profile 1</p>
			<ul :class="$style.ul">
				<li>Verizon Static - we01.vzwstatic</li>
				<li>Verizon Dynamic - vzwinternet</li>
				<li>AT&amp;T Static - i2gold</li>
				<li>AT&amp;T Dynamic - broadband</li>
				<li>GlobalGig - gg.jasprivstat.com.attz</li>
			</ul>

			<div>
				<h6>Access Point Name (APN)</h6>
				<input v-model="apn" />
			</div>
			<div>
				<h6>Profile Number</h6>
				<input v-model="profileNumber" />
			</div>
			<div>
				<h6>
					Cellular Interface (0/1/0 or 0/2/0)
				</h6>
				<input v-model="cellularInterface" />
			</div>
			<div>
				<h6>LTE Interface Address</h6>
				<input v-model="lteInterfaceIpAddress" />
			</div>
			<p>Do this in enable mode (You'll have to type 'yes'):</p>
			<pre>
        <code>
cellular <span>{{ cellularInterface }}</span> lte profile create <span>{{ profileNumber }}</span> <span>{{ apn }}</span>
        </code>
      </pre>
		</div>
		<pre>
      <code>
interface Cellular<span>{{ cellularInterface }}</span>
 description DIST to External fvrf ISP2
 vrf forwarding ISP2
 ip address negotiated
 ip access-group 199 out
 ip nat outside
 load-interval 30
 dialer in-band
 dialer idle-timeout 0
 dialer watch-group 1
 dialer-group 1
 ipv6 enable
 pulse-time 1
 no shutdown
!
ip access-list extended 199
 10 permit ip host <span>{{ lteInterfaceIpAddress }}</span> any
 20 deny   ip any any
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
		const lteInterfaceIpAddress = '166.253.2.67';
		return { apn, profileNumber, cellularInterface, lteInterfaceIpAddress };
	}
};
</script>

<style lang="stylus" module>
.ul {
  padding-left: 2rem;
  margin-bottom: 2rem;
}
</style>
