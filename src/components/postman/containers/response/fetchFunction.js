import GetData from './testCollection/GetData';
import fetchData from './testCollection/FetchData';
const fetchFunction = async (method, headers, url, bodyFormOrUrlData) => {
	let myHeaders = null;
	// console.log(headers);
	if (headers.length > 0) {
		myHeaders = new Headers();
		headers.map((headers) => {
			myHeaders.append(headers.key, headers.value);
		});
	}
	let newUrl = url;
	if (url.search('https://') === -1) {
		newUrl = `https://${this.props.url}`;
	}
	try {
		let data;
		if (method === 'GET') {
			data = await GetData(`${newUrl}`, method, myHeaders);
		} else {
			data = await fetchData(`${newUrl}`, bodyFormOrUrlData, method, myHeaders);
		}
		return data;
	} catch (error) {
		let errorJson = {
			Error: `${error}, Message : ${error.message}`
		};
		return errorJson;
	}
};

export default fetchFunction;
