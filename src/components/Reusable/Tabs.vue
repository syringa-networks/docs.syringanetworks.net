<template>
	<div>
		<nav :class="$style.pageNav">
			<ul>
				<li
					v-for="(tab, index) in tabs"
					:key="index"
					:class="{ [$style.isActive]: tab.isActive }"
				>
					<a @click="selectTab(tab)">{{ tab.name }}</a>
				</li>
			</ul>
		</nav>

		<div :class="$style.containerDetail">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Tabs',
	setup() {
		const tabs = [];
		return { tabs };
	},

	created() {
		this.tabs = this.$children;
	},

	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = tab.name === selectedTab.name;
			});
		}
	}
};
</script>

<style lang="stylus" module>
.pageNav {
  position: sticky;
  top: 0;
  background: var(--gradient-rainbow);
  border-bottom: 1px solid rgba(247, 92, 3, 0.3);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 6px 0px;
  z-index: 1;

  ul {
    display: flex;
    align-items: flex-end;
    max-width: 1152px;
    width: 94%;
    margin-left: auto;
    margin-right: auto;
  }

  li {
    padding: 2.4rem 2.4rem 2.6rem 0;
  }

  a {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding-top: 0.8rem;
    padding-bottom: 1.2rem;
    overflow: hidden;
    font-weight: 400;
    color: var(--color-white);
    text-transform: uppercase;
    letter-spacing: 1px;
    word-spacing: -5px;
    opacity: 0.6;
    transition: opacity 0.4s ease-in-out;
    font-size: 12px;
    white-space: nowrap;

    &:after {
      content: '';
      width: 100%;
      height: 0.2rem;
      display: block;
      position: absolute;
      bottom: 0.8rem;
      right: 0;
      background: var(--color-yellow-1);
      transition: transform 0.4s ease-in-out;
      transform-origin: center;
      transform: scale(0);
    }
  }

  a {
    &:hover {
      opacity: 1;

      &:after {
        transform: scale(1);
      }
    }
  }

  li.isActive a {
    opacity: 1;
  }

  li.isActive a:after {
    content: '';
    transform: scale(1);
  }
}

.containerDetail {
  max-width: 1152px;
  width: 94%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 4.8rem;
  padding-bottom: 4.8rem;
}
</style>
