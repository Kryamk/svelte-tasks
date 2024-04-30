import { encoded, translations } from './data.js'

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

function getUniqueIds(idArr, excludeKeysArr = excludeKeys) {
	const uniqueIds = new Set();

	idArr.forEach((obj) => {
		Object.entries(obj).forEach(([key, value]) => {
			if (!excludeKeysArr.includes(key) && key.endsWith('Id')) {
				if (value) {
					uniqueIds.add(value);
				}
			}
		})
	});

	return [...uniqueIds];
}

const decoded = decode(encoded);
console.log('encoded:', encoded);
console.log('translations:', translations);
console.log('decoded:', decoded);

const uniqueIds = getUniqueIds(encoded);
console.log('uniqueIds:', uniqueIds.sort((a, b) => a - b));


/* Report uniqueIds */
const translationKeys = Object.keys(translations);

const allIds = Array.from(new Set([...uniqueIds, ...translationKeys]));

const reportIds = allIds.map(id => ({
	id,
	inUniqueIds: uniqueIds.includes(id),
	inTranslations: translationKeys.includes(id),
}));

const reportIdsDifference = reportIds.filter(item => item.inUniqueIds !== item.inTranslations);

console.log('reportIds', reportIds);
console.log('reportIdsDifference', reportIdsDifference);
