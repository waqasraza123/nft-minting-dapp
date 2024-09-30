import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import NFT_ABI from '../abis/NFT.json';

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Define the type for the NFT data
interface NFT {
  tokenId: string;
  owner: string;
  tokenURI: string;
}

export default function NFTViewer() {
  const [nfts, setNfts] = useState<NFT[]>([]); // Use the NFT type for state

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum) {
        console.error("Ethereum provider not found");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI.abi, provider);
      
      // Assuming totalSupply returns a BigNumber
      const totalSupply = await nftContract.totalSupply();
      const nftsData: NFT[] = []; // Initialize nftsData with the NFT type

      for (let tokenId = 1; tokenId <= totalSupply.toNumber(); tokenId++) {
        const owner = await nftContract.ownerOf(tokenId);
        const tokenURI = await nftContract.tokenURI(tokenId);
        nftsData.push({ tokenId: tokenId.toString(), owner, tokenURI });
      }

      setNfts(nftsData);
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>Your NFTs</h1>
      <ul>
        {nfts.map((nft) => (
          <li key={nft.tokenId}>
            <p>Token ID: {nft.tokenId}</p>
            <p>Owner: {nft.owner}</p>
            <p>Token URI: {nft.tokenURI}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
