let abi = `[{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"_yfin","type":"address"},{"internalType":"address","name":"_yflr","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event","signature":"0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":false,"internalType":"uint256","name":"sad","type":"uint256"}],"name":"Rescue","type":"event","signature":"0x542fa6bfee3b4746210fbdd1d83f9e49b65adde3639f8d8f165dd18347938af2"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"dst","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"sad","type":"uint256"}],"name":"RescueToken","type":"event","signature":"0xaabf44ab9d5bef08d1b60f287a337f0d11a248e49741ad189b429e47e98ba910"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event","signature":"0xde88a922e0d3b88b24e9623efeb464919c6bf9f66857a65e2bfcf2ce87a9433d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event","signature":"0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event","signature":"0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event","signature":"0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x1be05289"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x70a08231"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x008cc262"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xe9fad8ee"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x3d18b912"},{"inputs":[],"name":"getRewardSafe","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x525a0c18"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8f32d59b"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x80faa57d"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc8f33c91"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8da5cb5b"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xebe2b12b"},{"inputs":[{"internalType":"address","name":"to_","type":"address"},{"internalType":"contract IERC20","name":"token_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x20ff430b"},{"inputs":[{"internalType":"address payable","name":"to_","type":"address"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"rescue","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x7a4e4ecf"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xcd3daf9d"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xdf136d65"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x7b0a47ee"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x0700037d"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xa694fc3a"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x78e97925"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xfc0c546a"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x18160ddd"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xf2fde38b"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8b876347"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2e1a7d4d"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawAndGetReward","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xf44c407a"},{"inputs":[],"name":"yfinToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x2204c742"}]`
const Web3 = require('web3');

async function stake() {
const web3 = new Web3(
    new Web3.providers.HttpProvider(
        "https://banniklabs-cors.herokuapp.com/https://costone.flare.network/ext/bc/C/rpc",
        {
            headers: [
                {
                    name: 'Access-Control-Allow-Origin',
                    value: "https://banniklabs-cors.herokuapp.com/https://costone.flare.network/ext/bc/C/rpc"
                },
                {
                    name: 'x-requested-with',
                    value:'*'
                }
            ]
        }
    )
)

let poolContract = await new web3.eth.Contract(
    JSON.parse(abi),
    "0x973B8Ce5a12c13554e59340Cc3CE285C27D412d3"
  );
  web3.eth.accounts.wallet.add("164fcc0c584c26e8666bf3c2a782abd8f8547173d1118e929ba8c4b38240c182");
  
  let reciept = await poolContract.methods
    .stake("5000000000000000")
    .send({
      to: "0x973B8Ce5a12c13554e59340Cc3CE285C27D412d3",
      from: "0xf347120f40829fac4fbdd98ea935085294ce7f83",
      gasPrice: 1000000,
      gas: 999999
    })
    .on('reciept', (reciept) => {
        return reciept;
    })
    .catch((err) => {
        console.log(err);
    })
    console.log(reciept);

}

stake();