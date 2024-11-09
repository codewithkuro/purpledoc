"use client";

import GovernanceComponent from "../components/verax/GovernanceComponent";
import { Web3Provider } from "../components/verax/Web3Provider";

export default function GovernancePage() {
  return (
    <Web3Provider>
      <GovernanceComponent />
    </Web3Provider>
  );
}
