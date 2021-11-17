const Web3 = require('web3');

const balanceABI = `[
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

const getBalance = async(pair, provider) => {
    
    //const web3 = new Web3(variables.provider);
    
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
    
    const tokenContractA = await new web3.eth.Contract(JSON.parse(balanceABI), pair.tokenA);
    let tokenABalance = await tokenContractA.methods.balanceOf(
        pair.address
    ).call();

    const tokenContractB = await new web3.eth.Contract(JSON.parse(balanceABI), pair.tokenB);
    let tokenBBalance = await tokenContractB.methods.balanceOf(
        pair.address
    ).call();
    
    return {
        tokenABalance,
        tokenBBalance
    };
}

exports.getBalance = getBalance