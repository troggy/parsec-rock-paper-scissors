/* eslint-disable */

const Web3 = require('web3');
const { helpers, Tx } = require('parsec-lib');

const PLASMA_PROVIDER = 'https://testnet-1.parseclabs.org';
const web3 = helpers.extendWeb3(new Web3(PLASMA_PROVIDER));

const faucetPriv =
  '0xfa359762f1ea6c392901857a6c788bedc41a4ff2df96ce1b9b5cf2e800c2dfce';
const faucetAccount = web3.eth.accounts.privateKeyToAccount(faucetPriv);
const alice = web3.eth.accounts.privateKeyToAccount(
  '0xad8e31c8862f5f86459e7cca97ac9302c5e1817077902540779eef66e21f394a'
);
const PRIV1 =
  '0x9b63fe8147edb8d251a6a66fd18c0ed73873da9fff3f08ea202e1c0a8ead7311';
const PRIV2 =
  '0xea3a59a673a9f7e74ad65e92ee04c2330fc5b905d0fa47bb2ae36c0b94af61cd';
const P1 = web3.eth.accounts.privateKeyToAccount(PRIV1);
const P2 = web3.eth.accounts.privateKeyToAccount(PRIV2);

async function transfer(acc, to, value, color) {
  const unspent = await web3.getUnspent(acc.address);
  const inputs = helpers.calcInputs(unspent, acc.address, value, color);
  const outputs = helpers.calcOutputs(
    unspent,
    inputs,
    acc.address,
    to,
    value,
    color
  );

  const tx = Tx.transfer(inputs, outputs).signAll(acc.privateKey);
  return web3.eth.sendSignedTransaction(tx.toRaw());
}

async function run() {
  const gameBalance = await web3.eth.getBalance(
    '0xB549eda70D3765d5E978f2C761650CB29d4683f3'
  );
  console.log(gameBalance);
  // await transfer(P2, '0xB549eda70D3765d5E978f2C761650CB29d4683f3', 1000, 0);
  // const unspent = await web3.getUnspent(alice.address);
  // const inputs = helpers.calcInputs(unspent, alice.address, 1000000, 0);
  // const outputs = helpers.calcOutputs(
  //   unspent,
  //   inputs,
  //   alice.address,
  //   faucetAccount.address,
  //   1000000,
  //   0
  // );
  // const tx = Tx.transfer(inputs, outputs).signAll(alice.privateKey);
  // const txResult = web3.eth.sendSignedTransaction(tx.toRaw());
  // txResult.on('transactionHash', (...args) => {
  //   console.log(args);
  // });
}

run();
