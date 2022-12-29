import Image from "next/image"
import { NftDetails } from "./MyNftsPage"
import styles from '../../styles/MyNft.module.css'

const NftCard = (props: NftDetails) =>{
    return(
        <div className={` ${styles.nftCard} w-full rounded-2xl shadow-md border`} onClick={()=>console.log(props.format)}>
            <div className="w-full h-[150px] rounded-2xl flex justify-center items-center overflow-hidden
                            md:h-[225px]">
                {
                    props.format == "mp4" ?
                    <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                        <source src={props.image} />
                    </video>
                    :
                    <Image src={props.image} width={500} height={500}  alt=""/>
                }
                
            </div>
            <div className="w-full px-4">
                {props.name}
            </div>
        </div>
    )
}

export default NftCard