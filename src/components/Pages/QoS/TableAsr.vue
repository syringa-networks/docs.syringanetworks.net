<template>
	<table :class="$style.table">
		<thead>
			<tr>
				<th>{{ cosExp }}</th>
				<th>{{ priority }}</th>
				<th>{{ percentOfBandwidth }}</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>7</td>
				<td>Priority 1, Policed at 10%</td>
				<td>Network Control Traffic</td>
			</tr>
			<tr>
				<td>6</td>
				<td>Priority 1, Policed at 10%</td>
				<td>Network Control Traffic</td>
			</tr>
			<tr>
				<td>5</td>
				<td>Priority 2</td>
				<td>Carrier/Voice</td>
			</tr>
			<tr>
				<td>4</td>
				<td>Priority 3</td>
				<td>Enterprise Realtime Data(Voice, Video, etc)</td>
			</tr>
			<tr>
				<td>3</td>
				<td>Priority 3</td>
				<td>Enterprise Critical Data</td>
			</tr>
			<tr>
				<td>2</td>
				<td>Priority 3</td>
				<td>Enterprise Transactional and Bulk Data</td>
			</tr>
			<tr>
				<td>1</td>
				<td>Priority 3</td>
				<td>Enterprise Best Effort</td>
			</tr>
			<tr>
				<td>0</td>
				<td>1%</td>
				<td>Internet</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	setup() {
		const cosExp = 'COS/EXP';
		const priority = 'Priority';
		const percentOfBandwidth = 'Percent of Bandwidth';

		return { cosExp, priority, percentOfBandwidth };
	}
};
</script>

<style lang="stylus" module>
.table {
  position: relative;
  color: var(--color-dark);
  border: 3px solid var(--color-dark);
  border-radius: 4px;
  width: 100%;
  text-align: left;
  padding: 4rem;
  margin-bottom: 3rem;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 1rem;
    display: block;
    width: 100%;
    height: 3px;
    background: var(--color-dark);
  }
}
</style>
