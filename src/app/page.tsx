"use client";

import { useState } from "react";
import { ethers } from "ethers";
import NFT_ABI from '../abis/NFT.json';
import Image from "next/image";

const NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [message, setMessage] = useState("");

  // Function to handle minting
  const mintNFT = async () => {
    try {
      // Connect to the local Hardhat network
      const provider = new ethers.JsonRpcProvider("http://localhost:8545");
      const signer = await provider.getSigner(0); // Use the first account provided by Hardhat
      const nftContract = new ethers.Contract(NFT_ADDRESS, NFT_ABI.abi, signer);

      // Call the mint function from your NFT contract
      const transaction = await nftContract.mintNFT(recipient); // Ensure you're passing tokenURI if required
      await transaction.wait();
      
      setMessage("NFT minted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error minting NFT. Please check the console for details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-white">
      <Image
        className="dark:invert"
        src="https://nextjs.org/icons/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      
      <h1 className="text-2xl font-bold text-center text-indigo-600">Mint Your NFT</h1>

      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full max-w-xs p-2 border border-gray-300 rounded text-gray-800 bg-gray-100"
      />
      <input
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        className="w-full max-w-xs p-2 border border-gray-300 rounded text-gray-800 bg-gray-100"
      />

      <button
        onClick={mintNFT}
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2"
      >
        Mint NFT
      </button>

      {message && (
        <p className="text-center text-red-500">{message}</p>
      )}
    </div>
  );
}
