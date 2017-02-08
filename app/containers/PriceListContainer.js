import PriceList from '../components/PriceList'
import { connect } from 'react-redux'
import { getCurrentPageUrl, getCurrencyRate } from '../actions'

const mapStateToProps = (state) => {
	return {
		rate: state.rate,
		price: state.price
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
		},
		//dispatch
	}
}

const PriceListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(PriceList)

export default PriceListContainer
