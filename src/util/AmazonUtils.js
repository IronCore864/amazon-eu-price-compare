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

export function getPriceFromAmazonProductDetailPage(doc) {
	var price = null
	price = doc.getElementsByClassName("a-price a-text-price a-size-medium apexPriceToPay")[0].querySelector("[aria-hidden='true']").innerText
	if (price === null) {
		return null
	}
	price = price.replace(/[^0-9.,]+/, '').replace(/,/, '.')
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
