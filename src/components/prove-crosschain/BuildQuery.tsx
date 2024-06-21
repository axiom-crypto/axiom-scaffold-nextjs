"use client";

import { useAxiomCrosschainCircuit } from "@axiom-crypto/react";
import { UserInput } from "@axiom-crypto/client";
import { useEffect } from "react";
import LoadingAnimation from "../ui/LoadingAnimation";
import SubmitQuery from "./SubmitQuery";
import { WebappSettings } from "@/lib/settings-crosschain/webappSettings";

export default function BuildQuery({
  inputs,
  callbackTarget,
  callbackExtraData,
  refundee,
}: {
  inputs: UserInput<typeof WebappSettings.inputs>;
  callbackTarget: string;
  callbackExtraData: string;
  refundee: string;
}) {
  const {
    build,
    builtQuery,
    setParams,
    areParamsSet
  } = useAxiomCrosschainCircuit<typeof WebappSettings.inputs>();

  useEffect(() => {
    setParams(inputs, callbackTarget, callbackExtraData, refundee);
  }, [setParams, inputs, callbackTarget, callbackExtraData, refundee]);

  useEffect(() => {
    const buildQuery = async () => {
      if (!areParamsSet) {
        return;
      }
      await build();
    };
    buildQuery();
  }, [build, areParamsSet]);

  if (!builtQuery) {
    return (
      <div className="flex flex-row items-center gap-2">
        {"Building Query"} <LoadingAnimation />
      </div>
    );
  }
  console.log("built query: ", builtQuery);

  return <SubmitQuery />;
}
