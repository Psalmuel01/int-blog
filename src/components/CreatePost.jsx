import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { toast } from "react-toastify";
import { inkAbi } from "../abi/ink";
import { inkAddress } from "../constants/contract";
import { useDebounce } from "use-debounce";

const CreatePost = () => {
  const { isConnected } = useAccount();
  let [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const debouncedTitle = useDebounce(title, 500);
  const debouncedContent = useDebounce(content, 500);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: inkAddress,
    abi: inkAbi,
    functionName: "createPost",
    args: [debouncedTitle[0], debouncedContent[0]],
    enabled: Boolean(debouncedTitle || debouncedContent),
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

  const handlePost = () => {
    if (!title || !content) return toast.info("Either fields cannot be empty");
    if (!isConnected) return toast.warning("Please connect");
    console.log({ debouncedTitle, debouncedContent });
    write?.();
    isLoading && setContent("");
    (isPrepareError || isError) &&
      toast.error("Something went wrong", {
        error: (prepareError || error)?.cause.reason,
      });
    //error message not showing
    if (isSuccess === true) {
      toast.success("Post created!");
    }
    closeModal(); //check here, then inside isSuccess
    //success message and close model not working
  };

  return (
    <Fragment>
      <button
        onClick={openModal}
        className="w-[fit-content] block rounded-md mx-auto mt-6 bg-neutral-800 px-4 py-2 text font-medium text-white hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                      <label className="font-bold">Title</label>
                      <input
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        type="text"
                        className="outline-0 py-2 px-1 rounded-lg mt-2 border border-neutral-500"
                      />
                    </div>
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
