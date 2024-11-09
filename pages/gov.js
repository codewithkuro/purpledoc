"use client";

import Head from "next/head";

import GovernanceComponent from "../components/verax/GovernanceComponent";
import { Web3Provider } from "../components/verax/Web3Provider";

export default function GovPage() {
  return (
    <Web3Provider>
      <Head>
        <title>Purpledoc Passport - Governance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GovernanceComponent />
    </Web3Provider>
  );
}
