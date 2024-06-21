"use client";

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/settings-samechain/wagmiConfig';
import { useEffect, useState } from "react";
import { AxiomCircuitProvider } from "@axiom-crypto/react";
import { WebappSettings } from "@/lib/settings-samechain/webappSettings";

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AxiomCircuitProvider
          compiledCircuit={WebappSettings.compiledCircuit}
          rpcUrl={WebappSettings.rpcUrl}
          chainId={WebappSettings.chainId}
        >
          {mounted && children}
        </AxiomCircuitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
