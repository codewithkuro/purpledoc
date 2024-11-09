import { useEffect, useState } from "react";

// eslint-disable-next-line import/no-unresolved
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useEnsName } from "wagmi";

const ConnectWallet = () => {
  const [truncatedAddress, setTruncatedAddress] = useState();

  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  useEffect(() => {
    if (address) {
      setTruncatedAddress(
        `${address.slice(0, 6)}••••${address.slice(address.length - 4, address.length)}`,
      );
    }
  }, [address]);

  return (
    <button onClick={() => open()} className={"connect-wallet"}>
      {isConnected ? (ensName ?? truncatedAddress) : "CONNECT WALLET"}
    </button>
  );
};

export default ConnectWallet;
