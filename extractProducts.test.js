import * as extractProducts from "./extractProducts";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const PRICE_DECIMALS = 2;
const DEFAULT_PRODUCTS_COUNT = 10000;

// -------------- HELPERS FOR TESTS --------------
function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

// Generate products prices
function generateProductsPrices(productsCount = DEFAULT_PRODUCTS_COUNT) {
  return Array(productsCount).fill(getRandomFloat(MIN_PRICE, MAX_PRICE, PRICE_DECIMALS));
}

function countProductsInPriceRange(prices, minPrice, maxPrice) {
  return prices.filter((price) => price >= minPrice && price <= maxPrice).length;
}

const getProductsInfoMocker = (minPrice, maxPrice) => {
  const total = countProductsInPriceRange(generateProductsPrices(), minPrice, maxPrice);
  const count = Math.min(1000, total);
  const products = Array(count).fill({});
  return { total, count, products };
};

// -------------- TESTS --------------
test("Extract as many products as expected", async () => {
  const productsCount = (await extractProducts.fetchProductsFromInterval(0, 100000, getProductsInfoMocker)).length;
  console.log("productsCount:", productsCount);
  expect(productsCount).toEqual(9999);
});
