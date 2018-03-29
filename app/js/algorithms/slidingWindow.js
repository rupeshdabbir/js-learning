function getMaxProfit(stockPrices) {
    if(stockPrices.length < 2) {
        throw new Error ('One or less prices throw error');
    };

    let maxValue = stockPrices[0];
    let minValue = stockPrices[0];
    let profit;

    for(let i=1; i< stockPrices.length; i++) {
        if(stockPrices[i] > maxValue) {
            maxValue = stockPrices[i];
        }
        if(stockPrices[i] <= minValue) {
            maxValue = stockPrices[i];
            minValue = stockPrices[i];
        }
        if(!profit) {
            profit = maxValue - minValue;
            continue;
        }
        profit = maxValue - minValue > profit ? maxValue - minValue : profit;
    }
    if(profit !== 0) {
        return profit;
    }
    // maxValue = stockPrices[1];
    minValue = stockPrices[1];
    for(let i=2; i< stockPrices.length; i++) {
        if(stockPrices[i] > maxValue) {
            minValue = stockPrices[i];
        }
    }
    return maxValue - minValue;

 }

 let a = [6,5,3,2];
console.log(getMaxProfit(a));


 
 










