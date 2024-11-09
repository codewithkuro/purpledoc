import { useState } from "react";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { useAccount } from "wagmi";
import { Button } from "grommet";

const IssueAttestation = ({ veraxSdk, getTxHash, schemaId, portalId }) => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const { address, isConnected } = useAccount();

  const issueAttestation = async () => {
    if (address) {
      try {
        const receipt = await veraxSdk.portal.attest(
          portalId,
          {
            schemaId,
            expirationDate: Math.floor(Date.now() / 1000) + 2592000,
            subject: address,
            attestationData: [{ hasCompletedTutorial: true }],
          },
          [],
        );
        if (receipt.transactionHash) {
          setTxHash(receipt.transactionHash);
          getTxHash(receipt.transactionHash);
        } else {
          setError(`Oops, something went wrong!`);
        }
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          setError(`Oops, something went wrong: ${e.message}`);
        }
      }
    }
  };

  return (
    <>
      <Button
        onClick={issueAttestation}
        disabled={!isConnected}
        label="Send transaction"
      ></Button>
      {txHash !== "" && <p>{`Transaction with hash ${txHash} sent!`}</p>}
      {error !== "" && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default IssueAttestation;
