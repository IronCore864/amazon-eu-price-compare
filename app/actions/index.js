export const RECEIVE_CURRENCY_RATE = 'RECEIVE_GBP_TO_EUR_RATE'

// asyc actions
export const REQUEST_CURRENCY_RATE = 'REQUEST_CURRENCY_RATE'

export function getCurrencyRate(base) {
	return (dispatch, getState) => {
		return fetch(
			'https://api.fixer.io/latest?symbols=GBP,EUR&base=${base}',
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
          			'Content-Type': 'application/json',
				}
			}
		)
		.then((response) => response.json())
      	.then((responseJson) => {
	        var rate = responseJson.rates[base]
	        dispatch(receiveCurrencyRate(base, rate))
      	})
      	.catch(function(err) {
      	})
	}
}

export function receiveCurrencyRate(base, rate) {
	return {
		type: RECEIVE_GBP_TO_EUR_RATE,
		base,
		rate
	}
}
