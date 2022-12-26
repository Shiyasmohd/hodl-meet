import { Alchemy,Network } from "alchemy-sdk";
import { useEffect } from "react";
import { useAccount } from "wagmi"

const MyNftsPage = () =>{

    const { address } = useAccount()

    const settings = {
        apiKey: "XJGba_276DL4PbhTatwua0M4t4k5J5dU", // Replace with your Alchemy API Key.
        network: Network.MATIC_MAINNET, // Replace with your network.
      };
      
      const alchemy = new Alchemy(settings);
      
      const fetchNfts = async() =>{
          // Print owner's wallet address:
          console.log("fetching NFTs for address:", address);
          console.log("...");
          
          // Print total NFT count returned in the response:
          const nftsForOwner = await alchemy.nft.getNftsForOwner(`0x${address?.slice(2,)}`);
          console.log("number of NFTs found:", nftsForOwner);
          console.log("...");

      }

    useEffect(()=>{
        fetchNfts()
    },[])

    return(
        <div className="w-full">
            <button onClick={fetchNfts}>
                Fetch data
            </button>
        </div>
    )
}

export default MyNftsPage