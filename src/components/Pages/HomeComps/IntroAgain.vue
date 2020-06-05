<template>
	<div :class="$style.intro">
		<div :class="$style.introContainer">
			<div :class="$style.cubeContainer">
				<cube-intro></cube-intro>
			</div>
		</div>
	</div>
</template>

<script>
import CubeIntro from './CubeIntro';

export default {
	components: {
		CubeIntro
	}
};
</script>

<style lang="stylus" module>
.intro {
  display: grid;
  align-items: center;
  height: 100vmin;
  background: var(--color-white);
}

.introContainer {
  max-width: 115rem;
  width: 94%;
  padding-bottom: 6rem;
  padding-top: 6rem;
  margin-left: auto;
  margin-right: auto;

  img {
    width: 40rem;
  }
}

.cubeContainer {
  display: flex;
  justify-content: flex-start;
}
</style>
