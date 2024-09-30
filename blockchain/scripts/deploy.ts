import { ethers } from "hardhat";
import { Contract, ContractFactory, BaseContract } from "ethers";

async function main(): Promise<void> {
  // Get the contract factory for the NFT contract
  const NFT: ContractFactory = await ethers.getContractFactory("NFT");

  // Deploy the contract
  const nft: BaseContract = await NFT.deploy();

  // Wait for the contract to be deployed
  await nft.waitForDeployment();

  // Log the contract address
  const contractAddress: string = await nft.getAddress();
  console.log("NFT deployed to:", contractAddress);
}

// Execute the main function
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
