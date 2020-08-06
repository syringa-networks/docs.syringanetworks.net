<template>
	<div>
		<h3>Modem Upgrade Process</h3>
		<p>
			Below is the procedure to upgrade the firmware on the LTE modems for the Cisco 1100 routers. Both files you need
			are on the FTP server. Just make sure the cellular modem is actually in slot 0/2 for that last command. It should
			be on all the models we have deployed now.
		</p>
		<p>Please Note: All this configuration is done in <span>ENABLE MODE</span>, not Global Configuration.</p>
		<pre>
      <code>
terminal monitor

mkdir FW_VZW

copy ftp://192.168.71.127/isr1100/LTE_UPGRADE/7455_02.30.01.01_VERIZON_002.052_003.nvu bootflash:/FW_VZW/

copy ftp://192.168.71.127/isr1100/LTE_UPGRADE/74xx_02.30.01.01.cwe bootflash:/FW_VZW/

microcode reload cellular 0 2 modem-provision flash:FW_VZW
!
      </code>
		</pre>
	</div>
</template>
