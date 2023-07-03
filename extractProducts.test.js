import * as extractProducts from "./extractProducts";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const PRICE_DECIMALS = 2;
const PRODUCTS_COUNT = 10000;

// -------------- HELPERS FOR TESTS --------------
function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

// Generate products prices
function generateProductsPrices(productsCount) {
  return [...Array(productsCount)].map(() => getRandomFloat(MIN_PRICE, MAX_PRICE, PRICE_DECIMALS));
}

function countProductsInPriceRange(minPrice, maxPrice) {
  return productPrices.filter((price) => price >= minPrice && price <= maxPrice).length;
}

function getProductsInfoMocker(minPrice, maxPrice) {
  const total = countProductsInPriceRange(minPrice, maxPrice);
  const count = Math.min(1000, total);
  const products = Array(count).fill({});
  return { total, count, products };
}

// -------------- TESTS --------------
let productPrices = [];

beforeAll(() => {
  productPrices = generateProductsPrices(PRODUCTS_COUNT);
});

test("Extract as many products as expected", async () => {
  const productsCount = (await extractProducts.fetchProductsFromInterval(0, 100000, getProductsInfoMocker)).length;
  expect(productsCount).toEqual(10000);
});
