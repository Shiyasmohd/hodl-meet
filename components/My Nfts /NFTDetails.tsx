import { Card, Loading, Row, Text } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import NftCard from "./NftCard";

export type NftDetails = {
    name: string,
    image: string,
    format: string,
    contract: string,

}

const MyNFTDetails = () => {

    const { address } = useAccount()
    const [nftsArr, setNftsArr] = useState<NftDetails[]>([])
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'b3b38e3f-0843-4a7c-8fb3-d899bcada6f5'
        }
    };


    const fetchNfts = async () => {
        let tempArr: NftDetails[] = []
        fetch('https://api.nftport.xyz/v0/accounts/0xA4DA350702f06FB8AdE5eba73cdF63DCbBd3a426?chain=polygon&page_size=50&include=metadata', options)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                response.nfts.map((data: any, index: number) => {
                    // console.log(data)
                    if (data) {
                        tempArr.push({
                            name: data.name,
                            image: data.file_url,
                            format: "image",
                            contract: data.contract_address
                        })
                    }
                })
                // console.log(tempArr)
            })
            .catch(err => console.error(err));

        console.log(tempArr)
        setNftsArr(tempArr)
    }

    useEffect(() => {
        fetchNfts()
    }, [])

    return (
        <div className="w-full p-6 my-0 mx-auto max-w-[800px]">
            <Text h2 className="text-2xl">
                My NFTs
            </Text>
            {
                nftsArr ?
                    <div className="grid grid-cols-2 gap-2 mt-4
                            md:grid-cols-3 md:gap-4">
                        {
                            nftsArr.map((item: NftDetails, index: number) => (
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
                    <Card css={{ mw: "400px", margin: '0 auto' }}>
                        <Card.Body className="w-full flex flex-row justify-center gap-3">
                            <Loading className="w-fit" />
                            <Text className="w-fit tracking-wider">Fetching Nfts</Text>
                        </Card.Body>
                    </Card>
            }
        </div>
    )
}

export default MyNFTDetails