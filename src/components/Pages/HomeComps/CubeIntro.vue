<script>
import { TimelineMax } from 'gsap';
export default {
	mounted() {
		const tl = new TimelineMax();
		const { cubeIntro } = this.$refs;
		tl.from(cubeIntro, 1.5, {
			opacity: 0,
			delay: 1
		});
	}
};
</script>

<style lang="stylus" module>
.svg {
  flex-basis: 40%;
  animation: hoverY 2s infinite alternate;
}

@keyframes hoverY {
  0% {
    transform: translatey(0px);
  }

  100% {
    transform: translatey(-2rem);
  }
}
</style>

<template>
	<svg :class="$style.svg" ref="cubeIntro" viewBox="0 0 35 46" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient x1="-1.821%" y1="49.974%" x2="101.98%" y2="49.974%" id="a">
				<stop class="homeCube" offset="0%" />
				<stop class="homeCube" offset="100%" />
			</linearGradient>
		</defs>
		<path
			d="M263 7.066l-8.337 4.793-8.337-4.793 8.337-4.792L263 7.066zm-16.62 9.593l-8.338-4.8-8.337 4.8 8.337 4.792 8.337-4.792zm0 9.584l-8.338 4.8 8.337 4.793 8.337-4.793-8.337-4.8zm0-19.177v19.177l8.336 4.8V11.86l-8.337-4.793zm8.336 4.793v19.184l-8.337 4.793v9.592L263 35.881V7.066l-8.284 4.793zm-24.927 4.8V35.88l16.62 9.593V35.88l-8.336-4.792v-9.615l-8.284-4.815z"
			transform="translate(-229 -1)"
			stroke="url(#a)"
			stroke-width="1.326"
			fill="none"
			fill-rule="evenodd"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
