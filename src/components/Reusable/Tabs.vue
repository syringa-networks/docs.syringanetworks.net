<template>
	<div>
		<nav :class="$style.pageNav">
			<ul>
				<li v-for="(tab, index) in tabs" :key="index" :class="{ [$style.isActive]: tab.isActive }">
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
			this.tabs.forEach((tab) => {
				tab.isActive = tab.name === selectedTab.name;
			});
		}
	}
};
</script>

<style lang="stylus" module>
.pageNav {
  position: sticky;
  top: -1px;
  background: var(--color-dark);
  border-bottom: 1px solid rgba(241, 250, 140, 0.3);
  border-top: 1px solid rgba(241, 250, 140, 0.3);
  overflow-x: auto;
  z-index: 1;

  ul {
    display: flex;
    margin-right: auto;
    padding-left: 4rem;
  }

  li {
    padding: 3rem 3rem 2.65rem 0;
  }

  a {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    padding-top: 0.8rem;
    padding-bottom: 1.2rem;
    overflow: hidden;
    font-weight: 400;
    color: var(--color-light);
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
      background: var(--color-yellow);
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
  width: 94%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 4.8rem;
  padding-bottom: 4.8rem;

  @media (min-width: 1440px) {
    width: 65%;
    margin-left: 3rem;
  }
}
</style>
