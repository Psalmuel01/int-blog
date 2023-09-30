import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="relative z-50 flex justify-between items-center py-4 px-8 isolate">
      <span className="font-black text-xl">Int-Blog</span>
      <ConnectButton showBalance />
    </header>
  );
};

export default Header;
