import BuildQuery from "@/components/prove-samechain/BuildQuery";
import Title from "@/components/ui/Title";
import { bytes32 } from "@/lib/utils";
import { sourcePublicClient } from "@/lib/settings-samechain/viemClient";
import { UserInput } from "@axiom-crypto/client";
import { WebappSettings } from "@/lib/settings-samechain/webappSettings";

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

interface Params {
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function Prove({ searchParams }: PageProps) {
  const connected = searchParams?.connected as string ?? "";

  const blockNumber = await sourcePublicClient.getBlockNumber();

  // We get the user inputs from the URL query parameters and connected wallet
  const inputs: UserInput<typeof WebappSettings.inputs> = {
    blockNumber: Number(blockNumber),
    address: connected,
  }

  return (
    <>
      <Title>
        Prove
      </Title>
      <div className="text-center">
        Please wait while your browser generates a compute proof for the Axiom Query.
      </div>
      <div className="flex flex-col gap-2 items-center">
        <BuildQuery
          inputs={inputs}
          callbackTarget={WebappSettings.callbackTarget}
          callbackExtraData={bytes32(connected)}
          refundee={connected}
        />
      </div>
    </>
  )
}
