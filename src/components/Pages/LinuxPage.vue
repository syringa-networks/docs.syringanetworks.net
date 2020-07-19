<template>
	<main id="content">
		<page-header>
			<template slot="title">Linux Administration</template>
			<template slot="subtitle">Some of the most common commands used</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="show">
				<h4 class="h3">Show Commands</h4>
				<pre>
          <code>
  <span>Check Version</span>
  cat /etc/*release
  uname -a

  <span>Check Users & Groups</span>
  cat /etc/passwd
  cat /etc/group

  <span>Run Updates</span>
  sudo apt update
  sudo apt upgrade -y

  <span>Check Installed</span>
  sudo apt list --installed
          </code>
        </pre>
			</tab>
			<tab name="sudo">
				<h4 class="h3">How to SUDO ... properly</h4>
				<pre>
          <code>
  <span>switch to root</span>
  sudo su -
  sudo -i

  sudo find / -name '*.conf'
          </code>
        </pre>
			</tab>
			<tab name="Add User">
				<div class="inputFlex">
					<div>
						<h6>User Name</h6>
						<input v-model="userName" />
					</div>
				</div>
				<h4 class="h3">Ubuntu</h4>
				<pre>
          <code>
  adduser <span>{{ userName }}</span>

  usermod -aG sudo <span>{{ userName }}</span>

  echo "<span>{{ userName }}</span> ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/<span>{{ userName }}</span>

  chown -R <span>{{ userName }}</span>:<span>{{ userName }}</span> /home/<span>{{ userName }}</span>/
          </code>
        </pre>
				<h4 class="h3">CentOS</h4>
				<pre>
          <code>
  adduser <span>{{ userName }}</span>

  passwd <span>{{ userName }}</span>

  gpasswd -a <span>{{ userName }}</span> wheel

          </code>
        </pre>
				<h4 class="h3">Free BSD</h4>
				<pre>
          <code>
  adduser <span>{{ userName }}</span>
  //Walk through utility

  sudo pw groupmod wheel -m <span>{{ userName }}</span>
          </code>
        </pre>
			</tab>
			<tab name="networking">
				<h4 class="h3">Netplan Networking</h4>
				<div class="inputFlex">
					<div>
						<h6>Network File Name</h6>
						<input v-model="networkFileName" />
					</div>
					<div>
						<h6>Interface Name</h6>
						<input v-model="networkInterfaceName" />
					</div>
					<div>
						<h6>IP Address</h6>
						<input v-model="ipAddress" />
					</div>
					<div>
						<h6>Default Gateway</h6>
						<input v-model="defaultGateway" />
					</div>
				</div>
				<pre>
          <code>
  sudo vi /etc/netplan/<span>{{ networkFileName }}</span>.yaml

  network:
    ethernets:
      <span>{{ networkInterfaceName }}</span>:
        addresses:
          - <span>{{ ipAddress }}</span>/<span>{{ subnetMask }}</span>
        gateway4: <span>{{ defaultGateway }}</span>
        nameservers:
          search: syringanetworks.net
          addresses: [192.168.91.5,192.168.91.6]
        dhcp4: false
    version: 2
          </code>
        </pre>
			</tab>
			<tab name="dns">
				<h4 class="h3">DNS Stuff</h4>
				<pre>
          <code>
  scutil -dns
  systemd-resolve --status
  sudo resolvconf -u
  hostname -f

  host google.com
  nslookup google.com

  dig google.com
  dig google.com +short
  dig -x <span>x.x.x.x</span> +short
  dig @ns1.google.com google.com
  dig google.com +noall +answer
  dig google.com MX +noall +answer
  dig google.com ANY +noall +answer
  dig -f dnsnames.txt +noall +answer
          </code>
        </pre>
				<p>
					To append <code>+noall</code> and <code>+answer</code>, create a file <code>.digrc</code> in your home
					directory
				</p>
				<pre>
          <code>
  vi .digrc
  +noall +answer
          </code>
        </pre>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';

export default {
	data() {
		return {
			userName: 'solson',
			networkInterfaceName: 'ens160',
			networkFileName: 'network-config',
			ipAddress: '192.168.66.90',
			subnetMask: '24',
			defaultGateway: '192.168.66.1'
		};
	},
	components: {
		PageHeader
	}
};
</script>
