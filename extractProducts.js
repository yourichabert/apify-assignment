import axios from "axios";

function getProductsInfo(minPrice = 0, maxPrice = 100000) {
    return axios.get(`https://api.ecommerce.com/products?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        .then((response) => response.data)
        .catch((error) => console.error(`Could not fetch products of price between ${minPrice} and ${maxPrice}: ${error}`));
}

// Computes segments bounds given an input price interval and a count of products within that interval
function splitInterval(lowerBound, upperBound, productsCount) {
    const segmentCount = productsCount / 1000;
    const intervalLength = upperBound - lowerBound;
    return [...Array(segmentCount + 1).keys()].map(segmentIndex => segmentIndex * intervalLength / segmentCount);
}

function fetchProductsFromInterval(lowerIntervalBound, upperIntervalBound) {
    const { total: totalInInterval } = getProductsInfo(lowerIntervalBound, upperIntervalBound);
    const segmentsBounds = splitInterval(lowerIntervalBound, upperIntervalBound, totalInInterval);
    let products = [];
    let lowerSegmentBound;
    let upperSegmentBound;
    for (let i = 0; i < segmentsBounds.length - 1; i++) {
        lowerSegmentBound = segmentsBounds[i];
        upperSegmentBound = segmentsBounds[i+1];
        const { total: totalNewProducts, products: newProducts } = getProductsInfo(lowerSegmentBound, upperSegmentBound);
        if (totalNewProducts < 1000) { // Terminal case (segment is leaf)
            products = [...products, ...newProducts];
        } else {
            products = [...products, ...fetchProductsFromInterval(lowerSegmentBound, upperSegmentBound)];
        }
    }
    return products;
}

const products = fetchProductsFromInterval(0, 100000);
console.log('Here are all the products:', products);
