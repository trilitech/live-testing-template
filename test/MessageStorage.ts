import {
  loadFixture
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { MessageStorage } from "../typechain-types";
import { developmentChains, messageStorageAddresses } from "../helper-hardhat-config";

if (developmentChains.includes(network.name)) {
  // ------------ Local execution testing ------------
  describe("MessageStorage (local)", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployFixture() {
      const INITIAL_MESSAGE = "I am the first message.";
      const NEW_MESSAGE = "I am the new message.";

      // Contracts are deployed using the first signer/account by default
      const [owner] = await ethers.getSigners();
  
      const MessageStorage = await ethers.getContractFactory("MessageStorage");
      const messageStorage = await MessageStorage.deploy(INITIAL_MESSAGE);
  
      return { owner, messageStorage, INITIAL_MESSAGE, NEW_MESSAGE };
    }

    describe("Deployment", function () {
      it("Should set the right initial message", async function () {
        const { messageStorage, INITIAL_MESSAGE } = await loadFixture(deployFixture);

        expect(await messageStorage.message()).to.equal(INITIAL_MESSAGE);
      });
    });

    describe("Changing message", function () {
      it("Should set the new message", async function () {
        const { messageStorage, NEW_MESSAGE } = await loadFixture(deployFixture);

        await messageStorage.setMessage(NEW_MESSAGE);
        expect(await messageStorage.message()).to.equal(NEW_MESSAGE);
      });
    });
  });

} else {
  // ------------ Live execution testing ------------
  describe("MessageStorage (live)", function () {
    let messageStorage: MessageStorage;

    // Can't use fixture outside of local execution
    before(async () => {
      const [owner] = await ethers.getSigners();
      // Retrieve the contract address from the helper-hardhat-config.ts file
      const contractAddress = messageStorageAddresses[network.name];
      if (contractAddress == undefined || contractAddress == "") {
        console.error(`Contract address invalid: ${contractAddress}`);
        // revert the execution
        throw new Error('Invalid contract address');
      }
      messageStorage = await ethers.getContractAt("MessageStorage", contractAddress, owner);
    });

    describe("Changing message on testnet", function () {
      it("Should set the new message", async function () {
        const currenteDate = new Date().toLocaleString("en"); // specify the local using "fr", "en" etc

        await (await messageStorage.setMessage(currenteDate)).wait();
        expect(await messageStorage.message()).to.equal(currenteDate);
      });
    });
  });
}