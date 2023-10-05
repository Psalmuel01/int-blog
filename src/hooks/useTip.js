import { toast } from "react-toastify";
import { contract } from "../constants/contract";
import { useCallback } from "react";
import { useAccount } from "wagmi";

const useTip = () => {
  const { isConnected } = useAccount();

  //   const campaignLength = useCampaignCount();
  const tipUser = useCallback(
    async (address, amount, postId) => {
      console.log({ amount });
      if (!isConnected) return;
      //   if (!campaignLength) return;
      //   if (Number(id) > campaignLength)
      // //     return toast.error("campaign does not exist");
      //   {
      //     value: amount,
      //   }
      return contract.tipOnPost(address, amount, Number(postId));
    },
    [isConnected]
  );

  return tipUser;
};

export default useTip;
