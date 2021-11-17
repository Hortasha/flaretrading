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

const getMyBalance = async(token, provider, address) => { 

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
    

    const tokenContract = await new web3.eth.Contract(JSON.parse(balanceABI), token);
    let tokenBalance = await tokenContract.methods.balanceOf(
        address
    ).call();
    
    return tokenBalance;
}

exports.getMyBalance = getMyBalance