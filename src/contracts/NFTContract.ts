import { Contract, ethers } from "ethers"; // Remove providers from the import
import NFT_ABI from '../abis/NFT.json';

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getNFTContract = async (provider: ethers.BrowserProvider) => {
  const signer = await provider.getSigner();
  return new Contract(NFT_ADDRESS, NFT_ABI.abi, signer);
};
