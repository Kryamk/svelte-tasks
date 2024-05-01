<script lang="ts">
	export let currencyOptions: { code: string; name: string }[];
	export let selectedCurrency: string;
	export let onChangeCurrency: (event: Event) => void;
	export let onChangeAmount: (event: Event) => void;
	export let amount: number;
</script>

<div>
	<input
		type="number"
		class="input"
		value={amount}
		on:input={onChangeAmount}
		min="0"
	/>

	<select bind:value={selectedCurrency} on:change={onChangeCurrency}>
		{#each currencyOptions as option}
			<option value={option.code}>{option.code} - {option.name}</option>
		{/each}
	</select>
</div>

<style>
	input,
	select {
		max-width: 100%;
		border: 2px solid #4caf50;
		border-radius: 5px;
		padding: 10px;
		transition: all 0.2s;
	}

	.input:focus,
	select:focus {
		border-color: #388e3c;
		outline: none;
	}
</style>
