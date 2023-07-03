/*
Strategy: we'll slice the interval of prices (from 0$ to 100,000$) into segments containing each less than 1000 products.
We'll first retrieve the total number or products (for the whole price range).
Then, as initial price segment length for our algorithm, we'll take the length that a segment of 1000 products would have
if the repartition of the prices was homogene in the [0$, 100,000$] interval.

products = []

fetchProductsFromInterval(lowerIntervalBound, upperIntervalBound):
    intervalLength = upperIntervalBound - lowerIntervalBound
    totalProductsCount = fetch number of products in [lowerIntervalBound, upperIntervalBound]
    segmentsBounds = [
        lowerIntervalBound,
        lowerIntervalBound + intervalLength/(totalProductsCount/1000),
        lowerIntervalBound + 2 * intervalLength/(totalProductsCount/1000),
        ...,
        upperIntervalBound
    ]
    for (int i=0; i<segmentBounds.length-1; i++):
        lowerBound=segmentsBounds[i];
        upperBound=segmentsBounds[i+1];
        Fetch up to 1000 products in segment [lowerBound, upperBound]
        if fetched more than 1000 products:
            fetchProductsFromInterval(lowerSegmentBound, upperSegmentBound)
        else: // terminal case
            Add the fetch products to the global products array

fetchProductsFromInterval(0, 100000);
*/

// TODO: assess complexities
// TODO: add a mocker

let products = [];

axios.get('https://api.ecommerce.com/products');