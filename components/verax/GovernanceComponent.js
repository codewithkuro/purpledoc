"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import ConnectWallet from "./ConnectWallet";
import IssueAttestation from "./IssueAttestation";
import AttestationPreview from "./AttestationPreview";
import { waitForTransactionReceipt } from "viem/actions";
import CreateSchema from "./CreateSchema";
import CreatePortal from "./CreatePortal";
import { useAccount } from "wagmi";
import { wagmiConfig } from "../../config/wagmiConfig";
import {
  Anchor,
  Box,
  Footer,
  Heading,
  Nav,
  Page,
  PageHeader,
  PageBody,
  Text,
  Paragraph,
  Button,
} from "grommet";
import { Avatar, DocumentPpt, Github, Slack } from "grommet-icons";

export default function GovernanceComponent() {
  const [veraxSdk, setVeraxSdk] = useState();
  const [schemaId, setSchemaId] = useState();
  const [portalId, setPortalId] = useState();
  const [attestationId, setAttestationId] = useState();

  const { address, isConnected, chain } = useAccount();

  const router = useRouter();

  const goBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const gravatarLink =
    "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80";

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

  return (
    <Page kind="narrow">
      <Box
        flex
        margin={{ horizontal: "auto" }}
        width={{ max: "xlarge" }}
        height={{ min: "100%" }}
      >
        <Box flex role="main" pad={{ vertical: "large" }}>
          <Anchor onClick={goBack}>
            <Heading level={4}>Go back</Heading>
          </Anchor>
          <DocumentPpt size="xlarge" color="brand2" />
          <Heading>Purpledoc Passport Governance Centre</Heading>

          <Box size="medium"></Box>
          <Paragraph fill>
            Use this page to create Attestations for your custodians
          </Paragraph>

          <Heading level={3}>Steps</Heading>

          <Paragraph>1. Connect a wallet</Paragraph>
          <Box pad="small" background="light-2" width="small">
            <ConnectWallet />
          </Box>

          <Paragraph>2. Create Attestation Schema</Paragraph>

          {veraxSdk && isConnected && (
            <Box pad="small" background="light-2" width="medium">
              <CreateSchema
                veraxSdk={veraxSdk}
                getTxHash={handleSchemaTx}
                getSchemaId={setSchemaId}
              />
            </Box>
          )}

          {veraxSdk && schemaId && (
            <>
              <Paragraph>3. Create a Portal</Paragraph>
              <Box background="light-1" width="medium">
                <CreatePortal veraxSdk={veraxSdk} getTxHash={handlePortalTx} />
              </Box>
            </>
          )}

          {veraxSdk && schemaId && portalId && (
            <>
              <Paragraph>4. Issue an Attestation</Paragraph>
              <Box background="light-1" width="medium">
                <IssueAttestation
                  veraxSdk={veraxSdk}
                  getTxHash={handleAttestationTx}
                  schemaId={schemaId}
                  portalId={portalId}
                />
              </Box>
            </>
          )}

          {veraxSdk && attestationId && (
            <>
              <Paragraph>Check the issued attestation</Paragraph>
              <Box background="light-1" size="medium">
                {attestationId ? (
                  <AttestationPreview
                    veraxSdk={veraxSdk}
                    attestationId={attestationId}
                  />
                ) : (
                  <Text>Send the transaction and wait for confirmation.</Text>
                )}
              </Box>
            </>
          )}

          <Footer pad={{ vertical: "large" }}>
            <Text size="small">© 2024 Purpledoc Passport</Text>
          </Footer>
        </Box>
      </Box>
    </Page>
  );
}
