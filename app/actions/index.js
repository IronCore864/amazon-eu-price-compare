import * as amzUtil from "../util/AmazonUtils"

export const RECEIVE_CURRENCY_RATE = 'RECEIVE_CURRENCY_RATE'
export const RECEIVE_CURRENT_PAGE_PRICE = 'RECEIVE_CURRENT_PAGE_PRICE'
export const RECEIVE_COUNTRY_PRICE = 'RECEIVE_COUNTRY_PRICE'

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

// async action
export function getCurrentPageUrl() {
	return (dispatch, getState) => {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var country = amzUtil.getCountryFromAmazonProductPageUrl(tabs[0].url)
			var productID = amzUtil.getProductIDFromAmazonProductPageUrl(tabs[0].url)
			chrome.tabs.sendMessage(tabs[0].id, {"message": "get_current_page_price"}, function(price) {
				dispatch(receiveCurrentPagePrice(country, price))
			})
			var all_countries = ['uk', 'de', 'fr', 'es', 'it']
			var currentCountry = [country]
			var countriesToSearch = all_countries.filter(x => currentCountry.indexOf(x) < 0 )
			for (var i = 0; i < countriesToSearch.length; i ++){
				dispatch(getCountryPrice(productID, countriesToSearch[i]))
			}
		})
	}
}

// async action
export function getCurrencyRate(fromCurrency, toCurrency) {
	return (dispatch, getState) => {
		return fetch(
			`https://api.fixer.io/latest?symbols=GBP,EUR&base=${fromCurrency}`,
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
			var rate = responseJson.rates[toCurrency]
			dispatch(receiveCurrencyRate(fromCurrency, toCurrency, rate))
		})
		.catch(function(err) {
		})
	}
}

export function getCountryPrice(productID, country) {
	return (dispatch, getState) => {
		var url = amzUtil.generateAmazonProductPageUrlForCountry(productID, country);
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
					if (price === null) {
						return
					}
					dispatch(receiveCountryPrice(country, price, url))
				})
			} else {
				console.log('Network response was not ok.');
			}
		})
		.catch(function(err) {
			console.log('There has been a problem with fetching price for other amazon markets: ' + error.message);
		})
	}
}
