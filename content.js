chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "get_current_page_price" ) {
      sendResponse(getPriceFromCurrentPage());
    }
  }
);

function getPriceFromCurrentPage(){
  var price = null;
  price = document.getElementById("priceblock_dealprice");
  if (price != null) {
    price = price.innerHTML;
  } else {
    price = document.getElementById("priceblock_ourprice");
    if (price != null) {
      price = price.innerHTML;
    }
  }
  return price;
}
