# Find the Best Price in Amazon European Markets

This extension helps you to find the best price with just one click.

You just go to any Amazon EU store, search your item, click the icon of this extension(a black letter B, which stands for the "B"est price of course) and it shows you the prices in all the other Amazon European stores, including currency conversion (GBP/SEK).

## Download and Install

Please go to [Chrome Webstore](https://chrome.google.com/webstore/detail/amazon-eu-price-compare/iaakgomiepekffchlipoegcgahfcdbad).

Install now and be part of the 1874 proud user base (as of Dec 26th, 2020).

## Let Me Paint a Picture

OK. You live in Europe, and you want to buy something off Amazon. Of course, you want the best price.

If you are a frequent Amazon user living in Europe, chances are, you have already known the fact that among the European countries, Amazon has not only 1, but many different stores. At the time of Dec 2020, there are:

- amazon.de
- amazon.es
- amazon.fr
- amazon.it
- amazon.nl
- amazon.com.be
- amazon.co.uk
- amazon.se (newly launched on Oct 28, 2020)

And the number probably will still increase.

If you are a frequent Amazon user living in Europe, chances are, you have also already figured out that most of the items are sold in all the markets above; they can be shipped within EU; but the prices differ, sometimes greatly.

So let me describe normally as a non-millionaire what you would do:

1. Open amazon.de (maybe uk, es, fr, it, se, nl; depending on where you live)
2. Search the product you want
3. Copy the name of the product
4. Open 6 other new tabs, for other amazon markets
5. Paste the name you copied in step 3, to the 6 tabs you just opened and click search
6. Switching back and forth between all the tabs for the lowest price

You probably see where I'm going with this, and yes, you are right: it is annoying to do the same thing 7 times every time you want to search something on Amazon, which probably you won't even buy in the end, and even if you do, it may be something only cost something ninety-nine so the effort really isn't worth it.

Well, now you are saved. Install this plugin, just a single click, and you get the best price. No fuss, no muss.

## Known Issue

##### For CD/books/DVD categories, some products have multiple format, like a movie can have multiple formats like DVD, blue-ray, etc; for some products can't parse price correctly.

## Disclaimer

As of Dec 1st 2020, I have joined AWS professionally.

Everything I have said, am saying now, and will be said in the future about this plugin and this repo, is only my personal idea, and does not represents Amazon/AWS's opinion.

My future improvement about this plugin will only be done in my spare time outside office hours.

## FAQ

See [FAQ](./faq.md). It's highly recommended that you have a look first.

## DEV Info

Chrome extension with react and redux.

npm, babel and webpack needed for building.

### Build

```
npm i
npm run build
```

### Unpacked chrome extension dir

`chrome-extension`

## Changelog

### Version 1.8 Updates:

Since recently (c.a. Feb 2022), Amazon has changed some of its page style.

It seems not all pages are affected; although most pages are adjusted into the new style, there are indeed older style existing at the same time.

Thanks Maurice and kunder-terapi05 for reporting the bug.

### Version 1.7 Updates:

1. AWS recently changed the page layout, so parsing the price must be adjusted accordingly.

2. Currency exchange API doesn't work any more, so now a fixed exchange rate is used. This is not ideal, but at least on the bright side, it's slightly faster than before.

The current exchange rate being used is:

- GBP to EUR: 1.18
- EUR to GBP: 0.84
- GBP to SEK: 11.77
- SEK to GBP: 0.085
- EUR to SEK: 9.93
- SEK to EUR: 0.10

### Version 1.6 Updates:

- Add amazon.se, and add support for SEK currency conversion
- Add FAQ and Disclaimer

Price list logic changed:

- If current page country is UK: show only GBP price (previously showed both GBP and EUR price)
- If current page country is SE: show only SEK price (previously SE not supported)
- If current country is others (DE/IT/ES/FR/NL), show only EUR price (GBP converted to EUR, same as before, and SEK converted to EUR too)

### Version 1.5 Updates:

I was informed by a user that Amazon opens amazon.nl for Netherland and Belgium, so this version is mainly about adding support for amazon.nl

Main feature:
- Adding support for amazon.nl

By the way, some minor non-functional changes:
- Update dependencies versions to fix vulnerabilites
- Update README about build info

### Version 1.4.1 Updates:
- Update manifest description.

### Version 1.4.0 Updates:
- Change currency exchange rate API URL
- Fix issues with most CD/books/DVD categories that may have multiple formats and different prices
- Update error message when can't parse price

### Version 1.3.2 Updates:
- Fix bug about some amazon URL analyzing

### Version 1.3.1 Updates:
- Fix bug when a product doesn't has main category rank

### Version 1.3.0 Updates:
- Add options page
- Add product rank. By default it's not shown. Can be enabled in options page. Only main category rank is shown.

### Version 1.2.1 Updates:
- If you are visiting Amazon UK, prices are shown in both EUR and GBP (Thanks to UK user Richard Burgess's suggestion).
- Minor bug fix, like if you're not visiting amazon product page, corresponding message is shown instead of a blank page.
- Code refactor, to use redux to separate model and view.
