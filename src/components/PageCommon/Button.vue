<template>
	<button :class="$style.btnGlobal" @click="seen = !seen">
		<slot></slot>
	</button>
</template>

<script>
export default {
	data() {
		return {
			seen: true
		};
	}
};
</script>
<style lang="stylus" module>
.btnGlobal {
  background-color: var(--color-gradient-2);
  color: var(--color-white);
  transform: translate3d(0, 0, 0);
  border-radius: 0.4rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 1.3rem 2.8rem;
  margin-bottom: 2rem;
  transition: transform 0.2s ease-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translate3d(0, -1px, 0);
  }

  &:focus {
    outline: none;
  }
}
</style>
