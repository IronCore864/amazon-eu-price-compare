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
		getCurrencyRate: () => dispatch(getCurrencyRate()),
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
