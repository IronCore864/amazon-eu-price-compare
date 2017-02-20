import React from "react"

export default class OptionsPageLink extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage()
		} else {
			window.open(chrome.runtime.getURL('options.html'))
		}
	}

	render() {
		return (
			<div className="optionslink">
				<a id="go-to-options" onClick={this.handleClick}>Go to Options</a>
			</div>
		)
	}
}
