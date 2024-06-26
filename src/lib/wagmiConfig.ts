import { http, createConfig } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { CHAIN_ID, PROJECT_ID } from './webappSettings';
import { chainIdToViemChain } from './utils';

const metadata = {
  name: 'Axiom Next.js Scaffold',
  description: 'Axiom dApp using Next.js',
  url: 'http://localhost:3000', // origin must match your domain & subdomain
  icons: []
}

export const wagmiConfig = createConfig({
  chains: [chainIdToViemChain(CHAIN_ID)],
  transports: {
    [Number(CHAIN_ID)]: http(process.env[`NEXT_PUBLIC_PROVIDER_URI_${CHAIN_ID}`] as string)
  },
  connectors: [
    walletConnect({ projectId: PROJECT_ID, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ]
});

createWeb3Modal({
  projectId: PROJECT_ID,
  wagmiConfig,
});
