import { Card, Row, Text } from "@nextui-org/react";
import { Alchemy,Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import NftCard from "./NftCard";

export type NftDetails = {
    name: string,
    image: string,
    format: string
}

const MyNftsPage = () =>{

    const { address } = useAccount()
    const [nftsArr,setNftsArr] = useState<NftDetails[]>([])

    const settings = {
        apiKey: "XJGba_276DL4PbhTatwua0M4t4k5J5dU", // Replace with your Alchemy API Key.
        network: Network.MATIC_MAINNET, // Replace with your network.
      };
      
      const alchemy = new Alchemy(settings);
      
      const fetchNfts = async() =>{
          let tempArr: NftDetails[] = []
          const nftsForOwner = await alchemy.nft.getNftsForOwner(`0x${address?.slice(2,)}`);
          
            console.log({nftsForOwner});
            

          nftsForOwner.ownedNfts.map((data: any,index: number)=>{
            if(data.title){
                tempArr.push({
                    name: data.title,
                    image: data.rawMetadata.image,
                    format: data.media[0].format
                })
            }
            setNftsArr(tempArr)
          })
      }

    useEffect(()=>{
        fetchNfts()
    },[])

    return(
        <div className="w-full p-6 my-0 mx-auto max-w-[800px]">
            <Text h2 className="text-2xl">
                My NFTs
            </Text>
            <div className="grid grid-cols-2 gap-2 mt-4
                            md:grid-cols-3 md:gap-4">
                {
                    nftsArr ?
                    nftsArr.map((item: NftDetails, index: number)=>(
                        <NftCard
                            name={item.name}
                            image={item.image}
                            format={item.format}
                            key={index}
                            />
                    ))
                    : ""
                }
            </div>
        </div>
    )
}

export default MyNftsPage