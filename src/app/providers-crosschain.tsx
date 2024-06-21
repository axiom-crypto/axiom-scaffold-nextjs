"use client";

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/settings-crosschain/wagmiConfig';
import { useEffect, useState } from "react";
import { AxiomCrosschainCircuitProvider } from "@axiom-crypto/react";
import { WebappSettings } from "@/lib/settings-crosschain/webappSettings";
import { BridgeType } from "@axiom-crypto/client/types";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AxiomCrosschainCircuitProvider
          source={{
            chainId: WebappSettings.sourceChainId,
            rpcUrl: WebappSettings.sourceRpcUrl,
          }}
          target={{
            chainId: WebappSettings.targetChainId,
            rpcUrl: WebappSettings.targetRpcUrl,
          }}
          bridgeType={BridgeType.BlockhashOracle}
          compiledCircuit={WebappSettings.compiledCircuit}
        >
          {mounted && children}
        </AxiomCrosschainCircuitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
