<template>
	<div>
		<div :class="$style.inputFlex">
			<div v-for="input in inputs" :key="input.id">
				<h6 :class="$style.h6">{{ input.name }}</h6>
				<input
					:class="$style.input"
					v-model="input.vmodel"
				/>
			</div>
		</div>
		<pre>
      <code>
  customer name <span>{{ customerName }}</span>
  hostname <span>{{ hostName }}</span>
      </code>
    </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const customerName = 'customer Name';
		const hostName = 'host Name';

		const inputs = [
			{
				id: 0,
				name: 'Customer Name',
				vmodel: customerName
			},
			{ id: 1, name: 'Router Hostname', vmodel: hostName }
		];

		return {
			inputs,
			customerName,
			hostName
		};
	},
	computed: {
		customerName() {
			return this.inputs[0].vmodel;
		},
		hostName() {
			return this.inputs[1].vmodel;
		}
	}
};
</script>

<style lang="stylus" module>
.h3 {
  padding: 4rem;
  margin-top: -3rem;
  color: var(--color-white);
  background-image: var(--gradient-rainbow);
}

.inputFlex {
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  border: 2px solid var(--color-orange-5);
  margin-bottom: 2rem;

  div {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .h6 {
    font-family: 'Source Code Pro';
    text-transform: none;
    color: var(--color-orange-5);
    font-weight: 400;
    letter-spacing: 0.25px;
    font-size: 16px;
  }

  input {
    width: 35%;
  }
}

.input {
  color: rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  border: 1px solid var(--color-orange-5);
  padding: 1rem;
  margin-bottom: 1rem;

  &:focus {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}

.select {
  appearance: none;
  background: url('~@/assets/img/ArrowDown.svg') 92% / 8% no-repeat;
  color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--color-orange-5);
  margin-left: 1rem;
  padding: 1rem;
  padding-right: 6rem;

  &:focus, &:active {
    color: rgba(0, 0, 0, 0.8);
    outline: none;
  }
}
</style>
