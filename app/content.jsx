import * as amzUtil from "./amazon_utils.js"

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "get_current_page_price" ) {
      sendResponse(amzUtil.getPriceFromAmazonProductDetailPage(document));
    }
  }
);
