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
          <DocumentPpt size="xlarge" color="brand" />
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

          <Paragraph>3. Create a Portal</Paragraph>
          <Box background="light-1" width="medium">
            <CreatePortal veraxSdk={veraxSdk} getTxHash={handlePortalTx} />
          </Box>

          <Paragraph fill>
            The application and the page you are currently viewing is the
            default page that is created after bootstrapping a Next.js with{" "}
            <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
              Create Next App
            </Anchor>
          </Paragraph>

          <Paragraph fill>
            To the default Create Next App application we added the grommet
            dependency, and replaced the HTML tags with actual grommet
            components, as a result you are viewing the same default page, with
            only Grommet components.
          </Paragraph>

          <Paragraph fill>
            Feel free to shoot the Grommet team any feedback and questions by
            using this page footer contact info.
          </Paragraph>

          <Paragraph fill>
            Get started by editing <code>pages/index.js</code>
          </Paragraph>

          <Box>
            <Anchor href="https://nextjs.org/docs">
              <Heading level={3}>Documentation &rarr;</Heading>
            </Anchor>
            <Paragraph>
              Find in-depth information about Next.js features and API.
            </Paragraph>

            <Anchor href="https://nextjs.org/learn">
              <Heading level={3}>Learn &rarr;</Heading>
            </Anchor>
            <p>Learn about Next.js in an interactive course with quizzes!</p>

            <Anchor href="https://github.com/vercel/next.js/tree/master/examples">
              <Heading level={3}>Examples &rarr;</Heading>
            </Anchor>
            <Paragraph>
              Discover and deploy boilerplate example Next.js projects.
            </Paragraph>

            <Anchor href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
              <Heading level={3}>Deploy &rarr;</Heading>
            </Anchor>
            <Paragraph>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Paragraph>
          </Box>

          <Anchor
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Powered by Vercel
          </Anchor>
        </Box>
        <Footer
          background="light-2"
          pad={{ vertical: "small", horizontal: "medium" }}
        >
          {/* <Anchor href="https://github.com/ShimiSun">
            <Avatar src={gravatarLink} />
          </Anchor>
          <Nav direction="row" align="center">
            <Anchor
              a11yTitle="Reach out to the Grommet Community on Slack"
              href="https://slack-invite.grommet.io/"
              icon={<Slack color="plain" />}
              target="_blank"
              rel="noreferrer noopener"
            />
            <Anchor
              a11yTitle="Github repository"
              href="https://github.com/grommet/nextjs-boilerplate"
              icon={<Github color="black" />}
              target="_blank"
              rel="noreferrer noopener"
            />
          </Nav> */}
        </Footer>
      </Box>
    </Page>
  );
}
