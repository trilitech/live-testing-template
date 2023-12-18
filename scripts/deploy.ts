import { ethers, run, network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
}

async function main() {
  const INITIAL_MESSAGE = "I am the first message.";
  const messageStorage = await ethers.deployContract("MessageStorage", [INITIAL_MESSAGE]);

  await messageStorage.waitForDeployment();

  console.log(`Message storage deployed: ${messageStorage.target}`);
  console.log(`Initial message: ${await messageStorage.message()}`);

  console.log("\nIf you want to live test it, remember to add the address in the helper-hardhat-config.ts file\n");

  // if not a local chain verify the contract
  // it will fail if no etherscan key is provided
  if (!developmentChains.includes(network.name)) {
    messageStorage.deploymentTransaction()!.wait(6);
    await verify(await messageStorage.getAddress(), [INITIAL_MESSAGE]);
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});