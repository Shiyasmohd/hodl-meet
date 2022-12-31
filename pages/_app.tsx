import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import MainNavbar from '../components/Navbar/Navbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Huddle Hack',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function App({ Component, pageProps }: AppProps) {

  const { isConnected } = useAccount()
  const router = useRouter()
  
  useEffect(()=>{
    if(!isConnected){
      router.push('/login')
    }
  },[isConnected])

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <NextUIProvider>
          <NextNProgress />
          <MainNavbar/>
            <Component {...pageProps} />
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
