import React from "react"
import * as amzUtil from "./amazon_utils.js"

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      prices: []
    };

    // in case you clicked the button before the page is shown
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      if (changeInfo.status == "complete") {
        this.getCurrentPagePrice();
      }
    }.bind(this));
  }

  getCurrentPagePrice() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      chrome.tabs.sendMessage(tabs[0].id, {"message": "get_current_page_price"}, function(response) {
        if (response === null) {
          return;
        }
        function alreadyHasCountry(country, country_prices) {
          for (var i = 0; i < country_prices.length; i++) {
              if (country_prices[i].country === country) {
                  return true;
              }
          }
          return false;
        }
        var country = amzUtil.getCountryFromAmazonProductPageUrl(tabs[0].url).toUpperCase();
        if (alreadyHasCountry(country, this.state.prices)) {
          return;
        }
        this.setState({
          prices: this.state.prices.concat({
            country: country,
            price: response,
          })
        });
      }.bind(this));
    }.bind(this));
  }

  setPrice(productID, country, price, url) {
    if (country != 'uk') {
      this.setState({
        prices: this.state.prices.concat({
          country: country.toUpperCase(),
          price: price,
          url: url
        })
      });
    } else {
      fetch('https://api.fixer.io/latest?symbols=GBP,EUR&base=GBP', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var rate = responseJson.rates.EUR;
        price *= rate;
        this.setState({
          prices: this.state.prices.concat({
            country: country.toUpperCase(),
            price: price.toFixed(2),
            url: url
          })
        });
      })
      .catch(function(err) {
      });
    }
  }

  getCountryPrice(productID, country) {
    var url = amzUtil.generateAmazonProductPageUrlForCountry(productID, country);

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if(response.ok) {
        response.text().then(function(html) {
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          var price = amzUtil.getPriceFromAmazonProductDetailPage(doc);
          if (price === null) {
            return;
          }
          this.setPrice(productID, country, price, url);
        }.bind(this));
      } else {
        console.log('Network response was not ok.');
      }
    })
    .catch(function(err) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }
  
  getOtherAmazonMarketsPrices() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var url = tabs[0].url;
      var productID = amzUtil.getProductIDFromAmazonProductPageUrl(url);
      var country = amzUtil.getCountryFromAmazonProductPageUrl(url);
      if (productID === null || country === null) {
        return;
      }
      var countries = ['uk', 'de', 'fr', 'es', 'it'];
      var currentCountryList = [country];
      var countriesToSearch = countries.filter(x => currentCountryList.indexOf(x) < 0 );
      for (var i = 0; i < countriesToSearch.length; i ++){
        this.getCountryPrice(productID, countriesToSearch[i]);
      }
    }.bind(this));
  }

  componentDidMount() {
    this.getCurrentPagePrice();
    this.getOtherAmazonMarketsPrices();
  }

  render() {
    var prices = this.state.prices.sort(function(a, b){
        return a.price - b.price;
    });

    const price_list = prices.map(function(amz) {
      return (
        <tr key={amz.country}>
          <td className="amazon">Amazon</td>
          <td className="country">{amz.country}</td>
          <td className="price"><a href={amz.url} target="_blank">EUR {amz.price}</a></td>
        </tr>
      )
    });

    return (
      <div className="app">
        <table className="pricelist">
          <tbody>
            {price_list}
          </tbody>
        </table>
      </div>
    )
  }
}
