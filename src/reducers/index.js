import { combineReducers } from 'redux'
import { RECEIVE_CURRENCY_RATE, RECEIVE_CURRENT_PAGE_PRICE, RECEIVE_COUNTRY_PRICE, RECEIVE_COUNTRY_RANK, RECEIVE_OPTIONS } from '../actions'

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
			var new_state = state.filter(obj => obj.country!==action.country)
			return [...new_state, {country: action.country, price: action.price, current: true}]
		case RECEIVE_COUNTRY_PRICE:
			var new_state = state.filter(obj => obj.country!==action.country)
			return [...new_state, {country: action.country, price: action.price, url: action.url}]
		default:
			return state
	}
}

const rank = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_COUNTRY_RANK:
			return Object.assign({}, state, {[action.country]: action.rank})
		default:
			return state
	}
}

const options = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_OPTIONS:
			return action.items
		default:
			return state
	}
}

const amazonEUPriceCompareApp = combineReducers({
	rate,
	price,
	rank,
	options
})

export default amazonEUPriceCompareApp
