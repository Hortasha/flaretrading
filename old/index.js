require('isomorphic-fetch');
const { getBalance } = require('./getreserves');
const { initSwap } = require('./smartContract');
const fs = require('fs');
const { privateKey, address, contract, provider } = 
{
    privateKey: "164fcc0c584c26e8666bf3c2a782abd8f8547173d1118e929ba8c4b38240c182",
    address: "0xf347120f40829fac4fbdd98ea935085294ce7f83",
    contract: "0xC6256295F374BA5A79Faa71e47103eB6C01a52c4",
    provider: "https://banniklabs-cors.herokuapp.com/https://costone.flare.network/ext/bc/C/rpc"
}

let pairContract;
let sourceName;
let rates;

let currencies = {
    YFIN: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    YFLR: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    xUSD: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    FXRP: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    FLTC: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    FDOGE: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6'
}

let pairs = [
    {
      pair: [ 'YFLR', 'xUSD' ],
      value: '0x23261ac6f53C03f1872dC58fF7281bf248A3F4E0'
    },
    {
      pair: [ 'YFLR', 'FLTC' ],
      value: '0x5383900af89194a7Ec166c961Ad72fcde97648eF'
    },
    {
      pair: [ 'YFLR', 'FDOGE' ],
      value: '0x17A416E7de5327d67c2f3144110e4f069708672d'
    },
    {
      pair: [ 'YFLR', 'YFIN' ],
      value: '0xcc179a7E1b2dA8BBa43efc2a01FED5c05BcC870c'
    },
    {
      pair: [ 'FXRP', 'YFLR' ],
      value: '0xBd1636272f59bbF303CB0e53Da28eEd28CCaF6ae'
    },
    {
      pair: [ 'YFIN', 'xUSD' ],
      value: '0xd360a444e297a44c5a2d9d3733795459774DdAC8'
    },
    {
      pair: [ 'YFIN', 'FLTC' ],
      value: '0x318599CEbC039Cf45eB6B8E7B849C1D64d570B09'
    },
    {
      pair: [ 'YFIN', 'FDOGE' ],
      value: '0xb2DBd964EFB5282B0FfA3352B73DEA6a7A030fd7'
    },
    {
      pair: [ 'FXRP', 'YFIN' ],
      value: '0x16B4Fb3de3cD3B1c8D44da99e341f0D0E8Ac0935'
    },
    {
      pair: [ 'FXRP', 'xUSD' ],
      value: '0x6eBE4e6373c046E924CCc5Fb32F53a34cB1Ecad1'
    },
    {
      pair: [ 'FXRP', 'FLTC' ],
      value: '0x78244bDae1D168AB28fE44f1e9B662A4643E0Da5'
    },
    {
      pair: [ 'FXRP', 'FDOGE' ],
      value: '0x00381362C068AE16f14cd733B12FE30cE6829dC6'
    },
    {
      pair: [ 'FLTC', 'FDOGE' ],
      value: '0xE5385c85c24422aBf93968f71eB1D3f293E61412'
    },
    {
      pair: [ 'FLTC', 'xUSD' ],
      value: '0x9264e7E4385641AbA9Bc1B817600b04844AE8eEB'
    },
    {
      pair: [ 'FDOGE', 'xUSD' ],
      value: '0x4E132B82F321cE8d418AB0339eb63A89Ac5A500B'
    }
  ]

async function getPrices () {
    fs.appendFile('log.txt', "Getting new prices\n", () => console.log("logging"));

    rates = {
        YFIN: {
        },
        YFLR: {
        },
        xUSD: {
        },
        FXRP: {
        },
        FLTC: {
        },
        FDOGE: {
        }
    }
    
    for(let i = 0; i < pairs.length; i++) {
        let tokenAVolume = await getBalance(currencies[pairs[i].pair[0]], pairs[i].value, provider);
        let tokenBVolume = await getBalance(currencies[pairs[i].pair[1]], pairs[i].value, provider);

        rates[pairs[i].pair[0]][pairs[i].pair[1]] = tokenBVolume/tokenAVolume;
        rates[pairs[i].pair[1]][pairs[i].pair[0]] = tokenAVolume/tokenBVolume;
    }

    console.log(rates)
    
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

                object3.value = convert(source, target, object3.value - (object3.value/1000*3))
                object3.value = convert(target, secondtarget, object3.value - (object3.value/1000*3));
                object3.value = convert(secondtarget, source, object3.value - (object3.value/1000*3));
                object3.text += source + " => " + target + " => " + secondtarget + " => " + source;

                if(secondtarget != source) {
                    tradingcircle.push(object3);
                }
                
                /*
                for(const thirdtarget in rates[secondtarget]) {

                    //Second target
                    let object4 = {
                        value: 1,
                        text: ""
                    }
                    object4.value = convert(source, target, object4.value - (object4.value/100*0.45))
                    object4.value = convert(target, secondtarget, object4.value - (object4.value/1000*4.5));
                    object4.value = convert(secondtarget, thirdtarget, object4.value - (object4.value/1000*4.5));
                    object4.value = convert(thirdtarget, source, object4.value - (object4.value/1000*4.5));
                    object4.text += source + " => " + target + " => " + secondtarget + " => " + thirdtarget + " => " + source;
        
                    if(secondtarget != source && thirdtarget != source) {
                        tradingcircle.push(object4);
                    }

                }
                */
                
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
    console.log(tradingcircle.length);
    tradingcircle.sort((a, b) => (a.value < b.value) ? 1 : -1)
    hodl.sort((a, b) => (a.bestProfitableLoop.value < b.bestProfitableLoop.value) ? 1 : -1)


    console.log(hodl[0]);

    trade(hodl[0], pairs);
}


async function trade(hodl, pairs, profits = [0, 0, 0, 0], oldsum = 0) {

    let newSum = 0;
    if(oldsum == 0) {
        fs.appendFile('log.txt', "Start new trade with: " + hodl.bestProfitableLoop.tradingLoop + " Potential: " + hodl.bestProfitableLoop.value + "\n", () => console.log("logging"));
    }
    let loopcurrencies = hodl.bestProfitableLoop.tradingLoop.split(' => ');
    let pools = []
    for(let i = 1; i < loopcurrencies.length; i++) {
        pools.push({
            source: loopcurrencies[i-1],
            target: loopcurrencies[i]
        });
        if(oldsum == 0){
            let volumeInWallet = await getBalance(currencies[loopcurrencies[i-1]], address, provider);
            if(loopcurrencies[i-1] != 'xUSD') {
                profits[i-1] = volumeInWallet*rates[loopcurrencies[i-1]]['xUSD']
            } else {
                profits[i-1] = volumeInWallet;
            }
        }
    }

    if(oldsum == 0) {
        for(let i = 0; i < profits.length; i++) {
            oldsum+=profits[i];
        }
        fs.appendFile('log.txt', "Values held in trade chain: " + profits + "\n", () => console.log("logging"));
        fs.appendFile('log.txt', "OldTotal: " + oldsum + " USD\n", () => console.log("logging"));
    }

    for(let i = 0; i < pools.length; i++) {
        pairContract = pairs.filter((item) => {
            return item.pair.includes(pools[i].source) && item.pair.includes(pools[i].target)
        })[0].value;
        sourceName = pools[i].source;

        let value;
        if(hodl.bestProfitableLoop.value > 1.005) {
            value = await initSwap(privateKey, address, contract, provider, pairContract, sourceName, rates, hodl);
        }
        
        if(value && value.targetBalance) {
            profits[i] = value.sourceBalance;
            if(i != pools.length-1) {
                profits[i+1] = value.targetBalance
            } else {
                profits[0] = value.targetBalance
            }
        }
        if(i == pools.length-1){
            newSum = 0;
        }

        for(let j = 0; j < profits.length; j++) {
            newSum+=profits[j];
        }


        if(
            newSum-1 <= oldsum && i == pools.length-1 ||
            hodl.bestProfitableLoop.value < 1.005
        ) {
            console.log("Stop Executing. Loosing money")
            fs.appendFile('log.txt', "Values held in trade chain: " + profits + "\n", () => console.log("logging"));
            fs.appendFile('log.txt', "new loop: NewTotal: " + newSum + " USD OldTotal: " + oldsum + " USD\n", () => console.log("logging"));
            setTimeout(() => {
                getPrices()
            }, 10000);
            return
        } else if(i == pools.length-1) {
            fs.appendFile('log.txt', "Values held in trade chain: " + profits + "\n", () => console.log("logging"));
            fs.appendFile('log.txt', "new loop: NewTotal: " + newSum + " USD OldTotal: " + oldsum + " USD\n", () => console.log("logging"));
            trade(hodl, pairs, profits, newSum)
        }
    }
}

getPrices()