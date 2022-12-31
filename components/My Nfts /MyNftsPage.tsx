import { Card, Loading, Row, Text } from "@nextui-org/react";
import { Alchemy,Network } from "alchemy-sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import { IPFS_BASE_URL } from "../../const/const";
import NftCard from "./NftCard";

export type NftDetails = {
    name: string,
    image: string,
    format: string,
    contract: string,
  
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
        //   const nftsForOwner = await alchemy.nft.getNftsForOwner(`0x${address?.slice(2,)}`);
          
        //     console.log({nftsForOwner});
        const fetchedData = await axios.get(`https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM%3A${address}`)
        console.log(fetchedData.data.items[16]);
        

        fetchedData.data.items.map((data: any,index: number)=>{
            if(data.meta && data.meta.content[0] && data.meta.content[0]['@type']){
                tempArr.push({
                    name: data.meta.name,
                    image: data.meta.content[0].url,
                    format: data.meta.content[0]['@type'],
                    contract: data.contract
                })
            }
        })

        setNftsArr(tempArr)
      }

    useEffect(()=>{
        fetchNfts()
    },[])

    return(
        <div className="w-full p-6 my-0 mx-auto max-w-[800px]">
            <Text h2 className="text-2xl">
                My NFTs
            </Text>
            {
                nftsArr ?
            <div className="grid grid-cols-2 gap-2 mt-4
                            md:grid-cols-3 md:gap-4">
                {
                    nftsArr.map((item: NftDetails, index: number)=>(
                        <NftCard
                            name={item.name}
                            image={item.image}
                            format={item.format}
                            contract={item.contract}
                            key={index}
                            />
                    ))
                     
}
            </div> : 
                <Card css={{ mw: "400px",margin: '0 auto' }}>
                <Card.Body className="w-full flex flex-row justify-center gap-3">
                    <Loading className="w-fit"/>
                    <Text className="w-fit tracking-wider">Fetching Nfts</Text>
                </Card.Body>
                </Card>
                }
        </div>
    )
}

export default MyNftsPage