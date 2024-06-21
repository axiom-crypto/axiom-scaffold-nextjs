"use client";

import Title from '@/components/ui/Title'
import { forwardSearchParams } from '@/lib/utils'
import AdvanceStepButton from '@/components/buttons-samechain/AdvanceStepButton';
import CodeBox from '@/components/ui/CodeBox';
import { useAccount } from 'wagmi';

export default function Home() {
  const { address } = useAccount();

  let compiledCircuit;
  try {
    compiledCircuit = require("../../axiom/data/compiled.json");
  } catch (e) {
    console.log(e);
  }
  if (compiledCircuit === undefined) {
    return (
      <>
        <div>
          Compile circuit first by running in the root directory of this project:
        </div>
        <CodeBox>
          {"npx axiom circuit compile app/axiom/average.circuit.ts"}
        </CodeBox>
      </>
    )
  }

  return (
    <>
      <Title>
        Average Balance Proof
      </Title>
      <div className="text-center">
        Access your average ETH balance over 8 evenly spaced blocks in the last 24 hours.
      </div>
      <AdvanceStepButton
        label="Generate Proof"
        href={"/prove?" + forwardSearchParams({ connected: address })}
      />
    </>
  )
}