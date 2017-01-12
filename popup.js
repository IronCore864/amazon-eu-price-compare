function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}

function getProductID(url) {
  var re = /amazon.*\/([A-Z0-9]{10})\//;
  var match = re.exec(url);
  if(url.match(re)){
    return match[1];
  }
  else {
    return null;
  }
}

function getCountry(url) {
  var re = /amazon(\.co)*\.(uk|fr|de|it|es)/;
  var match = re.exec(url);
  if(url.match(re)){
    return match[2];
  }
  else {
    return null;
  }
}

function generateSearchUrl(productID, country) {
  var searchUrlPrefix = 'https://www.amazon.';
  var countryDomain = country.toLowerCase();
  if (countryDomain === 'uk') {
    countryDomain = 'co.uk';
  }
  var searchUrlSuffix = '/dp/';
  return searchUrlPrefix + countryDomain + searchUrlSuffix + productID + '/';
}

function getCountryPrice(productID, country, callback, errorCallback) {
  var url = generateSearchUrl(productID, country);
  var xhr = new XMLHttpRequest();
  xhr.responseType = "document";
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var price = null;
      price = xhr.responseXML.getElementById("priceblock_dealprice");
      if (price != null) {
        price = price.innerHTML;
      } else {
        price = xhr.responseXML.getElementById("priceblock_ourprice");
        if (price != null) {
          price = price.innerHTML;
        }
      }
      callback(country, price, url);
    }
  }
  xhr.onerror = function() {
    errorCallback('Network error.');
  };
  xhr.send();
}

function renderUkPriceToEur(price, callback, errorCallback) {
  var url = "http://api.fixer.io/latest?symbols=GBP,EUR&base=GBP";
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      data = JSON.parse(xhr.responseText);
      ratio = data.rates.EUR;
      price = Number(price.replace(/[^0-9\.]+/g,""));
      price *= ratio;
      price = "EUR " + price.toFixed(2);
      callback(price);
    }
  }
  xhr.onerror = function() {
    errorCallback('Network error.');
  };
  xhr.send();
}

function renderStatus(country, price, url) {
  if (price == null) {
    return;
  }
  if (country === 'uk') {
    renderUkPriceToEur(price, function(price) {
      setContent('uk', price, url, ratio);
    }, function(errorMessage) {
      // renderStatus('Cannot get. ' + errorMessage);
    });
  } else {
    setContent(country, price, url);
  }
}

function setContent(country, price, url) {
  var res = document.getElementById('status').innerHTML;
  res = res + "<div>Amazon " + country.toUpperCase() + ": <a href=\"" + url + "\" target=\"_blank\">" + price + "</a></div>"
  document.getElementById('status').innerHTML = res;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var productID = getProductID(url);
    var country = getCountry(url);
    if (productID === null || country === null) {
      return;
    }

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"message": "get_current_page_price"}, function(response) {
        renderStatus(country, response, "");
      });
    });

    var countries = ['uk', 'de', 'fr', 'es', 'it'];
    var currentCountryList = [country];
    var countriesToSearch = countries.filter(x => currentCountryList.indexOf(x) < 0 );

    for (i=0;i<countriesToSearch.length;i++){
      getCountryPrice(productID, countriesToSearch[i], function(country, price, url) {
        renderStatus(country, price, url);
      }, function(errorMessage) {
        // renderStatus('Cannot get. ' + errorMessage);
      });
    }
  });
});

