export function validateInputValue(value: string): number {
	let parsed = parseFloat(value)
	if (isNaN(parsed)) {
		return 0;
	}
	if (parsed < 0) {
		return Math.abs(parsed);
	}
	return parsed;
}
