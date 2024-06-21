# Axiom Next.js Quickstart

This Axiom Next.js 14 Quickstart provides a barebones framework through which you build full stack dApps on top of Axiom. The Axiom circuit and build files are inside the [axiom/](./axiom/) folder and [src/](./src/) contains a Next.js template.

## Setup

1. Copy `.env.local.example` as a new file named `.env.local`
2. Fill in the values in `.env.local` with your own values
    a. `NEXT_PUBLIC_RPC_URL_[CHAIN_ID]` is your JSON-RPC provider URL (`[CHAIN_ID]` is the chain ID number of the network you are using); you'll need to sign up for a free account with a node provider such as [Alchemy](https://www.alchemy.com/) or [QuickNode](https://www.quicknode.com)
    b. `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is your WalletConnect project ID; you'll need to sign up for a [WalletConnect](https://walletconnect.com/) account
3. Run `npm install` (or `yarn`/`pnpm`) to install dependencies
4. Run `npm run dev` to start the local development server

## Updating Circuit

If you make any changes to your circuit ([./axiom/average.circuit.ts](./axiom/average.circuit.ts)), run `npm run build:circuit` to re-compile your circuit.

## Updating Callback Contract

To use your own callback contract, change the `CALLBACK_CONTRACT` address in [./src/shared/constants.ts](./src/shared/constants.ts), add your ABI to [./src/lib/abi/](./src/lib/abi/), and update the ABI import in [./src/app/prove/page.tsx](./src/app/prove/page.tsx).
