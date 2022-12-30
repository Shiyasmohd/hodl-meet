import { Card, Text } from "@nextui-org/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

const LoginPage = () =>{
    return(
        <div className=" login-page w-full flex justify-center items-center h-screen p-6">
            <Card css={{ mw: "450px",padding: "$10 0" }}>
                <Card.Header>
                    <Text b className="w-full text-center">HODL MEET</Text>
                </Card.Header>
                <Card.Body css={{ py: "$10" }} >
                    <div className="w-full flex flex-col items-center gap-3">
                        <p>Connect Your Wallet to Continue</p>
                        <ConnectButton />
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage
