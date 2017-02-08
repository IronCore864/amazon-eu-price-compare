import * as amzUtil from "../tools/amazon_utils"

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "get_current_page_price" ) {
      sendResponse(amzUtil.getPriceFromAmazonProductDetailPage(document))
    }
  }
)
