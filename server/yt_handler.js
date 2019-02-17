
function qsToJson(queryString) {
	let res = {};
	let params = queryString.split("&");
	let keyValuePair, key, value;
	for (let i in params) {
		keyValuePair = params[i].split("=");
		key = keyValuePair[0];
		value = keyValuePair[1];
		res[key] = decodeURIComponent(value);
	}
	return res;
}


module.exports.qsToJson = qsToJson;