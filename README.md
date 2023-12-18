# Live testing template

This project is a basic Hardhat project used to live test smart contracts deployed. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Usage

### Deploy and live testing

Before going through the process itself and the commands, you need to create a `.env` file with your private key and the RPC URL for the network you want to use. If you want to use multiple networks, add a RPC URL for each of them. You can also add an etherscan key to verify the contract with hardhat but this is optional. Here is what your `.env` should looks like:

```
PRIVATE_KEY=<your-private-key>

SEPOLIA_RPC_URL=<your-sepolia-rpc-url>
ETHERSCAN_API_KEY=<optional-etherscan-key>

MUMBAI_RPC_URL=<your-mumbai-rpc-url>
POLYGONSCAN_API_KEY=<optional-polygonscan-key>

ETHERLINK_RPC_URL=<your-etherlink-rpc-url>
ETHERLINK_API_KEY=YOUCANCOPYME0000000000000000000000
```

If you want to deploy and live test a contract, follow these steps:

1. Deploy the contract
2. Add the network and address of the contract in the file `helper-hardhat-config.ts`
3. Run the test with the network flag

The commands are:

```
npx hardhat run scripts/deploy.ts --network <your-network>
// add the address of the contract in helper-hardhat-config.ts with the network
npx hardhat test --network <your-network>
```

The live test could take some time because each transaction will have to be added in a block on chain so it could take 15s each time you make a transaction, be patient!

### Verify the contract

This is not something mandatory. The verification process is directly added in the deployment script. If it failed during its execution, you can still verify with the command:

```
npx hardhat verify --network <your-network> <address> <constructor parameters>
```

You can have all the details [here]('https://hardhat.org/hardhat-runner/docs/guides/verifying').

### Gas information

You can also run all the tests with gas information: 

```
REPORT_GAS=true npx hardhat test
```
