import { ethers } from "ethers";
import { inkAbi } from "../abi/ink";
import { inkTokenAbi } from "../abi/inktoken";

// https://int-blog-2397.vercel.app/

export const inkAddress = "0x34062e50DbAe8e63F18Fbf4827A982880B9Fd309";
const inkTokenAddress = "0x633B82F134A7da8bBc045e184a62B782306Fac82";
const SEPOLIARPC =
  "https://eth-sepolia.g.alchemy.com/v2/Zi_F-3fTztPtozvm58nBdd21noBes10h";
export const provider = new ethers.JsonRpcProvider(SEPOLIARPC);
// const walletPrivateKey = "0x";
// export const wallet = new ethers.Wallet(walletPrivateKey, provider);
// export const contractt = new ethers.Contract(inkAddress, inkAbi, provider);
// export const contractt = new ethers.Contract(inkAddress, inkAbi, wallet);
// export const erc20Contract = new ethers.Contract(
//   inkTokenAddress,
//   inkTokenAbi,
//   wallet
// );
