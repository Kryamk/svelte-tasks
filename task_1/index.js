import {encoded, translations} from './data.js'

console.log("Let's rock");

const excludeKeys = ['groupId'];

function decode(encodeArr, excludeKeysArr = excludeKeys, translationsObj = translations) {
	const decoded = encodeArr.map(obj => {
		const decodedItem = {};

		Object.entries(obj).forEach(([key, value]) => {
			if (!excludeKeysArr.includes(key) && key.endsWith('Id') && Object.hasOwn(translationsObj, value)) {
				decodedItem[key] = translationsObj[value];
			}
			else {
				decodedItem[key] = value;
			}
		})

		return decodedItem;
	})
	return decoded;
}

const decoded = decode(encoded);

console.log('encoded:', encoded);
console.log('translations:', translations);
console.log('decoded:', decoded);
