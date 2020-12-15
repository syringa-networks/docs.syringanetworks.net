<template>
	<div>
		<h3>Router Upgrade Process</h3>
		<p>
			Below is the procedure to upgrade the software on the Cisco 1100 routers to 16.12.4. The file you need is on the FTP server.
		</p>
		<pre>
      <code>
terminal monitor

copy ftp://192.168.71.127/isr1100/c1100-universalk9.16.12.04.SPA.bin flash:
      </code>
		</pre>
		<p>Once this is done, you'll need to set the router to boot from the new image:</p>
		<pre>
			<code>
boot system flash:c1100-universalk9.16.12.04.SPA.bin

wr
			</code>
		</pre>
		<p>Then <span>REBOOT</span></p>
		<h2>Configure Smart Licensing</h2>
		<div class="inputFlex">
			<div>
				<h6>Interface</h6>
				<input v-model="primaryInterface" />
			</div>
			<div>
				<h6>VRF</h6>
				<input v-model="primaryVrf" />
			</div>
			<div>
				<h6>License Level</h6>
				<input v-model="licenseLevel" />
			</div>
		</div>
		<pre>
			<code>
call-home
 contact-email-addr sch-smart-licensing@cisco.com
 source-interface <span>{{ primaryInterface }}</span>
 http secure server-identity-check
 vrf <span>{{ primaryVrf }}</span>
 http resolve-hostname ipv4-first
 profile "CiscoTAC-1"
  active
  destination transport-method http
  no destination transport-method email
!
ip http client source-interface <span>{{ primaryInterface }}</span>
ip domain lookup
ip domain lookup vrf <span>{{ primaryVrf }}</span> source-interface <span>{{ primaryInterface }}</span>
ip name-server vrf <span>{{ primaryVrf }}</span> 1.1.1.1
!
license boot level <span>{{ licenseLevel }}</span>
			</code>
		</pre>
		<p>Test with ping and telnet to verify connectivity to cisco.com from vrf <span>{{ primaryVrf }}</span></p>
		<pre>
			<code>
ping vrf <span>{{ primaryVrf }}</span> software.cisco.com
telnet software.cisco.com 80 /vrf <span>{{ primaryVrf }}</span>
telnet software.cisco.com 443 /vrf <span>{{ primaryVrf }}</span>
			</code>
		</pre>
		<h2>Register with Smart Licensing</h2>
		<p>At this point you need to create a token in the Smart Account and then register the device.</p>
		<pre>
			<code>
license smart register idtoken ***

show lic stat
			</code>
		</pre>
	</div>
</template>

<script>
export default {
	setup() {
		const licenseLevel = 'securityk9';
		const primaryInterface = 'Cellular0/2/0';
		const primaryVrf = 'ISP2';

		return { licenseLevel, primaryInterface, primaryVrf };
	}
};
</script>
