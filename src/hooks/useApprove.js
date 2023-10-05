import { parseEther } from "ethers";
import { useEffect } from "react";
import { erc20Contract, inkAddress } from "../constants/contract";
import { toast } from "react-toastify";

const useApprove = () => {
  const amount = parseEther("100");

  const approve = async () => {
    try {
        console.log(erc20Contract);
      const approveTx = await erc20Contract.approve(inkAddress, amount);
      const receipt = await approveTx.wait();
      if (receipt.status === 0) return toast.error("Transaction failed");
      toast.success("Contract approved");
      console.log({ approveTx, receipt });
    } catch (error) {
      console.error("Error approving tokens:", error);
      toast.error(`Error approving tokens: ${error}`);
    }
  };

  useEffect(() => {
    approve();
  }, []);

  return approve;
};

export default useApprove;
