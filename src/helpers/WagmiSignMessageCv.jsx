import { useAccount, useConnect, useDisconnect } from "wagmi";

import { WagmiSignMessage } from "./WagmiSignMessage";

export function WagmiSignMessageCv() {
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        {/* Account content goes here */}
        <WagmiSignMessage />
      </div>
    );
  }

  return <div>{/* Connect wallet content goes here */}</div>;
}
