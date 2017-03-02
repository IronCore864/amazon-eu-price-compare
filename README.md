[Chrome Webstore](https://chrome.google.com/webstore/detail/amazon-eu-price-compare/iaakgomiepekffchlipoegcgahfcdbad)

# Find the Best Price in Amazon European Markets
OK. You want to buy something from Amazon in Europe and of course you want the best price.

I bet if you are a frequent Amazon user in Europe, you must have already known that among the european countries, Amazon has not only 1, but 5 different stores, which are: amazon.de, amazon.es, amazon.fr, amazon.it and amazon.co.uk.

And I think you are no stranger to the fact that most of the time each item is sold on all of the 5 markets, and no matter which Amazon market you choose, it can be shipped within the EU area, however the price for the item differs, sometimes a lot.

So let me describe normally what you would do:

1. Open amazon.de (maybe uk, es, fr, it; depending on where you live, what's your native language, and your personal preferences)
2. Search the product you want
3. Copy the name of the product
4. Open 4 new browser tabs for amazon.es, amazon.it, amazon.fr, and amazon.co.uk
5. Paste the name you copied in step 3, to the 4 tabs you just opened and click search
6. Switching back and forth between all the tabs tor lowest price.

You probably see where I'm going with this, and yes you are right: it is annoying to do the samething 5 times everytime you want to search something on Amazon, which probably you won't even buy at last, even if you do, it may be something only cost something ninety-nine. It's really a waste of time and energy.

Well now you are saved.

This extension helps you to find the best price with just one click. You just go to any Amazon EU store, search your item, click the icon of this extension(a black letter B, which stands for the "B"est price of course) and it shows you the prices in all the other Amazon european stores, including automatically converting GBP to EUR.

Just a single click and you get the best price. No fuss, no muss.

# Known Issue
##### For CD category products, there is some possibility that the price cannot be fetched. Blame Amazon, not me, since it's them who created such inconsistent pages. I know how to fix it of course but I just couldn't be bothered. When I buy CD I alwasy go for Amazon UK anyway since I don't speak German, Italian, French or Spainish at all.

# DEV Info
Chrome extension with react and redux.

npm, babel and webpack needed for building.

### Build
npm run build

### Unpacked chrome extension dir
chrome-extension

# Version 1.3.2 Updates:
- Fix bug about some amazon URL analyzing

# Version 1.3.1 Updates:
- Fix bug when a product doesn't has main category rank

# Version 1.3.0 Updates:
- Add options page
- Add product rank. By default it's not shown. Can be enabled in options page. Only main category rank is shown.

# Version 1.2.1 Updates:
- If you are visiting Amazon UK, prices are shown in both EUR and GBP (Thanks to UK user Richard Burgess's suggestion).
- Minor bug fix, like if you're not visiting amazon product page, corresponding message is shown instead of a blank page.
- Code refactor, to use redux to separate model and view.
