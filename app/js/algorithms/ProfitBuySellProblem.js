// Promises.


function getMaxprofit(arr) {
    let minProfit = arr[0], maxProfit = 0;


    for(let i=0; i<arr.length; i++) {

        //check for min profits.

        if(arr[i] < minProfit) {
            minProfit = arr[i];
            maxProfit = 0;
            continue;
        }

        if(arr[i] > maxProfit) {
            maxProfit = arr[i];
        }

    }
    return maxProfit - minProfit;
}

let stocks = [8,7,6,5,4];
console.log(getMaxprofit(stocks));