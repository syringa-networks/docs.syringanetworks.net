<template>
	<div :class="$style.containerFull">
		<header :class="$style.pageHeader">
			<div :class="$style.container">
				<div>
					<h1 class="pageHeaderH1">
						<slot name="title"></slot>
					</h1>
					<p>
						<slot name="subtitle"></slot>
					</p>
				</div>
			</div>
		</header>
	</div>
</template>

<style lang="stylus" module>
.containerFull {
  max-width: 100%;
}

.pageHeader {
  padding-top: 10rem;
  padding-bottom: 9rem;
}

.container {
  display: flex;
  width: 94%;
  margin-left: auto;
  margin-right: auto;
}
</style>
