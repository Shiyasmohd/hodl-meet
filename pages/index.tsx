import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
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
