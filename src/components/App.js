import React from 'react'
import PriceListContainer from '../containers/PriceListContainer'
import OptionsPageLink from '../components/OptionsPageLink'

class App extends React.Component {
	render() {
		return (
			<div>
			<PriceListContainer />
			<OptionsPageLink />
			</div>
		)
	}
}

export default App
