const fetch = require('node-fetch');
const {
	createStore,
	applyMiddleware,
	combineReducers,
	bindActionCreators,
} = require('redux');

const STATUS = {
	PENDING: 'PENDING',
	RESOLVED: 'RESOLVED',
	REJECTED: 'REJECTED'
};

const TYPE = {
	FETCH_TIME: 'FETCH_TIME',
	FETCH_DATE: 'FETCH_DATE'
};

const actions = {
	fetchTime: () => ({
		type: TYPE.FETCH_TIME,
		value: async() => {
			const time = await fetch(
				'http://localhost:1337/time'
			).then((res) => res.text());
			return time;
		}
	}),
	fetchDate: () => ({
		type: TYPE.FETCH_DATE,
		value: async() => {
			const date = await fetch(
				'http://localhost:1337/date'
			).then((res) => res.text());
			return date;
		}
	}),
	setTime: (time) => ({
		type: TYPE.FETCH_TIME,
		value: time
	})
};

