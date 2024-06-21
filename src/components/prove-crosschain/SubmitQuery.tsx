"use client";

import { useEffect, useState } from "react";
import {
  useWatchContractEvent,
  useWriteContract,
  useSimulateContract,
} from "wagmi";
import Button from "../ui/Button";
import Decimals from "../ui/Decimals";
import { useRouter } from "next/navigation";
import { formatEther, formatUnits } from "viem";
import Link from "next/link";
import { useAxiomCrosschainCircuit } from '@axiom-crypto/react';
import { WebappSettings } from "@/lib/settings-crosschain/webappSettings";

export default function SubmitQuery() {
  const router = useRouter();
  const { builtQuery } = useAxiomCrosschainCircuit();
  const [showExplorerLink, setShowExplorerLink] = useState(false);

  // Prepare hook for the sendQuery transaction
  // Note: builtQuery should not be null because we check this in BuildQuery.tsx
  const { data } = useSimulateContract({
    ...builtQuery!,
    address: builtQuery!.address as `0x${string}`,
  });
  const { writeContract, isSuccess, isError, isPending } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setShowExplorerLink(true);
      }, 15000);
    }
  }, [isSuccess, setShowExplorerLink]);

  // Monitor contract for `AxiomV2Call` event
  useWatchContractEvent({
    address: WebappSettings.callbackTarget as `0x${string}`,
    abi: WebappSettings.callbackAbi,
    eventName: 'AxiomV2Call',
    onLogs: (logs) => {
      let topics = logs[0].topics;
      // check that the queryId is the same as the one we just sent
      if (topics[3] && builtQuery?.queryId && BigInt(topics[3]) === BigInt(builtQuery?.queryId)) {
        let txHash = logs[0].transactionHash;
        router.push(`success/?txHash=${txHash}`);
      }
    },
  });

  const renderButtonText = () => {
    if (isSuccess) {
      return "Waiting for callback...";
    }
    if (isPending) {
      return "Confirm transaction in wallet...";
    }
    return "Submit query";
  }

  const renderClaimProofCostText = () => {
    return (
      <div className="flex flex-col items-center text-xs text-midtone mt-2">
        <div>
          {"Generating the proof for this query costs up to "}
          <Decimals>
            {formatEther(BigInt(builtQuery?.value ?? 0)).toString()}
          </Decimals>
          {" ETH"}
        </div>
        <div>
          {"(Based on a current maxFeePerGas of "}
          <Decimals>
            {formatUnits(builtQuery?.args?.[4]?.maxFeePerGas ?? "0", 9).toString()}
          </Decimals>
          {" gwei)"}
        </div>
      </div>
    )
  }

  const renderExplorerLink = () => {
    if (!showExplorerLink) {
      return null;
    }
    return (
      <Link href={`${WebappSettings.explorerBaseUrl}/query/${builtQuery?.queryId}`} target="_blank">
        View status on Axiom Explorer
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        disabled={!Boolean(data?.request)}
        onClick={() => writeContract(data!.request)}
      >
        {renderButtonText()}
      </Button>
      <div className="flex flex-col items-center text-sm gap-2">
        <div>
          {isSuccess ? "Proof generation may take up to 3 minutes" : renderClaimProofCostText()}
        </div>
        {renderExplorerLink()}
      </div>
    </div>
  )
}
