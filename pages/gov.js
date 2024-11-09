"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Page,
  Anchor,
  Avatar,
  Box,
  Footer,
  Heading,
  Nav,
  Paragraph,
  Text,
} from "grommet";
import { Github, Slack, DocumentPpt } from "grommet-icons";

import GovernanceComponent from "../components/verax/GovernanceComponent";
import { Web3Provider } from "../components/verax/Web3Provider";

export default function Home() {
  const gravatarLink =
    "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80";
  const router = useRouter();

  const goBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <Web3Provider>
      <Page kind="narrow">
        <Box
          flex
          margin={{ horizontal: "auto" }}
          width={{ max: "xlarge" }}
          height={{ min: "100%" }}
          width={{ max: "xlarge" }}
        >
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

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
              <GovernanceComponent />
            </Box>

            <Paragraph fill>
              The application and the page you are currently viewing is the
              default page that is created after bootstrapping a Next.js with{" "}
              <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                Create Next App
              </Anchor>
              .
            </Paragraph>

            <Paragraph fill>
              To the default Create Next App application we added the grommet
              dependency, and replaced the HTML tags with actual grommet
              components, as a result you are viewing the same default page,
              with only Grommet components.
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
            <Anchor href="https://github.com/ShimiSun">
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
            </Nav>
          </Footer>
        </Box>
      </Page>
    </Web3Provider>
  );
}
