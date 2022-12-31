import { Navbar, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Layout } from "./Layout";
import { AcmeLogo } from "./AcmeLogo";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import UserImg from '../../public/user.png'

export default function MainNavbar() {

  const router = useRouter()
  const {address} = useAccount()

  const { openAccountModal } = useAccountModal();

  const collapseItems = [
    "Home",
    "My NFTs"
  ];

  return (
    <Layout>
      <Navbar isBordered variant="sticky" className={router.asPath=='/login' ? "hidden" : ""}> 
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            HODL MEET
          </Text>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
        >
          <Navbar.Link 
            isActive={router.asPath=='/'} 
            href="/">
              Home
            </Navbar.Link>
          <Navbar.Link 
            isActive={router.asPath=='/my-nfts'} 
            href="/my-nfts">
              My NFTs
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://ipfs.filebase.io/ipfs/QmSNcmR3JRAqeAJxo87rwjXb7E2vtuh8RM6ejEAwzYwHGU"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {address?.slice(0,8)}...{address?.slice(-8,)}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider  color="error">
                <div onClick={openAccountModal}>
                    Log Out
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
            <Navbar.CollapseItem
              activeColor="primary"
              isActive={router.asPath=='/'} 
              onClick={()=>router.push('/')}
            >
                Home
            </Navbar.CollapseItem>
            <Navbar.CollapseItem
              activeColor="primary"
              isActive={router.asPath=='/my-nfts'} 
              onClick={()=>router.push('/my-nfts')}
            >
                My NFTs
            </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
