const Web3 = require('web3');
const { pairs } = require('./pairs');

let swap = `[
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


let balance = `[{
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}]
`


const getBalance = async(tokenAddress, address, provider) => { 
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            provider,
            {
                headers: [
                    {
                        name: 'Access-Control-Allow-Origin',
                        value: provider
                    },
                    {
                        name: 'x-requested-with',
                        value:'*'
                    }
                ]
            }
        )
    )

    const balanceContract = await new web3.eth.Contract(JSON.parse(balance), tokenAddress);
    const res = await balanceContract.methods.balanceOf(
        address
    ).call();

    return res

}


const initSwap = async (privateKey, address, contract, provider, pairContract, sourceName, rates, hodl) => {
    let pair = pairs.filter(item => item.address == pairContract)[0];
    let source;
    let target;
    let amount = 1;
    let secondaryAmount = 1;

    if(pair.name.split('/')[0] == sourceName) {
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



    let balance = await getBalance(source.token, address, provider)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err);
    })

    if(source.name != 'xUSD') {
        amount = amount * rates.xUSD[source.name];
    }

    if(target.name != 'xUSD') {
        secondaryAmount = secondaryAmount * rates.xUSD[target.name];
    }
    if(balance > amount * 10 ** source.decimal * 150 && hodl.bestProfitableLoop.value > 1.1) {
        amount = Math.trunc(150*amount * 10 ** source.decimal);
        secondaryAmount = 150*secondaryAmount * 10 ** (target.decimal-1)
    } else if(balance > amount * 10 ** source.decimal * 10) {
        amount = Math.trunc(10*amount * 10 ** source.decimal);
        secondaryAmount = 10*secondaryAmount * 10 ** (target.decimal-1)

    } else if (balance > amount * 10 ** source.decimal * 0.5) {
        amount = balance
        secondaryAmount = balance / (10 ** source.decimal) * rates[source.name][target.name] * (10 ** (target.decimal-1))

    } else {
        return {
            sourceBalance: balance / 10 ** source.decimal
        };
    }

    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            provider,
            {
                headers: [
                    {
                        name: 'Access-Control-Allow-Origin',
                        value: provider
                    },
                    {
                        name: 'x-requested-with',
                        value:'*'
                    }
                ]
            }
        )
    )

    console.log(contract)
    const tokenContract = await new web3.eth.Contract(JSON.parse(swap), contract);
    web3.eth.accounts.wallet.add(privateKey);

    console.log(source.name)
    console.log(amount);
  
    console.log(target.name)
    console.log(Math.trunc(secondaryAmount).toString());

    let reciept = await tokenContract.methods.swapExactTokensForTokens(
        amount.toString(),//source.name == 'FXRP' ? toFixed(amount) : amount.toString(),
        Math.trunc(secondaryAmount).toString(),
        [source.token, target.token],
        pairContract,
        Date.now() + 20000
    ).send({
        to: contract,
        from: address,
        gasPrice: 1000000,
        gas: 999999
    }).on('receipt', (receipt) => {
        return receipt;
    })
    console.log(reciept);
    let sourceBalance = await getBalance(source.token, address, provider) / 10 ** source.decimal;
    let targetBalance = await getBalance(target.token, address, provider) / 10 ** target.decimal;
    
    if(target.name != 'xUSD') {
        targetBalance = targetBalance * rates[target.name]['xUSD']
    }
    if(source.name != 'xUSD') {
        sourceBalance = sourceBalance * rates[source.name]['xUSD']
    }

    console.log("Target balance: " + targetBalance);
    console.log("source balance: " + sourceBalance);
    return {
        targetBalance,
        sourceBalance
    }
}

exports.initSwap = initSwap


function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }
  