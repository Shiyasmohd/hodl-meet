import Image from "next/image"
import { NftDetails } from "./MyNftsPage"
import styles from '../../styles/MyNft.module.css'


const NftCard = (props: NftDetails) =>{


    const getLink = async() =>{
        console.log(props.image)
        // fetch(props.image)
        //     .then(response => {
        //         console.log(response.headers.get("content-type")); // Output: "image/jpeg"
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

    }
    
    return(
        <div className={` ${styles.nftCard} w-full rounded-2xl shadow-md border`} onClick={getLink}>
            <div className="w-full h-[150px] rounded-2xl flex justify-center items-center overflow-hidden
                            md:h-[225px]">
                {
                    props.format == "mp4" || props.image.split('.').pop() == "mp4" ?
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
