import { createPublicClient, http } from 'viem'
import { WebappSettings } from './webappSettings';
import { chainIdToViemChain } from '../utils';

export const sourcePublicClient = createPublicClient({
  chain: chainIdToViemChain(WebappSettings.chainId),
  transport: http(WebappSettings.rpcUrl),
});
