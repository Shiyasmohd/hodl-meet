import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home/Home';
import MyNftsPage from '../components/My Nfts /MyNftsPage';


export default function Main() {

  const { isConnected } = useAccount()
  const router = useRouter()
  
  useEffect(()=>{
    if(!isConnected){
      router.push('/login')
    }
  },[isConnected])

  return (
    <MyNftsPage/>
  )
}
Home