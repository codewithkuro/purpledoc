"use client";
import { useEffect, useState } from "react";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { useAccount } from "wagmi";
import { Button } from "grommet";

const SCHEMA = "(bool identityHasBeenVerified)";

const CreateSchema = ({ veraxSdk, getTxHash, getSchemaId }) => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [schemaId, setSchemaId] = useState("");
  const [schemaExists, setSchemaExists] = useState("false");

  const { isConnected } = useAccount();

  useEffect(() => {
    const fetchSchema = async () => {
      const schemaId = await veraxSdk.schema.getIdFromSchemaString(SCHEMA);
      const alreadyExists = await veraxSdk.schema.getSchema(schemaId);
      setSchemaId(schemaId);
      setSchemaExists(alreadyExists);
      getSchemaId(schemaId);
    };

    fetchSchema();
  }, [getSchemaId, veraxSdk.schema]);

  useEffect(() => {}, [veraxSdk.schema]);

  const createSchema = async () => {
    try {
      const receipt = await veraxSdk.schema.create(
        "Purpledoc Personhood Verified Schema",
        "This schema shows that the holder's individual identity has been verified by issuer",
        "http://purpledoc.codegarage.cloud",
        SCHEMA,
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
  };

  return (
    <>
      <Button
        onClick={createSchema}
        disabled={!isConnected || schemaExists}
        label="Send transaction"
      ></Button>
      {schemaExists && <p>{`Schema already exists, with ID ${schemaId} !`}</p>}
      {txHash !== "" && <p>{`Transaction with hash ${txHash} sent!`}</p>}
      {error !== "" && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default CreateSchema;
