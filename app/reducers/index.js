import { combineReducers } from 'redux'
import { RECEIVE_CURRENCY_RATE } from '../actions'

const rate = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_CURRENCY_RATE:
		 	return Object.assign({}, state, {action.base: action.rate})
		default:
			return state
	}
}

const filterText = (state = '', action) => {
	switch (action.type) {
		case SET_FILTER_TEXT:
			return action.text
		default:
			return state
	}
}

const parterMtWinApp = combineReducers({
	partners,
	filterText
})

export default amazonEUPriceCompareApp
