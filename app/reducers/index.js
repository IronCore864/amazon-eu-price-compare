import { combineReducers } from 'redux'
import { RECEIVE_CURRENCY_RATE, RECEIVE_CURRENT_PAGE_PRICE, RECEIVE_COUNTRY_PRICE } from '../actions'

const rate = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_CURRENCY_RATE:
			var rate = {}
			rate[`${action.fromCurrency}${action.toCurrency}`] = action.rate
			return Object.assign({}, state, rate)
		default:
			return state
	}
}

const price = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_CURRENT_PAGE_PRICE:
			return [...state, {country: action.country, price: action.price, current: true}]
		case RECEIVE_COUNTRY_PRICE:
			return [...state, {country: action.country, price: action.price, url: action.url}]
		default:
			return state
	}
}

const amazonEUPriceCompareApp = combineReducers({
	rate,
	price
})

export default amazonEUPriceCompareApp
