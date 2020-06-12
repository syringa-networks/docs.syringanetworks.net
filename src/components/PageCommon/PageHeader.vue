<template>
	<div :class="$style.containerFull">
		<header :class="$style.pageHeader">
			<div :class="$style.container">
				<figure :class="$style.figurIne">
					<div :class="$style.cubeWrap">
						<div :class="$style.inner">
							<div :class="[$style.cube, { [$style.isRed]: isRed }]">
								<div :class="[$style.cubeSide, $style.top]"></div>
								<div :class="[$style.cubeSide, $style.bottom]"></div>
								<div :class="[$style.cubeSide, $style.left]"></div>
								<div :class="[$style.cubeSide, $style.right]"></div>
								<div :class="[$style.cubeSide, $style.front]"></div>
								<div :class="[$style.cubeSide, $style.back]"></div>
							</div>
						</div>
						<div :class="[$style.cubeShadow, { [$style.isRedShadow]: isRedShadow }]"></div>
					</div>
				</figure>
				<div :class="$style.heading">
					<h1 :class="$style.h1">
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

<script>
export default {
	props: {
		isRed: Boolean,
		isRedShadow: Boolean
	}
};
</script>

<style lang="stylus" module>
.h1 {
  display: inline-block;
  background-image: var(--gradient-rainbow);
  background-size: cover;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  font-size: 5.3rem;
  margin-bottom: 1.2rem;
}

.containerFull {
  max-width: 100%;
}

.pageHeader {
  padding-top: 10rem;
  padding-bottom: 9rem;
}

.container {
  display: flex;
  max-width: 115rem;
  width: 94%;
  margin-left: auto;
  margin-right: auto;
}

.heading {
  margin-left: 3rem;
}

.figurIne {
  margin-right: 6px;
  margin-top: 6px;
}

.cubeWrap {
  position: relative;
  width: 5.8rem;
  height: 5.8rem;
  transform-style: preserve-3d;
  transform: translateY(0) rotateX(-33.5deg) rotateY(45deg);
  margin-left: 20px;
  z-index: 1;

  .inner {
    transform-style: preserve-3d;
    animation: hoverY 2s infinite alternate;
    animation-timing-function: ease-in-out;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
}

.cube {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  animation: flipY 5.2s infinite;
  display: inline-block;

  .cubeSide {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    border: 2px solid #0099ae;
    border-image: linear-gradient(to top, var(--color-orange-5), var(--color-orange-5)) 1 3%;
    transform: translate3d(0, 0, 0);
    transform-style: preserve-3d;
    backface-visibility: hidden;

    &.front {
      transform: translate3d(0, 0, 20px);
      border-right-width: 5px;
      border-bottom-width: 5px;
      animation: border-front 5.2s infinite;
      animation-fill-mode: forwards;
    }

    &.back {
      transform: rotateY(180deg) translate3d(0, 0, 20px);
      animation: border-back 5.2s infinite;
      animation-fill-mode: forwards;
    }

    &.top {
      transform: rotatex(90deg) translate3d(0, 0, 20px);
      border-top-width: 5px;
      border-right-width: 5px;
      animation: border-top 5.2s infinite;
      animation-fill-mode: forwards;
      border-left-color: var(--color-orange-5);
      border-image: none;
      border-color: var(--color-orange-5);

      @media (min-width: 768px) {
        transform: rotatex(90deg) translate3d(0, 0, 20px) scale(1.02);
        border-radius: 2px;
      }
    }

    &.bottom {
      transform: rotatex(-90deg) translate3d(0, 0, 20px);
      border-image: linear-gradient(to right, var(--color-orange-5), var(--color-orange-5)) 1 3%;
    }

    &.left {
      transform: rotateY(-90deg) translate3d(0, 0, 20px);
      border-left-width: 5px;
      border-bottom-width: 5px;
      animation: border-left 5.2s infinite;
      animation-fill-mode: forwards;
      border-color: var(--color-orange-5);
      border-image: linear-gradient(to right, var(--color-orange-5), var(--color-orange-5)) 1 3%;
    }

    &.right {
      transform: rotateY(90deg) translate3d(0, 0, 20px);
      border-image: linear-gradient(to right, var(--color-orange-5), var(--color-orange-5)) 1 3%;
    }
  }

  &.isRed {
    .cubeSide {
      border-image: linear-gradient(to top, var(--color-orange-5), var(--color-orange-5)) 1 3%;

      &.top {
        border-image: none;
        border-color: var(--color-orange-5);
      }

      &.bottom {
        border-image: linear-gradient(to right, var(--color-orange-5), var(--color-orange-5)) 1 3%;
      }

      &.left {
        border-image: linear-gradient(to bottom, var(--color-orange-5), var(--color-orange-5)) 1 3%;
      }

      &.right {
        border-image: linear-gradient(to bottom, var(--color-orange-5), var(--color-orange-5)) 1 3%;
      }
    }
  }
}

.cubeShadow {
  display: inline-block;
  transform-style: preserve-3d;
  width: 40px;
  height: 40px;
  margin-top: -80px;
  transform: translatex(-50%) rotatex(-90deg) translatez(110px);
  animation: flipY-outterShadow 5.2s infinite;

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: rgba(247, 92, 3 0.5);
    animation: scaleBigShadow 2s infinite alternate;
    animation-timing-function: ease-in-out;
    box-shadow: 0px 0px 45px 35px rgba(247, 92, 3 0.5);
    transform-origin: center center;
    transform: scale3d(0.8, 0.8, 0.8);

    &:.isRedShadow {
      background-color: rgba(193, 63, 33 0.5);
      box-shadow: 0px 0px 45px 35px rgba(193, 63, 33 0.5);
    }
  }
}

@keyframes flipY {
  0% {
    transform: translateX(-50%) scale3d(1, 1, 1) rotatex(0deg) rotatey(0deg) rotatez(0deg);
  }

  20.25% {
    transform: translateX(-50%) scale3d(1, 1, 1) rotatex(0deg) rotatey(90deg) rotatez(0deg);
  }

  100% {
    transform: translateX(-50%) scale3d(1, 1, 1) rotatex(0deg) rotatey(90deg) rotatez(0deg);
  }
}

@keyframes flipY-innerCube {
  0% {
    transform: translateX(-50%) scale3d(0.5, 0.5, 0.5) rotatex(0deg) rotatey(0deg) rotatez(0deg);
  }

  20.25% {
    transform: translateX(-50%) scale3d(0.5, 0.5, 0.5) rotatex(0deg) rotatey(-90deg) rotatez(0deg);
  }

  100% {
    transform: translateX(-50%) scale3d(0.5, 0.5, 0.5) rotatex(0deg) rotatey(-90deg) rotatez(0deg);
  }
}

@keyframes flipY-innerShadow {
  0% {
    transform: translatex(-50%) rotatex(-90deg) translatez(-20px) rotatez(0deg);
  }

  20.25% {
    transform: translatex(-50%) rotatex(-90deg) translatez(-20px) rotatez(-90deg);
  }

  100% {
    transform: translatex(-50%) rotatex(-90deg) translatez(-20px) rotatez(-90deg);
  }
}

@keyframes flipY-outterShadow {
  0% {
    transform: translatex(-50%) rotatex(-90deg) translatez(105px) rotatez(0deg);
  }

  20.25% {
    transform: translatex(-50%) rotatex(-90deg) translatez(105px) rotatez(90deg);
  }

  100% {
    transform: translatex(-50%) rotatex(-90deg) translatez(105px) rotatez(90deg);
  }
}

@keyframes border-front {
  0% {
    border-width: 3px 5px 5px 3px;
  }

  2.25% {
    border-width: 3px 5px 5px 3px;
  }

  5.75% {
    border-width: 3px 3px 3px 3px;
  }

  100% {
    border-width: 3px 3px 3px 3px;
  }
}

@keyframes border-back {
  0% {
    border-width: 3px 3px 3px 3px;
  }

  2.25% {
    border-width: 3px 3px 3px 3px;
  }

  5.75% {
    border-width: 3px 3px 5px 5px;
  }

  100% {
    border-width: 3px 3px 5px 5px;
  }
}

@keyframes border-top {
  0% {
    border-width: 5px 5px 3px 3px;
  }

  2.25% {
    border-width: 5px 5px 3px 3px;
  }

  5.75% {
    border-width: 3px 5px 5px 3px;
  }

  100% {
    border-width: 3px 5px 5px 3px;
  }
}

@keyframes border-left {
  0% {
    border-width: 3px 3px 5px 5px;
  }

  2.25% {
    border-width: 3px 3px 5px 5px;
  }

  5.75% {
    border-width: 3px 5px 5px 3px;
  }

  100% {
    border-width: 3px 5px 5px 3px;
  }
}

@keyframes hoverY {
  0% {
    transform: translatey(0px);
  }

  100% {
    transform: translatey(-10px);
  }
}

@keyframes scaleBigShadow {
  0% {
    transform: scale3d(0.65, 0.65, 0.65);
  }

  100% {
    transform: scale3d(0.6, 0.6, 0.6);
  }
}
</style>
