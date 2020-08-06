<template>
	<header class="siteHeader">
		<div :class="$style.siteHeaderInner">
			<div class="logo">
				<router-link :class="$style.logoA" :to="{ name: 'home' }">
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
							<a ref="navRef" class="navigationListAnchor">{{ link.name }}</a>
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
    padding-top: 3rem;
		padding-bottom: 3rem;
  }
}

.h1 {
  font-size: 3rem;
  text-align: right;
  margin-right: 3rem;
  margin-bottom: 0;
}
</style>
