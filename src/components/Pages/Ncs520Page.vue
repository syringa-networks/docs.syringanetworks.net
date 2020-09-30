<template>
	<main id="content">
		<page-header>
			<template slot="title">NCS 520 Configuration</template>
			<template slot="subtitle">NCS 520 Configuration for L2 and L3 rings</template>
		</page-header>
		<tabs>
			<tab :selected="true" name="Upgrade Procedure">
				<h3>520 Upgrade Procedure</h3>
				<p>verify the current ROMMON version on the router</p>
				<pre>
					<code>
show platform
					</code>
				</pre>
				<p>If ROMMON is not 1.5 you need to upgrade the ROMMON before doing the code upgrade.</p>
				<p>Copy both the ROMMON upgrade file and the new version of code to the bootflash</p>
				<pre>
					<code>
copy ftp://192.168.71.127/NCS/NCS-520/ncs520-1.5rommon-auto-upgrade-xe.bin bootflash:
copy ftp://192.168.71.127/NCS/NCS-520/ncs520-universalk9_npe.16.12.04.SPA.bin bootflash:
					</code>
				</pre>
				<p>Remove all existing boot system commands from the configuration</p>
				<pre>
					<code>
no boot system flash ncs520-universalk9_npe.16.11.01.SPA.bin
					</code>
				</pre>
				<p>Configure the router to boot the ROMMON Upgrade image.</p>
				<pre>
					<code>
boot system flash bootflash:ncs520-1.5rommon-auto-upgrade-xe.bin
					</code>
				</pre>
				<p>Write the configuration to memory</p>
				<pre>
					<code>
write memory
					</code>
				</pre>
				<p>Now reload the router</p>
				<pre>
					<code>
reload
					</code>
				</pre>
				<p>When the router comes back online verify the ROMMON is correctly upgraded to version 1.5.</p>
				<pre>
					<code>
show platform
					</code>
				</pre>
				<p>Remove the boot string command pointed at the ROMMON Upgrade image.</p>
				<pre>
					<code>
no boot system flash ncs520-1.5rommon-auto-upgrade-xe.bin
					</code>
				</pre>
				<p>Change the boot string to the new version of code.</p>
				<pre>
					<code>
boot system flash bootflash:ncs520-universalk9_npe.16.12.04.SPA.bin
					</code>
				</pre>
				<p>write the configuration to memory</p>
				<pre>
					<code>
write memory
					</code>
				</pre>
				<p>Verify boot variable is pointed to the correct file.</p>
				<pre>
					<code>
show bootvar
					</code>
				</pre>
				<p>Reload router</p>
				<pre>
					<code>
reload
					</code>
				</pre>
				<p>Once the router comes back online verify the code has upgraded successfully.</p>
				<pre>
					<code>
show version
					</code>
				</pre>
			</tab>
		</tabs>
	</main>
</template>

<script>
import PageHeader from '@/components/PageCommon/PageHeader';

export default {
	components: {
		PageHeader
	}
};
</script>
