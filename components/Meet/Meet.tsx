import { useEffect, useState } from "react";

import { useRouter } from 'next/router'

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";
import { Button, CSS } from "@nextui-org/react";
import { useAccount } from "wagmi";

const MeetPage = () =>  {
  const router = useRouter();
  const contract = router.query.contract;
  console.log(contract)
 // const [walletAddress, setWalletAddress] = useState("");
  const { address } = useAccount()
  const iframeConfig: IframeConfig = {
    roomUrl: "https://iframe.huddle01.com/"+{contract},
    height: "600px",
    width: "80%",
  
  };
  const ConnectButtonStyles: CSS = {
    background: "linear-gradient(112deg, var(--nextui-colors-cyan600) -63.59%, var(--nextui-colors-pink600) -20.3%, var(--nextui-colors-blue600) 70.46%) !important"
  }

  const reactions = [
    "😂",
    "😢",
    "😦",
    "😍",
    "🤔",
    "👀",
    "🙌",
    "👍",
    "👎",
    "🔥",
    "🍻",
    "🚀",
    "🎉",
    "❤️",
    "💯",
  ];

  useEffect(() => {
    huddleIframeApp.methods.connectWallet(address)

    huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, (data) =>
      console.log({ iframeData: data })
    );
    huddleIframeApp.on(HuddleAppEvent.PEER_LEFT, (data) =>
      console.log({ iframeData: data })
    );
   

  }, []);
  // const participants = huddleIframeApp.infoMethods.getParticipants();
  return (
    <div className="App max-w-[1200px] mx-auto my-0 p-6">
      <div className="container flex flex-col items-center gap-2">
        <div className="">
      
          <div className="w-full flex justify-center flex-wrap">
            {Object.keys(huddleIframeApp.methods)
              .filter((key) => !["sendReaction", "connectWallet"].includes(key))
              .map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    huddleIframeApp.methods[key as HuddleClientMethodName]();
                  }}
                  className=" rounded-2xl cursor-pointer py-2 px-4 m-2 text-white bg-[#0072F5] shadow-2xl "
                >
                  {key}
                </button>
              ))}
          </div>
        </div>

        <HuddleIframe config={iframeConfig} />

        <div className="flex justify-center flex-wrap">
          {reactions.map((reaction) => (
            <button
              key={reaction}
              onClick={() => huddleIframeApp.methods.sendReaction(reaction)}
              className="rounded-2xl cursor-pointer py-2 px-4 m-2 text-white bg-[#0072F5] shadow-2xl"
            >
              {reaction}
            </button>
          ))}
        </div>

        {/* <div className=" flex flex-col gap-4 my-8
                          md:flex-row">
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Wallet Address"
            className="border rounded-md px-3 py-1 border-[#000]"
          />

          <Button
            color="gradient"
            css={ConnectButtonStyles}
            onClick={() => huddleIframeApp.methods.connectWallet(walletAddress)}
            className="shadow-md"
          >
            Connect Wallet
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default MeetPage;
