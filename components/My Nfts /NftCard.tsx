import Image from "next/image"
import { NftDetails } from "./MyNftsPage"
import styles from '../../styles/MyNft.module.css'
import { useAccount } from "wagmi";

import { useRouter } from "next/router";

const NftCard = (props: NftDetails) =>{

    const { address } = useAccount()
    const router = useRouter()
    var config = {
        method: 'get',
        url: `https://api.rarible.org/v0.1/items/byOwner?owner=ETHEREUM%3A${address}`,
        headers: { }
      };
      
    
    
    return(
        <div className={` ${styles.nftCard} w-full rounded-2xl shadow-md border cursor-pointer`} onClick={()=>router.push({
            pathname: '/meet',
           query: { contract: props.contract },
        }) } >
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
            </div>
        </div>
    )
}

export default NftCard
