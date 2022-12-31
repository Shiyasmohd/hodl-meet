import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Home from '../components/Home/Home';
import MyNftsPage from '../components/My Nfts /MyNftsPage';
import LoginPage from '../components/Login/LoginPage';


export default function Main() {

  const { isConnected } = useAccount()
  const router = useRouter()

  if(isConnected){
    return <MyNftsPage/>
  }else{
    return <LoginPage/>
  }
  

}
Home