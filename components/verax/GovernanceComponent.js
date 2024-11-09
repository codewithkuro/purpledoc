"use client";
import { useEffect, useState } from "react";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import ConnectWallet from "./ConnectWallet";
import IssueAttestation from "./IssueAttestation";
import AttestationPreview from "./AttestationPreview";
import { waitForTransactionReceipt } from "viem/actions";
import CreateSchema from "./CreateSchema";
import CreatePortal from "./CreatePortal";
import { useAccount } from "wagmi";
import { wagmiConfig } from "../../config/wagmiConfig";
import { Box, Heading, Page, PageHeader, PageBody, Text } from "grommet";

export default function GovernanceComponent() {
  const [veraxSdk, setVeraxSdk] = useState();
  const [schemaId, setSchemaId] = useState();
  const [portalId, setPortalId] = useState();
  const [attestationId, setAttestationId] = useState();

  const { address, isConnected, chain } = useAccount();

  // useEffect(() => {
  //   document.title = title;
  // }, [title]);

  useEffect(() => {
    if (chain && address) {
      let sdkConf;
      switch (chain.id) {
        case 8453:
          sdkConf = VeraxSdk.DEFAULT_BASE_FRONTEND;
          break;
        case 84532:
          sdkConf = VeraxSdk.DEFAULT_BASE_SEPOLIA_FRONTEND;
          break;
        case 59144:
          sdkConf = VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND;
          break;
        case 59141:
          sdkConf = VeraxSdk.DEFAULT_LINEA_SEPOLIA_FRONTEND;
          break;
        case 42161:
          sdkConf = VeraxSdk.DEFAULT_ARBITRUM_FRONTEND;
          break;
        case 421614:
          sdkConf = VeraxSdk.DEFAULT_ARBITRUM_SEPOLIA_FRONTEND;
          break;
        default:
          sdkConf = VeraxSdk.DEFAULT_LINEA_SEPOLIA_FRONTEND;
          break;
      }
      const sdk = new VeraxSdk(sdkConf, address);
      setVeraxSdk(sdk);
    }
  }, [chain, address]);

  const handleSchemaTx = async (hash) => {
    const receipt = await waitForTransactionReceipt(wagmiConfig.getClient(), {
      hash,
    });
    setSchemaId(receipt.logs[0].topics[1]);
  };

  const handlePortalTx = async (hash) => {
    const receipt = await waitForTransactionReceipt(wagmiConfig.getClient(), {
      hash,
    });
    const decodedLogs = decodeEventLog({
      abi: parseAbi([
        "event PortalRegistered(string name, string description, address portalAddress)",
      ]),
      data: receipt.logs[0].data,
      topics: receipt.logs[0].topics,
    });
    setPortalId(decodedLogs.args.portalAddress);
  };

  const handleAttestationTx = async (hash) => {
    const receipt = await waitForTransactionReceipt(wagmiConfig.getClient(), {
      hash,
    });
    setAttestationId(receipt.logs[0].topics[1]);
  };

  return <ConnectWallet />;
}
