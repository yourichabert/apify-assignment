/*
Strategy:
I have a recursive approach.
I recursively split the price interval into segments and subsegments.
This algorithm can be visualized as a tree, the nodes being the segments.
If less than 1000 products are fetched within a segment, then this segment is a leaf (i.e. a terminal node).
If a segment is a leaf, the products it contains are returned to the parent node.
The parent node will then return to the grand-parent node all the products it got from its children.
That way, all products are returned from child to parent, until the root of the tree, which returns all the products.
With this approach, one request is done for each node.
Since the goal is to do a minimal number of requests, we should minimize the number of nodes of the tree.
To do that, we should partition our price intervals in the most appropriate way.
But unfortunately, we do not know what is the distribution of products within the price range.
If the distribution was uniform, then the best strategy would be to split each segments into subsegments of equal size.
It's very unlikely that the distribution is uniform in practice. For instance, if the e-commerce website belongs to a supermarket,
then it will contain a lot more products cheaper than 50,000$ than products more expensive than 50,000$.
But if it is the website of a car or boat seller, it could be completely different.
Since we lack information about the website, we'll assume that the distribution is uniform.


Here is the (pseudo)pseudocode of my approach:

fetchProductsFromInterval(lowerIntervalBound, upperIntervalBound):
    intervalLength = upperIntervalBound - lowerIntervalBound
    totalProductsCount = fetch number of products in [lowerIntervalBound, upperIntervalBound]
    minimalNumberOfRequests = totalProductsCount/1000
    segmentsBounds = [
        lowerIntervalBound,
        lowerIntervalBound + intervalLength/minimalNumberOfRequests,
        lowerIntervalBound + 2 * intervalLength/minimalNumberOfRequests,
        ...,
        upperIntervalBound
    ]
    products = []
    for (int i=0; i<segmentBounds.length-1; i++):
        lowerBound=segmentsBounds[i];
        upperBound=segmentsBounds[i+1];
        fetchedProducts = fetch up to 1000 products in segment [lowerBound, upperBound]
        if fetched more than 1000 products:
            products.concat(fetchProductsFromInterval(lowerSegmentBound, upperSegmentBound))
        else: // terminal case
            products.concat(fetchedProducts)
    return products

allProducts = fetchProductsFromInterval(0, 100000);
*/

// TODO: add tests
// TODO: assess complexity/number of request from total number of products

axios.get('https://api.ecommerce.com/products');