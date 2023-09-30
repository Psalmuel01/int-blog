import Header from "./components/Header";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Home from "./components/Home";

const { chains, publicClient } = configureChains(
  [base, sepolia],
  [
    alchemyProvider({ apiKey: "Zi_F-3fTztPtozvm58nBdd21noBes10h" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Int Blog",
  projectId: "082cc0ea987ee9c208e2e9946db7184b",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <Header />
        <main>
          <Home />
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
