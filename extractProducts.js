import axios from "axios";

// Fetches products from the API of the e-commerce website within a price range
export async function getProductsInfo(minPrice = 0, maxPrice = 100000) {
  return axios
    .get(`https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`)
    .then((response) => response.data)
    .catch((ex) => {
      throw Error(`Could not fetch products of price between ${minPrice} and ${maxPrice}: ${ex}`);
    });
}

// Computes segments bounds given an input price interval and a count of products within that interval
function splitInterval(lowerBound, upperBound, productsCount) {
  const segmentCount = Math.ceil(productsCount / 1000);
  const boundsCount = segmentCount + 1;
  const intervalLength = upperBound - lowerBound;
  return [...Array(boundsCount).keys()].map(
    (boundIndex) => lowerBound + Math.floor((boundIndex * intervalLength) / segmentCount)
  );
}

/*
Recursively splits the price range in segments, until each segment contains less than 1000 products.
Aggregates all products of those segments and returns an array containing all products of the shop.
*/
export async function fetchProductsFromInterval(lowerIntervalBound, upperIntervalBound, productsInfoGetter = getProductsInfo) {
  const { total } = await productsInfoGetter(lowerIntervalBound, upperIntervalBound);
  const totalInInterval = total;
  const segmentsBounds = splitInterval(lowerIntervalBound, upperIntervalBound, totalInInterval);
  let products = [];
  let lowerSegmentBound;
  let upperSegmentBound;
  for (let i = 0; i < segmentsBounds.length - 1; i++) {
    lowerSegmentBound = segmentsBounds[i];
    upperSegmentBound = segmentsBounds[i + 1];
    const { total: totalNewProducts, products: newProducts } = await productsInfoGetter(lowerSegmentBound, upperSegmentBound);
    if (totalNewProducts < 1000) { // Terminal case (segment is leaf)
      products = [...products, ...newProducts];
    } else { // Segment still contains more than 1000 products so it has to be split again
      products = [...products, ...(await fetchProductsFromInterval(lowerSegmentBound, upperSegmentBound, productsInfoGetter))];
    }
  }
  return products;
}
