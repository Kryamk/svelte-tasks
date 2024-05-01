import { API_KEY } from '../config.js';
export const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const importantCurrencies = ["USD", "EUR", "RUB", "JPY"];
let conversionRates: { [key: string]: number } = {};

export async function fetchConversionRates(): Promise<void> {
	try {
		const response = await fetch(`${BASE_URL}/latest/USD`);

		if (!response.ok) {
			throw new Error(`Ошибка запроса: ${response.status}`);
		}

		const data = await response.json();
		conversionRates = data.conversion_rates;
	} catch (error) {
		console.error("Ошибка при получении данных о конвертации:", error);
	}
}


function sortCurrencyOptions(currencies: { code: string, name: string }[]): { code: string, name: string }[] {
	const importantOptions = currencies.filter(item => importantCurrencies.includes(item.code));
	const remainingOptions = currencies.filter(item => !importantCurrencies.includes(item.code));

	return [...importantOptions, ...remainingOptions]
}

export async function getCurrencyOptions(): Promise<{ code: string, name: string }[]> {
	try {
		const response = await fetch(`${BASE_URL}/codes`);

		if (!response.ok) {
			throw new Error(`Ошибка запроса: ${response.status}`);
		}
		const data = await response.json();

		const uniqueCurrencies = data.supported_codes.map(([code, name]: [string, string]) => ({
			code,
			name,
		}));

		return sortCurrencyOptions(uniqueCurrencies);
	} catch (error) {
		console.error("Ошибка при получении кодов валют:", error);
		return [];
	}
}

export function getExchangeRate(fromCurrency: string, toCurrency: string): number {
	const fromRate = conversionRates[fromCurrency];
	const toRate = conversionRates[toCurrency];

	if (!fromRate || !toRate) {
		console.error("Не удается найти курс обмена для одной или обеих валют.");
		return 0;
	}

	return toRate / fromRate;
}
