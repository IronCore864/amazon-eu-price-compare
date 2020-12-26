import PriceList from '../components/PriceList'
import { connect } from 'react-redux'
import { getCurrentPageUrl, getCurrencyRate, getOptions } from '../actions'

const mapStateToProps = (state) => {
	return {
		rate: state.rate,
		price: state.price,
		rank: state.rank,
		options: state.options
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCurrentPageUrl: () => {
			dispatch(getCurrentPageUrl())
		},
		getCurrencyRate: () => {
			dispatch(getCurrencyRate('EUR', 'GBP'))
			dispatch(getCurrencyRate('GBP', 'EUR'))
			dispatch(getCurrencyRate('SEK', 'EUR'))
			dispatch(getCurrencyRate('EUR', 'SEK'))
			dispatch(getCurrencyRate('SEK', 'GBP'))
			dispatch(getCurrencyRate('GBP', 'SEK'))
		},
		getOptions: () => {
			dispatch(getOptions())
		}
	}
}

const PriceListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PriceList)

export default PriceListContainer
