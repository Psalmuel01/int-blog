import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Post from "./pages/Post";
import PostFull from "./pages/PostFull";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
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
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// const { address } = await connect({
//   connector: new InjectedConnector(),
// });
// const ensName = await fetchEnsName({ address });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/post/:postId",
    element: <PostFull />,
  },
]);

function App() {
  return (
    <div>
      <WagmiConfig config={config}>
        <RainbowKitProvider coolMode chains={chains}>
          <ToastContainer />
          <div className="relative isolate px-6 pt-6 lg:px-8">
            <Header />
            <RouterProvider router={router} />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
