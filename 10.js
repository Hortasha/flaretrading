const mysql = require('mysql');
const { pairs } = require('./pairs');
const { variables } = require('./variables');
const { getBalance } = require('./getBalance');


//SQL connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Kalle123',
  database : 'betatrading'
});
 
connection.connect();

//Get rates function
async function getRates() {

  //Get web3 data
    const pair = pairs[10];
    const pairTokenNames = pair.name.split('/');

    const rates = await getBalance(pair, variables.provider);
    const balanceA = rates.tokenABalance / 10 ** pair.decimalA;
    const balanceB = rates.tokenBBalance / 10 ** pair.decimalB;


    //Convert data and put into INSERT
    let date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);


    const insert = [
      {
        tokenSource: pairTokenNames[0],
        tokenTarget: pairTokenNames[1],
        rate: balanceB / balanceA,
        balanceRaw: rates.tokenABalance,
        balanceToken: rates.tokenABalance / 10 ** pair.decimalA,
        latestTimestamp: date
      },
      {
        tokenSource: pairTokenNames[1],
        tokenTarget: pairTokenNames[0],
        rate: balanceA / balanceB,
        balanceRaw: rates.tokenBBalance,
        balanceToken: rates.tokenBBalance / 10 ** pair.decimalB,
        latestTimestamp: date
      }
    ]

    //UPSERT DATA
    connection.query(`
    INSERT INTO betatrading.rates
    (
      tokenSource,
      tokenTarget,
      rate,
      balanceRaw,
      balanceToken,
      latestTimestamp
    )
    VALUES
    (
      '${insert[0].tokenSource}',
      '${insert[0].tokenTarget}',
      '${insert[0].rate}',
      '${insert[0].balanceRaw}',
      '${insert[0].balanceToken}',
      '${insert[0].latestTimestamp}'
    ),
    (
      '${insert[1].tokenSource}',
      '${insert[1].tokenTarget}',
      '${insert[1].rate}',
      '${insert[1].balanceRaw}',
      '${insert[1].balanceToken}',
      '${insert[1].latestTimestamp}'
    )
    ON DUPLICATE KEY UPDATE
    rate=VALUES(rate),
    balanceRaw=VALUES(balanceRaw),
    balanceToken=VALUES(balanceToken),
    latestTimestamp=VALUES(latestTimestamp);
    `, function (error, results, fields) {
      if (error) throw error;
      //Update Data again in 2 seconds if here.
      setTimeout(() => {
        getRates();
      }, variables.milliseconds);
    });
}


//Start Execution
getRates();