import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAccount } from "wagmi"
import LoginPage from "../components/Login/LoginPage"

const Login = () =>{

    const { isConnected } = useAccount()
    const router = useRouter()
    
    useEffect(()=>{
        if(isConnected){
        router.push('/')
        }
    },[isConnected])
    

    return(
        <LoginPage/>
    )
}

export default Login