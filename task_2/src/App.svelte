<script lang="ts">
	import { onMount } from "svelte";
	import CurrencyRow from "./lib/CurrencyRow.svelte";
	import { getCurrencyOptions, getExchangeRate } from "./api/exchangeApi";
	import { formatNumber } from "./utils/format";
	import LoadingWrapper from "./lib/LoadingWrapper.svelte";
	import { validateInputValue } from "./utils/validation";

	let currencyOptions: { code: string; name: string }[] = [];
	let fromCurrency = "USD";
	let toCurrency = "RUB";
	let exchangeRate: number | undefined;
	let fromAmount = 1;
	let toAmount = 1;
	let amountInFromCurrency = true;
	let isLoading = true;

	onMount(async () => {
		const start = Date.now();

		currencyOptions = await getCurrencyOptions();

		const duration = Date.now() - start;
		const delay = Math.max(1000 - duration, 0);

		setTimeout(() => {
			if (currencyOptions.length) {
				isLoading = false;
			}
		}, delay);
	});

	$: if (fromCurrency && toCurrency) {
		(async () => {
			exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
		})();
	}

	$: if (exchangeRate) {
		if (amountInFromCurrency) {
			toAmount = formatNumber(fromAmount * exchangeRate);
		} else {
			fromAmount = formatNumber(toAmount / exchangeRate);
		}
	}

	function handleFromAmountChange(event: Event) {
		const target = event.target as HTMLInputElement;
		
		let value = target.value;
		const validatedValue = validateInputValue(value);
		target.value = validatedValue.toString();
		
		fromAmount = validatedValue;
		amountInFromCurrency = true;
	}

	function handleToAmountChange(event: Event) {
		const target = event.target as HTMLInputElement;

		const value = target.value;
		const validatedValue = validateInputValue(value);
		target.value = validatedValue.toString();

		toAmount = validatedValue;
		amountInFromCurrency = false;
	}

	function handleCurrencyChange(event: Event, isFromCurrency: boolean) {
		const target = event.target as HTMLSelectElement;
		const newCurrency = target.value;

		if (isFromCurrency) {
			fromCurrency = newCurrency;
		} else {
			toCurrency = newCurrency;
		}
	}
</script>

<h1>Конвертер валют</h1>

<LoadingWrapper {isLoading}>
	<CurrencyRow
		{currencyOptions}
		selectedCurrency={fromCurrency}
		onChangeCurrency={(e) => handleCurrencyChange(e, true)}
		onChangeAmount={handleFromAmountChange}
		amount={fromAmount}
	/>

	<div class="equals">=</div>

	<CurrencyRow
		{currencyOptions}
		selectedCurrency={toCurrency}
		onChangeCurrency={(e) => handleCurrencyChange(e, false)}
		onChangeAmount={handleToAmountChange}
		amount={toAmount}
	/>
</LoadingWrapper>

<style>
	.equals {
		text-align: center;
		font-size: 2em;
		color: #4caf50;
		padding: 20px;
		font-weight: bold;
		text-shadow: 1px 1px 2px #388e3c;
	}
</style>
