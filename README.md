# Live testing template

This project is a basic Hardhat project used to live test smart contracts deployed. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Usage

If you want to deploy and live test a contract, follow these steps:

1. Deploy the contract
2. Add the network and address of the contract in the file `helper-hardhat-config.ts`
3. Run the test with the network flag

The commands are:

```shell
npx hardhat run scripts/deploy.ts --network <your-network>
// add the address of the contract in helper-hardhat-config.ts with the network
npx hardhat test --network <your-network>
```

The live test could take some time because each transaction will have to be added in a block on chain so it could take 15s each time you make a transaction, be patient!

You can also run all the tests with gas information:

```shell
REPORT_GAS=true npx hardhat test
```
