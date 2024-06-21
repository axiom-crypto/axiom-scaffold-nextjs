import { createPublicClient, http } from 'viem'
import { WebappSettings } from './webappSettings';
import { chainIdToViemChain } from '../utils';

export const sourcePublicClient = createPublicClient({
  chain: chainIdToViemChain(WebappSettings.sourceChainId),
  transport: http(WebappSettings.sourceRpcUrl),
});

export const targetPublicClient = createPublicClient({
  chain: chainIdToViemChain(WebappSettings.targetChainId),
  transport: http(WebappSettings.targetRpcUrl)
});
