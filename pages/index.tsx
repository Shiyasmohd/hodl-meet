import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home/Home';


export default function Main() {

  const { isConnected } = useAccount()
  const router = useRouter()
  
  useEffect(()=>{
    if(!isConnected){
      router.push('/login')
    }
  },[isConnected])

  return (
    <Home/>
  )
}
Home