let prices = [
    //GALAXRP:
    {
        BUY: 0.045782,
        SELL: 0.044516
    },
    //XRPUSDT:
    {
        BUY: 0.57370,
        SELL: 0.57350
    },
    //GALAUSDT:
    {
        BUY: 0.02539,
        SELL: 0.02538
    }
]

let rates = {
    xUSD: {
    },
    XRP: {
    },
    GALA: {
    }
}

rates['XRP']['GALA'] = prices[0].BUY;
rates['GALA']['XRP'] = 1/prices[0].SELL;
rates['xUSD']['XRP'] = prices[1].BUY;
rates['XRP']['xUSD'] = 1/prices[1].SELL;
rates['xUSD']['GALA'] = prices[2].BUY;
rates['GALA']['xUSD'] = 1/prices[2].SELL;


let rates2 = {
    xUSD: {
    },
    XRP: {
    },
    GALA: {
    }
}

rates2['XRP']['GALA'] = prices[0].SELL;
rates2['GALA']['XRP'] = 1/prices[0].BUY;
rates2['xUSD']['XRP'] = prices[1].SELL;
rates2['XRP']['xUSD'] = 1/prices[1].BUY;
rates2['xUSD']['GALA'] = prices[2].SELL;
rates2['GALA']['xUSD'] = 1/prices[2].BUY;


let data = calculateArbs(rates, 0.01, 'XRP')

let data2 = calculateArbs(rates2, 0.01, 'XRP')

console.log(data);
console.log(data2)



function calculateArbs(rates, percentFee, mysource) {
    console.log('Arb function start')
    let arbs = [];
  
    for(const source in rates) {
        //Every currency
        for(const target in rates[source]) {
            //Every target
            for(const secondtarget in rates[target]) {
                if(secondtarget != source && source == mysource) {
                    let rate = {
                        toUSD: 1,
                        fromUSD: 1
                    }
                    if(source != 'xUSD') {
                        rate = {
                            toUSD: rates[source]['xUSD'],
                            fromUSD: rates['xUSD'][source]
                        }
                    }
                    
                    let object = {
                        value: 10,
                        text: "",
                        volume: 10
                    }
                
                    //Simulate arb
                    object.value -= object.value*percentFee;
                    object.value = object.value/rates[source][target];
                    object.value -= object.value*percentFee;
                    object.value = object.value/rates[target][secondtarget];
                    object.value -= object.value*percentFee;
                    object.value = object.value/rates[secondtarget][source];
                    object.text += source + " => " + target + " => " + secondtarget + " => " + source;
                    
                    //Convert to value
                    object.value = object.value - 10;

                    arbs.push(object); 
                }
            }
        }
    }
    arbs.sort((a, b) => (a.value < b.value) ? 1 : -1)
    return arbs;
}