// eslint-disable-next-line import/no-unresolved
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { wagmiConfig, walletConnectProjectId } from "../../config/wagmiConfig";
import { lineaSepolia } from "wagmi/chains";
import BaseMainnetIcon from "./assets/base-mainnet.svg";
import BaseSepoliaIcon from "./assets/base-sepolia.svg";
import LineaMainnetIcon from "./assets/linea-mainnet.svg";
import LineaSepoliaIcon from "./assets/linea-sepolia.svg";
import ArbitrumMainnetIcon from "./assets/arbitrum-mainnet.svg";
import ArbitrumSepoliaIcon from "./assets/arbitrum-sepolia.svg";

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig,
  projectId: walletConnectProjectId,
  enableAnalytics: true,
  defaultChain: lineaSepolia,
  chainImages: {
    8453: BaseMainnetIcon,
    84_532: BaseSepoliaIcon,
    59_144: LineaMainnetIcon,
    59_141: LineaSepoliaIcon,
    42_161: ArbitrumMainnetIcon,
    421_614: ArbitrumSepoliaIcon,
  },
});

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
