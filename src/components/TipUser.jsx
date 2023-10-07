import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// import { contract } from "../constants/contract";
// import useTip from "../hooks/useTip";
// import useApprove from "../hooks/useApprove";
import { toast } from "react-toastify";
import { inkAddress } from "../constants/contract";
import { inkAbi } from "../abi/ink";
import { useDebounce } from "use-debounce";
import { getContract } from "viem";
// import { useConnection } from "../context/connection";
// import { supportedChains } from "../constants";
// import { parseEther } from "ethers";

const TipUser = ({ address, postId }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState();
  const debouncedAmount = useDebounce(amount, 1000);

  // const [address, setAddress] = useState("");
  // const [postId, setPostId] = useState("");
  const [tippingUser, setTippingUser] = useState(false);
  // const approve = useApprove();

  // const { data: walletClient } = useWalletClient();
  // const contract = getContract({
  //   address: inkTokenAddress,
  //   abi: inkTokenAbi,
  //   walletClient,
  // })
  // console.log({contract, walletClient});
  // contract.approve(inkAddress, formatEther(100000))
  // data, isLoading, isSuccess, write

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: inkAddress,
    abi: inkAbi,
    functionName: "tipOnPost",
    args: [address, parseInt(debouncedAmount[0]), postId],
    enabled: Boolean(debouncedAmount),
  });
  const { data: create, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: create?.hash,
  });

  console.log({ prepareError, error });

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleTip = async () => {
    if (!amount) return toast.info("Fill all details");
    // if (!useAccount) return toast.warning("Please connect");
    write?.();
    console.log({ address, postId, amount, debouncedAmount });
    // console.log(parseEther(debouncedAmount[0]));
    // setTippingUser(true);
    // isLoading && setAmount("");
    // if (isPrepareError || isError) {
    //   toast.error("Something went wrong", {
    //     error: (prepareError || error)?.message,
    //   });
    // }
    // if (isSuccess) {
    //   toast.success("Post created!");
    //   closeModal();
    // }

    // try {
    //   setAmount("");
    //   setTippingUser(true);

    // const tip = await contract.tipOnPost(address, parseEther(amount), postId);
    //   const tip = useTip(address, amount, postId);
    //   const receipt = await tip.wait();
    //   console.log({ tip, receipt });
    //   if (receipt.status === 0) return toast.error("Transaction failed");
    //   toast.success("User tipped");
    // } catch (error) {
    //   console.log("error:", error); //see for yourself
    //   if (error.info.error.code === 4001) {
    //     return toast.error("You rejected the request");
    //   }
    //   toast.error("Something went wrong");
    // } finally {
    //   setTippingUser(false);
    //   closeModal();
    // }
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="w-[fit-content] block rounded-md mx-auto bg-neutral-800 px-4 py-2 text font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Tip User
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-bold leading-6">
                    Tip User
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur, numquam.
                    </p>
                  </div>
                  <form className="mt-4 space-y-4">
                    <div className="flex flex-col">
                      <label className="font-bold">Amount (in ETH)</label>
                      <input
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        type="number"
                        min="0"
                        step={0.01}
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-neutral-500"
                      />
                    </div>
                    {/* break */}
                    <div
                      onClick={handleTip}
                      className="cursor-pointer w-full rounded-md bg-neutral-800 p-3 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                    >
                      {tippingUser ? "Tipping User..." : "Tip User"}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default TipUser;
