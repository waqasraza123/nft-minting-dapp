import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFT_ABI from "../abis/NFT.json";

// Define the structure of the NFT data
interface NftData {
  tokenId: number;
  owner: string;
  tokenURI: string;
}

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your NFT contract address

export default function NFTViewer() {
  // Set the types for useState
  const [nftData, setNftData] = useState<NftData | null>(null); // `nftData` can be null initially
  const [ownerAddress, setOwnerAddress] = useState<string>("0x2b9B81eA7Dcb961BA3de7f1D7e49061a483eb174");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        // Connect to the local Ganache network (on port 8547)
        const provider = new ethers.JsonRpcProvider("http://localhost:8547"); 
        const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI.abi, provider);

        // Get the balance of NFTs for this owner address
        const balance: ethers.BigNumber = await nftContract.balanceOf(ownerAddress);
        console.log(`Owner balance: ${balance.toString()}`);

        if (balance.gt(0)) {  // Use BigNumber's gt method to compare values
          const tokenId = 1; // Assuming it's the first minted NFT
          const owner: string = await nftContract.ownerOf(tokenId);
          const tokenURI: string = await nftContract.tokenURI(tokenId);

          setNftData({ tokenId, owner, tokenURI });
        } else {
          setMessage("This address doesn't own any NFTs.");
        }
      } catch (error: any) {
        console.error("Error fetching NFT data:", error);
        setMessage("Error fetching NFT data. Please check the console.");
      }
    };

    fetchNFTData();
  }, [ownerAddress]);

  return (
    <div>
      <h1>View NFT</h1>
      {nftData ? (
        <div>
          <p>Owner: {nftData.owner}</p>
          <p>Token ID: {nftData.tokenId}</p>
          <p>Token URI: {nftData.tokenURI}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
