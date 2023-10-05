import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
// import { contract, inkAddress } from "../constants/contract";
import { toast } from "react-toastify";
import { inkAbi } from "../abi/ink";
import { inkAddress } from "../constants/contract";
import { useDebounce } from "use-debounce";
// import useProposeCampaign from "../hooks/useProposeCampaign";
// import { useConnection } from "../context/connection";
// import { supportedChains } from "../constants";
// import { parseEther } from "ethers";

const CreatePost = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const debouncedContent = useDebounce(content, 500);

  // const [isLoading, setisLoading] = useState(false);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: inkAddress,
    abi: inkAbi,
    functionName: "createPost",
    args: [debouncedContent[0]],
    enabled: Boolean(debouncedContent),
  });
  const { data: create, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: create?.hash,
  });

  console.log({ prepareError, error });
  console.log(debouncedContent);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handlePost = () => {
    if (!content) return toast.info("Content cannot be empty");
    // if (!useAccount) return toast.warning("Please connect");
    console.log({ content, debouncedContent });
    write?.();
    isLoading && setContent("");
    if (isPrepareError || isError) {
      toast.error("Something went wrong", {
        error: (prepareError || error)?.message,
      });
    }
    if (isSuccess) {
      toast.success("Post created!");
      closeModal();
    }

    // try {
    //   setContent("");
    //   setisLoading(true);
    //   const create = await contract.createPost(content);
    //   const receipt = await create.wait();
    //   if (receipt.status === 0) return toast.error("Transaction failed");
    //   toast.success("Post created");
    // } catch (error) {
    //   console.log("error:", error); //see for yourself
    //   if (error.info.error.code === 4001) {
    //     return toast.error("You rejected the request");
    //   }
    //   toast.error("Something went wrong");
    // } finally {
    //   setisLoading(false);
    //   closeModal();
    // }
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="fixed w-[fit-content] block rounded-md mx-auto mt-6 bg-neutral-800 px-4 py-2 text font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Create Post
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequuntur, numquam.
                    </p>
                  </div>
                  <form className="mt-4 space-y-4">
                    <div className="flex flex-col">
                      <label className="font-bold">Content</label>
                      <textarea
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);
                        }}
                        type="text"
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-neutral-500"
                      />
                    </div>
                    {/* break */}
                    <div
                      onClick={handlePost}
                      className="cursor-pointer w-full rounded-md bg-neutral-800 p-3 text-sm font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-center"
                    >
                      {isLoading ? "Creating Post..." : "Create Post"}
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

export default CreatePost;
