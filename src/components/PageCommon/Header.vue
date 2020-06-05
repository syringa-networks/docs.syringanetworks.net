<template>
	<header :class="$style.siteHeader">
		<div :class="$style.siteHeaderInner">
			<div :class="$style.logo">
				<router-link
					:class="$style.logoA"
					:to="{ name: 'home' }"
				>
					<site-logo></site-logo>
				</router-link>
			</div>
			<nav :class="$style.siteHeaderPanel">
				<div>
					<ul :class="$style.mainNav">
						<router-link
							:key="link.id"
							:to="link.location"
							:class="$style.navListLi"
							exact
							tag="li"
							v-for="link in header.navList"
						>
							<a
								ref="navRef"
								:class="$style.navigationListAnchor"
								>{{ link.name }}</a
							>
						</router-link>
					</ul>
				</div>
			</nav>
		</div>
	</header>
</template>

<script>
import { mapState } from 'vuex';
import anime from 'animejs';
import SiteLogo from '@/components/PageCommon/SiteLogo';

export default {
	name: 'Header',
	computed: mapState(['header']),
	components: {
		SiteLogo
	},

	mounted() {
		const { navRef } = this.$refs;

		anime({
			targets: navRef,
			delay: anime.stagger(100, {
				start: 100
			}),
			opacity: [1]
		});
	}
};
</script>

<style lang="stylus" module>
.siteHeader {
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  top: 0;
  height: 100vmin;
  z-index: 10;
  background: var(--color-white);
  border-right: 0.1rem solid rgba(247, 92, 3, 0.3);
}

.siteHeaderInner {
  justify-content: space-between;
  height: 100%;
}

.siteHeaderInner, .mainNav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.mainNav {
  width: 100%;
  padding-right: 3rem;

  li {
    padding-top: 2rem;
    padding-bottom: 2rem;
    width: 100%;
    text-align: right;
  }
}

.secondNav {
  width: 100%;
  padding-right: 3rem;
  margin-bottom: 2rem;

  li {
    padding-top: 2rem;
    padding-bottom: 2rem;
    width: 100%;
    text-align: right;
  }
}

.logo {
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-bottom: 0.1rem solid rgba(247, 92, 3, 0.3);
}

.logoA {
  display: flex;
  justify-content: flex-end;
}

.siteHeaderPanel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  div {
    width: 42rem;
    padding-top: 3rem;
  }
}

.h1 {
  font-size: 3rem;
  text-align: right;
  margin-right: 3rem;
  margin-bottom: 0;
}

.navigationListAnchor {
  position: relative;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.3s;
  opacity: 0;

  &:after {
    position: absolute;
    transition: 0.3s;
    content: '';
    width: 0;
    left: 50%;
    bottom: 0;
    height: 3px;
    background: var(--color-orange-5);
    right: 0;
    left: auto;
  }

  &:hover {
    cursor: pointer;

    &:after {
      width: 100%;
      left: 0;
    }
  }
}
</style>
