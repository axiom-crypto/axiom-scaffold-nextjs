import compiledCircuit from "../../../axiom/data/compiled.json";
import inputs from "../../../axiom/data/inputs.json";
import AverageBalanceAbi from "../abi/AverageBalance.json";
import { chainIdToExplorerBaseUrl, getRpcUrlClientSide } from "../utils";

export const PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
export const SOURCE_CHAIN_ID = "11155111";

export const WebappSettings = {
  compiledCircuit,
  inputs,
  rpcUrl: getRpcUrlClientSide(SOURCE_CHAIN_ID),
  chainId: SOURCE_CHAIN_ID,
  callbackTarget: "0x50F2D5c9a4A35cb922a631019287881f56A00ED5",
  callbackAbi: AverageBalanceAbi,
  explorerBaseUrl: chainIdToExplorerBaseUrl(SOURCE_CHAIN_ID),
}

if (WebappSettings.rpcUrl === "") {
  throw new Error(`Please set the NEXT_PUBLIC_RPC_URL_${SOURCE_CHAIN_ID} environment variable to a valid provider URI.`);
}

if (WebappSettings.callbackTarget === "") {
  throw new Error("AverageBalance contract has not yet been deployed on this chain. Deploy it first and insert the deployed contract address into the `WebappSettings.callbackTarget` variable.");
}
