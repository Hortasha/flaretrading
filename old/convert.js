
  //let list = JSON.parse(data).data.pairs;


let newlist = [
  {
    name: 'YFLR/xUSD',
    address: '0x23261ac6f53C03f1872dC58fF7281bf248A3F4E0',
    tokenA: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    tokenB: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'YFLR/FLTC',
    address: '0x5383900af89194a7Ec166c961Ad72fcde97648eF',
    tokenA: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    tokenB: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'YFLR/FDOGE',
    address: '0x17A416E7de5327d67c2f3144110e4f069708672d',
    tokenA: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    tokenB: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'YFLR/YFIN',
    address: '0xcc179a7E1b2dA8BBa43efc2a01FED5c05BcC870c',
    tokenA: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    tokenB: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    erc: true,
    decimalA: 18,
    decimalB: 18,
  },
  {
    name: 'FXRP/YFLR',
    address: '0xBd1636272f59bbF303CB0e53Da28eEd28CCaF6ae',
    tokenA: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    tokenB: '0x3018cD9E6b892308D9e3f3429C2006996c270375',
    erc: true,
    decimalA: 18,
    decimalB: 18,
  },
  {
    name: 'YFIN/xUSD',
    address: '0xd360a444e297a44c5a2d9d3733795459774DdAC8',
    tokenA: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    tokenB: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'YFIN/FLTC',
    address: '0x318599CEbC039Cf45eB6B8E7B849C1D64d570B09',
    tokenA: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    tokenB: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'YFIN/FDOGE',
    address: '0xb2DBd964EFB5282B0FfA3352B73DEA6a7A030fd7',
    tokenA: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    tokenB: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'FXRP/YFIN',
    address: '0x16B4Fb3de3cD3B1c8D44da99e341f0D0E8Ac0935',
    tokenA: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    tokenB: '0x3bC342EA8C7f48a2FFC97Bad034342E2EbC65846',
    erc: true,
    decimalA: 18,
    decimalB: 18,
  },
  {
    name: 'FXRP/xUSD',
    address: '0x6eBE4e6373c046E924CCc5Fb32F53a34cB1Ecad1',
    tokenA: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    tokenB: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'FXRP/FLTC',
    address: '0x78244bDae1D168AB28fE44f1e9B662A4643E0Da5',
    tokenA: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    tokenB: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'FXRP/FDOGE',
    address: '0x00381362C068AE16f14cd733B12FE30cE6829dC6',
    tokenA: '0xD43b5f8871435e1d9CE3bf7CDeffd261D803C45A',
    tokenB: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6',
    erc: true,
    decimalA: 18,
    decimalB: 6,
  },
  {
    name: 'FLTC/FDOGE',
    address: '0xE5385c85c24422aBf93968f71eB1D3f293E61412',
    tokenA: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    tokenB: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6',
    erc: true,
    decimalA: 6,
    decimalB: 6,
  },
  {
    name: 'FLTC/xUSD',
    address: '0x9264e7E4385641AbA9Bc1B817600b04844AE8eEB',
    tokenA: '0x57A252a90F58457863026eD92188739FFca9d8FB',
    tokenB: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    erc: true,
    decimalA: 6,
    decimalB: 6,
  },
  {
    name: 'FDOGE/xUSD',
    address: '0x4E132B82F321cE8d418AB0339eb63A89Ac5A500B',
    tokenA: '0x903dfC745Fb3cA50cC41393D7D822407950d0Da6',
    tokenB: '0x0658FA064aca71Ec54bA884ea1B3a9538a87c010',
    erc: true,
    decimalA: 6,
    decimalB: 6,
  },
]


//pairs javascript
let pairs = newlist;


//currencies variables in index.js
let currencies = {}

for(let i = 0; i < pairs.length; i++) {
    let symbols = pairs[i].name.split('/')
    currencies[symbols[0]] = pairs[i].tokenA,
    currencies[symbols[1]] = pairs[i].tokenB
}

//Pairs variable in index.js
let pairstwo = [];
console.log(currencies);

for(let i = 0; i < pairs.length; i++) {
    let symbols = pairs[i].name.split('/')
    pairstwo.push({
        pair: [symbols[0], symbols[1]],
        value: pairs[i].address
    })
}
console.log(pairstwo)