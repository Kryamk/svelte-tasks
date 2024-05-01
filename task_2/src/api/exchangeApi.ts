import { API_KEY } from '../config.js';
export const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const importantCurrencies = ["USD", "EUR", "RUB", "JPY"];

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

export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
	try {
		const response = await fetch(`${BASE_URL}/pair/${fromCurrency}/${toCurrency}`);
		const data = await response.json();

		return data.conversion_rate;
	} catch (error) {
		console.error("Ошибка при получении обменного курса:", error);
		return 0;
	}

}
