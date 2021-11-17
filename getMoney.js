const mysql = require('mysql');
const { pairs } = require('./pairs');
const { variables } = require('./variables');
const { getMyBalance } = require('./getMyBalance');
const Web3 = require('web3');
const fs = require('fs');

//Empty balances table before start
//npm run dev

const currencyTokens = {
  YFIN: '0xC326B16b85FE29184889e3d913DAbBfA4B52d6d4',
  YFLR: '0xA4150e893e74A0d4d2F31C5d176069A54E379D69',
  xUSD: '0x2bb2ff65D551F8509255a81a715dECC6a833500D',
  FXRP: '0xb88DBbb61eBbA9c9D7cC6C793F85D939aC989B62',
  FLTC: '0x6Bd7Fe771ffb295b5013b40C3cd3dbA85189f6a6',
  FDOGE: '0x22aC23D8b9d283E17A2b059A01b573ED0Cf23681'
}


const swapABI = `[
  {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
]`

//SQL connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kalle123',
  database : 'betatrading'
});
 
connection.connect();

//Do Trade function
async function doTrade() {
  fs.appendFile('log.txt', `Calculating Possiblities\n`, () => console.log("logging"));
  
  //Get balances
  const balancesDB = await balancesFromDB()
  .then(result => {
    return result;
  })
  .catch(err => {
    fs.appendFile('log.txt', `Error: ${err} \n`, () => console.log("logging"));
  })

  //Get rates
  const ratesDB = await ratesFromDB()
  .then(result => {
    return result;
  })
  .catch(err => {
    fs.appendFile('log.txt', `Error: ${err} \n`, () => console.log("logging"));
  })

  let latest = ratesDB.sort((a, b) => (a.value > b.value) ? 1 : -1)[0].latestTimestamp.getTime();

  //Get treats
  let triggerData = JSON.parse(fs.readFileSync(variables.tradeTrigger));

  //Get Balance
  let balanceBefore = 0;

  //Data calculation and collection
  const rates = calculateRates(ratesDB);

  for(let i = 0; i < balancesDB.length; i++) {
    balanceBefore += balancesDB[i].token == 'xUSD' ? parseFloat(balancesDB[i].balanceToken) : parseFloat(balancesDB[i].balanceToken) * rates[balancesDB[i].token]['xUSD'];
  }

  let arbs;
  let arbsequence;
  let traded = false;
  if(balanceBefore !== 0) {
    arbs = calculateArbs(rates, variables.percentFee, ratesDB, balancesDB, triggerData);
    arbsequence = arbs[0].text.split(' => ').join('');

    fs.appendFile('log.txt', `Balance before trade: ${balanceBefore} xUSD\n`, () => console.log("logging"));
    fs.appendFile('log.txt', `Arb: ${arbs[0].text} Expected Gain: ${arbs[0].value} xUSD\n`, () => console.log("logging"));
    fs.appendFile('log.txt', `Trade Volume: ${arbs[0].volume} xUSD\n`, () => console.log("logging"));
    fs.appendFile('log.txt', `Treat: ${triggerData[arbsequence]*arbs[0].volume} xUSD\n`, () => console.log("logging"));
  
    if(latest > (Date.now() - variables.withinTime) == false) {
      fs.appendFile('log.txt', `One or more rates are not being updated\n`, () => console.log("logging"));
    }
  
    if(arbs[0].value > 0) { //latest > (Date.now() - variables.withinTime)
      traded = true;
      await swap(arbs[0], rates);
    }
  }
  
  if(traded || balanceBefore == 0) {

    //Calculate balances
    for(const token in currencyTokens) {
      const rawBalance = await getMyBalance(currencyTokens[token], variables.provider, variables.address);
      const pairForDecimal = pairs.filter(item => {
        return item.tokenA == currencyTokens[token] || item.tokenB == currencyTokens[token]
      })[0]
      const decimal = pairForDecimal.tokenA == currencyTokens[token] ? pairForDecimal.decimalA : pairForDecimal.decimalB;

      let date;
      date = new Date();
      date = date.getUTCFullYear() + '-' +
          ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
          ('00' + date.getUTCDate()).slice(-2) + ' ' + 
          ('00' + date.getUTCHours()).slice(-2) + ':' + 
          ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
          ('00' + date.getUTCSeconds()).slice(-2);

      const balanceToken = rawBalance / 10 ** decimal;

      const insert = {
        token: token,
        balanceUSD: token != 'xUSD' ? balanceToken*rates[token]['xUSD'] : balanceToken,
        balanceToken: balanceToken,
        balanceRaw: rawBalance,
        latestTimestamp: date
      }

      //UPSERT DATA
      await balanceInWallet(insert)
      .catch(err => {
        fs.appendFile('log.txt', `Error: ${err} \n`, () => console.log("logging"));
      })
    }

    //Get balances After
    const balancesDBAfter = await balancesFromDB()
    .then(result => {
      return result;
    })
    .catch(err => {
      fs.appendFile('log.txt', `Error: ${err} \n`, () => console.log("logging"));
    })

    let balanceAfter = 0;
    for(let i = 0; i < balancesDBAfter.length; i++) {
      balanceAfter += balancesDBAfter[i].token == 'xUSD' ? parseFloat(balancesDBAfter[i].balanceToken) :parseFloat(balancesDBAfter[i].balanceToken) * rates[balancesDBAfter[i].token]['xUSD'];
    }
    fs.appendFile('log.txt', `Balance after trade: ${balanceAfter} xUSD\n`, () => console.log("logging"));

    //Punish/Reward bot
    if(traded) {
      let difference = balanceAfter - balanceBefore;
    
      if(typeof(triggerData[arbsequence]) == 'undefined') {
        triggerData[arbsequence] = 0;
      }

      if(difference < 0) {
        triggerData[arbsequence] -= 0.0001;
      }
      if(difference > arbs[0].value*1.5 && arbs[0].value > 0.002*arbs[0].volume) {
        triggerData[arbsequence] += 0.0001;
      }
      fs.writeFileSync(variables.tradeTrigger, JSON.stringify(triggerData))
    }
    doTrade();
  } else {
    setTimeout(() => {
      doTrade();
    }, variables.milliseconds);
  }
}



//Function Operations below
function ratesFromDB() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from rates', function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  })
}

function balancesFromDB() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from balance', function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  })
}

function balanceInWallet(insert) {
  return new Promise((resolve, reject) => {
    connection.query(`
    INSERT INTO betatrading.balance
    (
      token,
      balanceUSD,
      balanceToken,
      balanceRaw,
      latestTimestamp
    )
    VALUES
    (
      '${insert.token}',
      '${insert.balanceUSD}',
      '${insert.balanceToken}',
      '${insert.balanceRaw}',
      '${insert.latestTimestamp}'
    )
    ON DUPLICATE KEY UPDATE
    balanceUSD=VALUES(balanceUSD),
    balanceToken=VALUES(balanceToken),
    balanceRaw=VALUES(balanceRaw),
    latestTimestamp=VALUES(latestTimestamp);
    `, function (error, results, fields) {
      if (error) throw reject(error);
      resolve(results)
    });
  })
}


function calculateRates(ratesDB) {

  let rates = {
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

  for(let i = 0; i < ratesDB.length; i++) {
    rates[ratesDB[i].tokenSource][ratesDB[i].tokenTarget] = ratesDB[i].rate;
  }

  return rates;
}

function calculateArbs(rates, percentFee, ratesDB, balancesDB, triggerData) {
  console.log('Arb function start')
  let arbs = [];

  for(const source in rates) {
      //Every currency
      for(const target in rates[source]) {
          //Every target
          for(const secondtarget in rates[target]) {
            if(secondtarget != source) {
              let volumes = {
                  trade1: {
                      volume1: ratesDB.filter(item => item.tokenSource == source && item.tokenTarget == target)[0],
                      volume2: ratesDB.filter(item => item.tokenSource == target && item.tokenTarget == source)[0],
                  },
                  trade2: {
                      volume1: ratesDB.filter(item => item.tokenSource == target && item.tokenTarget == secondtarget)[0],
                      volume2: ratesDB.filter(item => item.tokenSource == secondtarget && item.tokenTarget == target)[0],
                  },
                  trade3: {
                      volume1: ratesDB.filter(item => item.tokenSource == secondtarget && item.tokenTarget == source)[0],
                      volume2: ratesDB.filter(item => item.tokenSource == source && item.tokenTarget == secondtarget)[0],
                  }
              }

              let balance = balancesDB.filter(item => item.token == source)[0];

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

              for(let i = 1; i <= 2; i++) {
                  let object = {
                      value: 10**i,
                      text: "",
                      volume: 10**i
                  }
                  
                  //If i have enagh funds
                  if(balance.balanceToken > object.value*rate.fromUSD*1.1) {
                    //Simulate arb
                    object.value = object.value*rate.fromUSD;
                    object.value -= object.value*percentFee;
                    object.value = convert(parseFloat(volumes.trade1.volume1.balanceToken), parseFloat(volumes.trade1.volume2.balanceToken), object.value);
                    object.value -= object.value*percentFee;
                    object.value = convert(parseFloat(volumes.trade2.volume1.balanceToken), parseFloat(volumes.trade2.volume2.balanceToken), object.value);
                    object.value -= object.value*percentFee;
                    object.value = convert(parseFloat(volumes.trade3.volume1.balanceToken), parseFloat(volumes.trade3.volume2.balanceToken), object.value);
                    object.text += source + " => " + target + " => " + secondtarget + " => " + source;
                    
                    //Convert to value
                    object.value = (object.value*rate.toUSD) - (10**i);

                    //Punish/reward
                    let arbsequence = object.text.split(' => ').join('');
                    if(typeof(triggerData[arbsequence]) !== 'undefined') {
                      object.value += triggerData[arbsequence]*object.volume;
                    }

                    arbs.push(object); 
                  }
              }
            }
          }
      }
  }
  arbs.sort((a, b) => (a.value < b.value) ? 1 : -1)
  return arbs;
}

function convert(volumeA, volumeB, buyAmountA) {
  let newVolumeB = volumeA*volumeB/(volumeA+buyAmountA)
  return volumeB - newVolumeB
}


//SWAP
async function swap(arb, rates) {
  fs.appendFile('log.txt', `New Trade\n`, () => console.log("logging"));

  let currencies = arb.text.split(' => ');
  for(let i = 1; i < currencies.length; i++) {
    //Locate pools in ARB
    let pool = {
        source: currencies[i-1],
        target: currencies[i]
    };

    //Get pair for pool
    let pair = pairs.filter(item => {
      return item.name.includes(pool.source) && item.name.includes(pool.target)
    })[0];

    //Get token data for trade (source and target)
    let source;
    let target;
    if(pair.name.split('/')[0] == pool.source) {
      source = {
          token: pair.tokenA,
          decimal: pair.decimalA,
          name: pair.name.split('/')[0]
      }
      target = {
          token: pair.tokenB,
          decimal: pair.decimalB,
          name: pair.name.split('/')[1]
      }
    } else {
        source = {
            token: pair.tokenB,
            decimal: pair.decimalB,
            name: pair.name.split('/')[1]
        }
        target = {
            token: pair.tokenA,
            decimal: pair.decimalA,
            name: pair.name.split('/')[0]
        }
    }
  
    //Get amount to trade

    let sourceAmount = 1;
    let targetAmount = 1;
    if(source.name != 'xUSD') {
      sourceAmount = rates['xUSD'][source.name]
    }
    if(target.name != 'xUSD') {
      targetAmount = rates['xUSD'][target.name];
    }
    
    sourceAmount = arb.volume*sourceAmount * 10 ** source.decimal;
    targetAmount = arb.volume*targetAmount * 10 ** (target.decimal-1);

    sourceAmount = parseInt(sourceAmount);
    targetAmount = parseInt(targetAmount);

    //const web3 = new Web3(variables.provider);

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        variables.provider,
        {
            headers: [
                {
                    name: 'Access-Control-Allow-Origin',
                    value: variables.provider
                },
                {
                    name: 'x-requested-with',
                    value:'*'
                }
            ]
        }
      )
    )
    

    const tokenContract = await new web3.eth.Contract(JSON.parse(swapABI), variables.contract);
    web3.eth.accounts.wallet.add(variables.privateKey);

    const reciept = await tokenContract.methods.swapExactTokensForTokens(
        sourceAmount.toString(),
        Math.trunc(targetAmount).toString(),
        [source.token, target.token],
        pair.address,
        Date.now() + 20000
    ).send({
        to: variables.contract,
        from: variables.address,
        gasPrice: 1000000,
        gas: 999999
    }).on('receipt', (receipt) => {
        return receipt;
    })
    fs.appendFile('log.txt', `Reciept: ${JSON.stringify(reciept)} \n`, () => console.log("logging"));
  }
}

//Start trading, set timeout to make sure prices are updated before trading
setTimeout(() => {
  doTrade();
}, parseInt(variables.milliseconds/3));