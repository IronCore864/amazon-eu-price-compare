export function getProductIDFromAmazonProductPageUrl(url) {
	var re = /amazon.*\/([A-Z0-9]{10})(\/|\?|$)/
	var match = re.exec(url)
	if (url.match(re)) {
		return match[1]
	}
	else {
		return null
	}
}

export function getCountryFromAmazonProductPageUrl(url) {
	var re = /amazon(\.co)*\.(uk|fr|de|it|es|nl|se)/
	var match = re.exec(url)
	if (url.match(re)) {
		return match[2]
	}
	else {
		return null
	}
}

export function generateAmazonProductPageUrlForCountry(productID, country) {
	var searchUrlPrefix = 'https://www.amazon.'
	var countryDomain = country.toLowerCase();
	if (countryDomain === 'uk') {
		countryDomain = 'co.uk'
	}
	var searchUrlSuffix = '/dp/'
	return searchUrlPrefix + countryDomain + searchUrlSuffix + productID + '/'
}

function damnYouEuropeanNumbers(price) {
	// DAMN IT. THIS IS WHY EUROPE SHOULD BE A COUNTRY INSTEAD OF A UNION.
	return price.replace(/[^0-9.,]+/, '').replace(/,/, '').replace(/\./, '')
}

function getWholePrice(document) {
	var priceWhole = null

	// handle price before the point
	priceWhole = document.getElementsByClassName("a-price aok-align-center")
	if (priceWhole.length === 0) {
		return null
	}

	priceWhole = priceWhole[0].querySelector("[aria-hidden='true']").getElementsByClassName("a-price-whole")[0].innerText.replace(/(\r\n|\n|\r)/gm, "");
	if (priceWhole === null) {
		return null
	}

	return damnYouEuropeanNumbers(priceWhole)
}

function getFractionPrice(document) {
	var priceFraction = null

	// handle price after the point
	priceFraction = document.getElementsByClassName("a-price aok-align-center")
	if (priceFraction.length === 0) {
		return null
	}

	priceFraction = priceFraction[0].querySelector("[aria-hidden='true']").getElementsByClassName("a-price-fraction")[0].innerText.replace(/(\r\n|\n|\r)/gm, "");
	if (priceFraction === null) {
		return null
	}

	return damnYouEuropeanNumbers(priceFraction)
}

function getOldPrice(price) {
	price = price[0].querySelector("[aria-hidden='true']").innerText
	price = price.replace(/[^0-9.,]+/, '').replace(/,/, '.')
	return price
}

function getNewPrice(document) {
	var priceWhole = null
	priceWhole = getWholePrice(document)
	if (priceWhole === null) {
		return null
	}

	var priceFraction = null
	priceFraction = getFractionPrice(document)
	if (priceFraction === null) {
		return null
	}

	return priceWhole + '.' + priceFraction
}

export function getPriceFromAmazonProductDetailPage(document) {
	var price = null

	// old version
	price = document.getElementsByClassName("a-price a-text-price a-size-medium apexPriceToPay")

	if (price.length != 0) {
		// old version
		price = getOldPrice(price)
	} else {
		// new version after Feb 2022 but old version still exists
		// dammit Amazon!
		price = getNewPrice(document)
		if (price === null) {
			return null
		}
	}

	return parseFloat(price)
}

export function getRank(document) {
	var salesRankElement = document.getElementById("SalesRank")
	if (salesRankElement === null) {
		return null
	}
	var rank = salesRankElement.getElementsByClassName("value")[0]
	var rankText = ""
	if (rank !== undefined) {
		rankText = rank.childNodes[0].wholeText
	} else {
		rank = salesRankElement.childNodes[2]
		if (rank === undefined) {
			return null
		}
		rankText = rank.wholeText
	}
	return rankText.trim().split('(')[0].trim().replace('&amp;', '&')
}
