import * as amzUtil from "../util/AmazonUtils"

export const RECEIVE_CURRENCY_RATE = 'RECEIVE_CURRENCY_RATE'
export const RECEIVE_CURRENT_PAGE_PRICE = 'RECEIVE_CURRENT_PAGE_PRICE'
export const RECEIVE_COUNTRY_PRICE = 'RECEIVE_COUNTRY_PRICE'
export const RECEIVE_COUNTRY_RANK = 'RECEIVE_COUNTRY_RANK'
export const RECEIVE_OPTIONS = 'RECEIVE_OPTIONS'

export function receiveCurrencyRate(fromCurrency, toCurrency, rate) {
	return {
		type: RECEIVE_CURRENCY_RATE,
		fromCurrency,
		toCurrency,
		rate
	}
}

export function receiveCurrentPagePrice(country, price) {
	return {
		type: RECEIVE_CURRENT_PAGE_PRICE,
		country,
		price
	}
}

export function receiveCountryPrice(country, price, url) {
	return {
		type: RECEIVE_COUNTRY_PRICE,
		country,
		price,
		url
	}
}

export function receiveCountryRank(country, rank) {
	return {
		type: RECEIVE_COUNTRY_RANK,
		country,
		rank
	}
}

export function receiveOptions(items) {
	return {
		type: RECEIVE_OPTIONS,
		items
	}
}

// async action
export function getCurrentPageUrl() {
	return (dispatch, getState) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var country = amzUtil.getCountryFromAmazonProductPageUrl(tabs[0].url)
			var productID = amzUtil.getProductIDFromAmazonProductPageUrl(tabs[0].url)
			if (productID === null) {
				return
			}
			chrome.tabs.sendMessage(tabs[0].id, {"message": "get_current_page_info"}, function(results) {
				if (results === null || results[0] === null) {
					return
				}
				dispatch(receiveCurrentPagePrice(country, results[0]))
				if (results.length > 1) {
					dispatch(receiveCountryRank(country, results[1]))	
				}
			})
			var all_countries = ['uk', 'de', 'fr', 'es', 'it', 'nl']
			var currentCountry = [country]
			var countriesToSearch = all_countries.filter(x => currentCountry.indexOf(x) < 0 )
			for (var i = 0; i < countriesToSearch.length; i ++){
				dispatch(getCountryPrice(productID, countriesToSearch[i]))
			}
		})
	}
}

// async action
export function getOptions() {
	return (dispatch, getState) => {
		chrome.storage.sync.get({
			showRanks: false
		}, function(items) {
			dispatch(receiveOptions(items))
		})
	}
}

// async action
export function getCurrencyRate(fromCurrency, toCurrency) {
	return (dispatch, getState) => {
		return fetch(
			`https://api.exchangeratesapi.io/latest?symbols=${toCurrency}&base=${fromCurrency}`,
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
		)
		.then((response) => response.json())
		.then((responseJson) => {
			var rate = responseJson.rates[toCurrency]
			dispatch(receiveCurrencyRate(fromCurrency, toCurrency, rate))
		})
		.catch(function(err) {
		})
	}
}

export function getCountryPrice(productID, country) {
	return (dispatch, getState) => {
		var url = amzUtil.generateAmazonProductPageUrlForCountry(productID, country)
		return fetch(
			url,
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			}
		)
		.then((response) => {
			if(response.ok) {
				response.text().then(function(html) {
					var parser = new DOMParser()
					var doc = parser.parseFromString(html, "text/html")
					var price = amzUtil.getPriceFromAmazonProductDetailPage(doc)
					var rank = amzUtil.getRank(doc)
					if (price === null) {
						return
					}
					dispatch(receiveCountryPrice(country, price, url))
					dispatch(receiveCountryRank(country, rank))
				})
			} else {
				console.log(`Cannot find this item from amazon ${country}.`)
			}
		})
		.catch(function(err) {
			console.log('There has been a problem with fetching price for other amazon markets: ' + error.message)
		})
	}
}
