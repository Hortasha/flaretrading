let rates = {
    YFIN: {
      YFLR: 1000,
      xUSD: 3000,
      FXRP: 6000,
      FLTC: 16.6666,
      FDOGE: 75000
    },
    YFLR: {
      YFIN: 0.001,
      xUSD: 3,
      FXRP: 6,
      FLTC: 0.01666666666,
      FDOGE: 75
    },
    xUSD: {
      YFIN: 0.0003333333333,
      YFLR: 0.33333333333333,
      FXRP: 2,
      FLTC: 0.00555,
      FDOGE: 25
    },
    FXRP: {
      YFIN: 0.00016666666,
      YFLR: 0.1666666666,
      xUSD: 0.5,
      FLTC: 0.002777,
      FDOGE: 12.5
    },
    FLTC: {
      YFIN: 0.06,
      YFLR: 60,
      xUSD: 180,
      FXRP: 360,
      FDOGE: 4500
    },
    FDOGE: {
      YFIN: 0.00001333,
      YFLR: 0.0133333333,
      xUSD: 0.04,
      FXRP: 0.08,
      FLTC: 0.000222
    }
  }

  function convert(source, target, capital) {
        
    return capital*rates[source][target]
}

let tradingcircle = [];
let hodl = []


for(const source in rates) {
    //Every currency
    for(const target in rates[source]) {
        //Every target
        for(const secondtarget in rates[target]) {
            let object3 = {
                value: 1,
                text: ""
            }

            object3.value = convert(source, target, object3.value - (object3.value/1000*8))
            object3.value = convert(target, secondtarget, object3.value - (object3.value/1000*8));
            object3.value = convert(secondtarget, source, object3.value - (object3.value/1000*8));
            object3.text += source + " => " + target + " => " + secondtarget + " => " + source;

            if(secondtarget != source) {
                tradingcircle.push(object3);
            }
            

            for(const thirdtarget in rates[secondtarget]) {

                //Second target
                let object4 = {
                    value: 1,
                    text: ""
                }
                object4.value = convert(source, target, object4.value - (object4.value/1000*8))
                object4.value = convert(target, secondtarget, object4.value - (object4.value/1000*8));
                object4.value = convert(secondtarget, thirdtarget, object4.value - (object4.value/1000*8));
                object4.value = convert(thirdtarget, source, object4.value - (object4.value/1000*8));
                object4.text += source + " => " + target + " => " + secondtarget + " => " + thirdtarget + " => " + source;
    
                if(secondtarget != source && thirdtarget != source) {
                    tradingcircle.push(object4);
                }

            }
            
            //back to orginal currency
        }
    }
}

let pooldirection = []

for(const source in rates) {
    for(const target in rates[source]) {
        pooldirection.push(source + " => " + target);
    }
}

for(let i = 0; i < pooldirection.length; i++) {
    let data = tradingcircle.filter(item => {
        if (item.text.includes(pooldirection[i])) {
            return true;
        } else {
            return false;
        }
    })

    data.sort((a, b) => (a.value < b.value) ? 1 : -1)

    let over1 = 0;

    for(let j = 0; j < data.length; j++) {
        if(data[j].value > 1) {
            over1 ++;
        }
    }

    let totalvalue = 0;
    for(let j = 0; j < data.length; j++) {
        totalvalue += data[j].value
    }

    let averageValue = totalvalue/data.length;

    hodl.push({
        averageValue: averageValue,
        tradePair: pooldirection[i],
        bestTradeLoop: over1 + "/" + data.length,
        bestProfitableLoop: {
            value: data[0].value,
            tradingLoop: data[0].text
        },
        worstTradeLoop: data[data.length-1].value
    })
}

tradingcircle.sort((a, b) => (a.value < b.value) ? 1 : -1)
hodl.sort((a, b) => (a.bestProfitableLoop.value < b.bestProfitableLoop.value) ? 1 : -1)

//console.log(tradingcircle);
console.log(hodl);