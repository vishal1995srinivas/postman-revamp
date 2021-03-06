import React from 'react';
import FetchFunction from '../fetchFunction';

async function Response(request) {
	try {
		console.log(request);
		if (request.method == 'GET') {
			let result = await FetchFunction(request.method, request.headers, request.url, null);
			return result;
		} else {
			let result = await FetchFunction(request.method, request.headers, request.url, request.bodyFormOrUrlData);
			return result;
		}
	} catch (error) {
		console.log(error);
	}
}
export default Response;
