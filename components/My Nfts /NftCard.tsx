import Image from "next/image"
import { NftDetails } from "./MyNftsPage"
import styles from '../../styles/MyNft.module.css'
import { useAccount } from "wagmi";

import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

const NftCard = (props: NftDetails) =>{

    const { address } = useAccount()
    const router = useRouter()
    var config = {
        method: 'get',
        url: `https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM%3A${address}`,
        headers: { }
      };
      

      const goToMeetPage = () =>{
        router.push({
            pathname: '/meet',
           query: { contract: props.contract },
        })
      }
    
    
    return(
        <div className={` ${styles.nftCard} w-full rounded-2xl shadow-md border cursor-pointer`} >
            <div className="w-full h-[150px] rounded-2xl flex justify-center items-center overflow-hidden
                            md:h-[225px]">
                {
                    props.format == "VIDEO"  ?
                    <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                        <source src={props.image} />
                    </video>
                    :
                    <img src={props.image} width={500} height={500}  alt=""/>
                }
                
            </div>
            <div className="w-full px-4">
                {props.name}
            <div className="w-full flex justify-center px-2 py-2">
                <button 
                    onClick={goToMeetPage}
                    className="text-white bg-[#2196f3] px-4 py-1 rounded-md hover:scale-110 transition-all">
                    Join Room
                </button>
            </div>
            </div>
        </div>
    )
}

export default NftCard
