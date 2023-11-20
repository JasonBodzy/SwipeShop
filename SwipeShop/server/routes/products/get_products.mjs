import * as puppeteer from "puppeteer";

const getProduct = async (product) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://www.amazon.com", {
    waitUntil: "domcontentloaded",
  });

  const searchBar = await page.$x("//*[@id=\"twotabsearchtextbox\"]");

  await searchBar[0].type(product, {delay: 120});

  await page.click('xpath=//*[@id=\"nav-search-bar-form\"]/div[3]/div');

  await page.waitForSelector(".a-size-base-plus", { visible: true });



  const names = await page.$$(".a-size-base-plus");
  var names_text = [];

  for (var name of names) {
    const text = await (await name.getProperty('textContent')).jsonValue();
    names_text.push(text);
  }

  const prices = await page.$$('.s-price-instructions-style');
  var prices_text = [];

  for (var price of prices) {
    const text = await (await price.getProperty('textContent')).jsonValue();
    prices_text.push(text);
  }

  const images = await page.$$('.s-image');
  var images_text = [];

  for (var image of images) {
    const text = await (await image.getProperty('src')).jsonValue();
    if (text != 'https://m.media-amazon.com/images/I/111mHoVK0kL._SS200_.png' && text != undefined) {
      images_text.push(text); 
    }
  }

  var products = [];

  if (names.length <= prices.length && prices.length <= images.length) {
    for (var i = 0; i < names.length; i++) {
      const temp_product = {
        name: names_text[i],
        price: prices_text[i],
        image: images_text[i]
      }

      products.push(temp_product);
    }
  }

  console.log(products);
  
  await browser.close();
};

getProduct("dildo");