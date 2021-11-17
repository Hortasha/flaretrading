const Web3 = require('web3');
let pairs = [
    {
      name: 'YFLR/xUSD',
      address: '0x25E99C874BB80F21FC1c65AC005fD5Af4A680155',
      tokenA: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
      tokenB: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'YFLR/FLTC',
      address: '0x6DaF7873d142726e00B314d81D93D4B54F6E3D0B',
      tokenA: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
      tokenB: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'YFLR/FDOGE',
      address: '0x294102AF7E5cCe9FE596f267C8af5D8fBc37DFB0',
      tokenA: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
      tokenB: '0xD08A154255339a1Ad359ed204374cF967b4D72DF',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'YFLR/YFIN',
      address: '0xE9689fA4a0984F301953Df0e379C1DEAF6236B44',
      tokenA: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
      tokenB: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
      erc: true,
      decimalA: 18,
      decimalB: 18,
    },
    {
      name: 'FXRP/YFLR',
      address: '0x19eA74F54056Ea09CC1b1E83B07f00C2C2ea67F3',
      tokenA: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
      tokenB: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
      erc: true,
      decimalA: 18,
      decimalB: 18,
    },
    {
      name: 'YFIN/xUSD',
      address: '0xb9B6E181E16dF979fa6B0A7C74F4cdB6D446034F',
      tokenA: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
      tokenB: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'YFIN/FLTC',
      address: '0xD044a0ed49198479FC57A2580974B9F9382a90Cf',
      tokenA: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
      tokenB: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'YFIN/FDOGE',
      address: '0x62Ac5e918d3139f5Ea10ddbF6A619DDD98d734E0',
      tokenA: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
      tokenB: '0xD08A154255339a1Ad359ed204374cF967b4D72DF',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'FXRP/YFIN',
      address: '0xEF248902b7C8C33d1a516Aa220739AfD671Ebc10',
      tokenA: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
      tokenB: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
      erc: true,
      decimalA: 18,
      decimalB: 18,
    },
    {
      name: 'FXRP/xUSD',
      address: '0x9AA10aC3ADb4a6e0fb76d21beBAeb5993426C986',
      tokenA: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
      tokenB: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'FXRP/FLTC',
      address: '0x0C4B0Da5A4B3D8B4182A376dB273481Fce8785Dc',
      tokenA: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
      tokenB: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'FXRP/FDOGE',
      address: '0x1529f07450d589aE89cA047d1644c21E5312380e',
      tokenA: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
      tokenB: '0xD08A154255339a1Ad359ed204374cF967b4D72DF',
      erc: true,
      decimalA: 18,
      decimalB: 6,
    },
    {
      name: 'FLTC/FDOGE',
      address: '0x4152610b5bba5E1B730853d340367341468C95C5',
      tokenA: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
      tokenB: '0xD08A154255339a1Ad359ed204374cF967b4D72DF',
      erc: true,
      decimalA: 6,
      decimalB: 6,
    },
    {
      name: 'FLTC/xUSD',
      address: '0x45dEaeFB268c7C8305802A7618106f51F3845958',
      tokenA: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
      tokenB: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
      erc: true,
      decimalA: 6,
      decimalB: 6,
    },
    {
      name: 'FDOGE/xUSD',
      address: '0x86CCE82054E0Ae2aB0AF44b8De4eA4197941b790',
      tokenA: '0xD08A154255339a1Ad359ed204374cF967b4D72DF',
      tokenB: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
      erc: true,
      decimalA: 6,
      decimalB: 6,
    },
  ]

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

let pairstwo = [
    {
        pair: ["YFIN", "YFLR"],
        value: '0xE9689fA4a0984F301953Df0e379C1DEAF6236B44'
    },
    {
        pair: ["xUSD", "YFIN"],
        value: '0xb9B6E181E16dF979fa6B0A7C74F4cdB6D446034F'
    },
    {
        pair: ["FXRP", "YFIN"],
        value: '0xEF248902b7C8C33d1a516Aa220739AfD671Ebc10'
    },
    {
        pair: ["YFIN", "FLTC"],
        value: '0xD044a0ed49198479FC57A2580974B9F9382a90Cf'
    },
    {
        pair: ["YFIN", "FDOGE"],
        value: '0x62Ac5e918d3139f5Ea10ddbF6A619DDD98d734E0'
    },
    {
        pair: ["xUSD", "YFLR"],
        value: '0x25E99C874BB80F21FC1c65AC005fD5Af4A680155'
    },
    {
        pair: ["FXRP", "YFLR"],
        value: '0x19eA74F54056Ea09CC1b1E83B07f00C2C2ea67F3'
    },
    {
        pair: ["FLTC", "YFLR"],
        value: '0x6DaF7873d142726e00B314d81D93D4B54F6E3D0B'
    },
    {
        pair: ["YFLR", "FDOGE"],
        value: '0x294102AF7E5cCe9FE596f267C8af5D8fBc37DFB0'
    },
    {
        pair: ["xUSD", "FXRP"],
        value: '0x9AA10aC3ADb4a6e0fb76d21beBAeb5993426C986'
    },
    {
        pair: ["xUSD", "FLTC"],
        value: '0x45dEaeFB268c7C8305802A7618106f51F3845958'
    },
    {
        pair: ["xUSD", "FDOGE"],
        value: '0x86CCE82054E0Ae2aB0AF44b8De4eA4197941b790'
    },
    {
        pair: ["FXRP", "FLTC"],
        value: '0x0C4B0Da5A4B3D8B4182A376dB273481Fce8785Dc'
    },
    {
        pair: ["FXRP", "FDOGE"],
        value: '0x1529f07450d589aE89cA047d1644c21E5312380e'
    },
    {
        pair: ["FLTC", "FDOGE"],
        value: '0x4152610b5bba5E1B730853d340367341468C95C5'
    }
]

let balance = `[
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
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
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
`

let currencies = {
    YFIN: '0x4eE1d121cCF3BF6f5b2218F82EC227264098a53b',
    YFLR: '0x880903167d7665C28c3eC0E9b85741d1DFA4feEb',
    xUSD: '0x3A71f101AD5f3bd0FB72a37474c31ED68BaBF6bf',
    FXRP: '0x4140a324d7e60e633bb7cBD7bdcE330FF5702B5E',
    FLTC: '0x539F3bb9b7953450016B4933db6Fd847B0e7803F',
    FDOGE: '0xD08A154255339a1Ad359ed204374cF967b4D72DF'
}

const getBalance = async(token, address, provider = "https://banniklabs-cors.herokuapp.com/https://costone.flare.network/ext/bc/C/rpc") => { 
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
    const tokenContract = await new web3.eth.Contract(JSON.parse(balance), token);
    let res = await tokenContract.methods.balanceOf(
        address
    ).call();


    console.log("Token for volume: " + token + " address for volume: " + address)
    let pair = pairs.filter(item => address == item.address);

    if(pair.length == 0) {
        pair = pairs.filter(item => (token == item.tokenA || token == item.tokenB));

    }

    if(token == pair[0].tokenA) {
        res = res / 10 ** pair[0].decimalA
    } else {
        res = res / 10 ** pair[0].decimalB
    }
    return res

}

async function getPrices () {
    for(let i = 0; i < pairstwo.length; i++) {
        let tokenAVolume = await getBalance(currencies[pairstwo[i].pair[0]], pairstwo[i].value);
        let tokenBVolume = await getBalance(currencies[pairstwo[i].pair[1]], pairstwo[i].value);

        rates[pairstwo[i].pair[0]][pairstwo[i].pair[1]] = tokenBVolume/tokenAVolume;
        rates[pairstwo[i].pair[1]][pairstwo[i].pair[0]] = tokenAVolume/tokenBVolume;
    }

    console.log(rates);
}

getPrices()