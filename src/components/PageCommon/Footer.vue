<template>
	<footer :class="$style.siteFooter">
		<div :class="$style.containerWide">
			<div>
				<PlanetLogo />
			</div>
			<div>
				<h2>{{ footer.title }}</h2>
				<ul :class="$style.footerNav">
					<li :key="link.name" v-for="link in footer.externalLinks">
						<a :href="link.url" :target="link.target" :class="$style.navLink">{{ link.name }}</a>
					</li>
				</ul>
			</div>
		</div>
		<div :class="$style.logoFooter">
			<FooterLogo />
		</div>
	</footer>
</template>

<script>
import { mapState } from 'vuex';
import PlanetLogo from './PlanetLogo';
import FooterLogo from './FooterLogo';

export default {
	name: 'Footer',
	computed: {
		...mapState(['footer'])
	},

	components: {
		PlanetLogo,
		FooterLogo
	}
};
</script>

<style lang="stylus" module>
.siteFooter {
  grid-column: 2 / -1;
  width: 100%;
  position: relative;
  background: var(--color-dark);
  padding-top: 10rem;
  padding-bottom: 10rem;
  z-index: 3;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    background: url('~@/assets/img/star-group-sm.svg') center / cover no-repeat;
    z-index: -1;
  }

  .containerWide {
    display: flex;
    justify-content: space-between;
    max-width: 115rem;
    margin-left: auto;
    margin-right: auto;

    div:first-child {
      align-self: flex-end;
    }

    h2 {
      position: relative;
      display: inline-block;
      background-image: var(--gradient-rainbow);
      background-size: cover;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      text-align: right;
      margin-bottom: 1.2rem;
      z-index: 1;
    }
  }
}

.footerNav {
  text-align: right;

  li {
    padding-bottom: 1rem;
  }
}

.navLink {
  position: relative;
  font-size: 1.8rem;
  color: var(--color-white);

  &:before, &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-image: var(--gradient-rainbow);
  }

  &:before {
    opacity: 0;
    transform: translateY(-8px);
    transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s;
  }

  &:after {
    opacity: 0;
    transform: translateY(4px);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
  }

  &:hover:before, &:hover:after {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover:before, &:focus:before {
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
  }

  &:hover:after, &:focus:after {
    transition: transform 0s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s 0.2s;
  }
}

.logoFooter {
  width: 12rem;
  position: absolute;
  top: 2rem;
  left: 2rem;
}
</style>
