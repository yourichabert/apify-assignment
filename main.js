import { fetchProductsFromInterval } from "./extractProducts.js";

const products = await fetchProductsFromInterval(0, 100000);
console.log("Here are all the products:", products);
