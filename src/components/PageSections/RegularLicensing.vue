<template>
	<div>
		<h3 :class="$style.h3">
			Licensing Configuration for Not so Smart Accounts
		</h3>
		<div :class="$style.inputFlex">
			<div>
				<h6 :class="$style.h6">License Level</h6>
				<input
					:class="$style.input"
					v-model="licenseLevel"
				/>
			</div>
		</div>
		<pre>
            <code>
  license accept end user agreement
  license boot level <span>{{ licenseLevel }}</span>
  !
  exit
  !
  license right-to-use move <span>{{ licenseLevel }}</span>
  !
  end
  !
  wr
  reload
        </code>
        </pre>
	</div>
</template>

<script>
export default {
	setup() {
		const licenseLevel = 'securityk9';

		return { licenseLevel };
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
</style>
