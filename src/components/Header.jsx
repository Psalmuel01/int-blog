import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-1 px-8 isolate">
      <span className="font-black text-xl">Int-Blog</span>
      <ConnectButton showBalance />
    </header>
  );
};

export default Header;
