"use client";

import Link from "next/link";
import ConnectWallet from '@/components/web3/ConnectWallet'
import { useAccount, useSwitchChain } from "wagmi";
import SwitchChainButton from "./SwitchChainButton";
import Button from "../ui/Button";
import { WebappSettings } from "@/lib/settings-samechain/webappSettings";

export default function AdvanceStepButton({ label, href, selected, disabled }:{
  label: string,
  href: string,
  selected?: boolean,
  disabled?: boolean,
}) {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  if (!isConnected) {
    return <ConnectWallet />
  }
  if (chainId !== Number(WebappSettings.chainId)) {
    return <SwitchChainButton switchChain={switchChain} />
  }
  return (
    <Link href={href} prefetch={false}>
      <Button>
        { label }
      </Button>
    </Link>
  )
}