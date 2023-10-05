import { useEffect, useState } from "react";
import lightOrDarkImage from "@check-light-or-dark/image";
// import usePost from "../hooks/usePost";
import icon from "../assets/icons8-tip.gif";
import { shortenAccount } from "../utils";
import TipUser from "./TipUser";
import { formatEther } from "ethers";
import { useContractRead } from "wagmi";
import { inkAddress } from "../constants/contract";
import { inkAbi } from "../abi/ink";

const PostBox = ({ param }) => {
  // const post = usePost(param);
  // console.log(post?.tips);

  const imgSrc = `https://picsum.photos/1500?random=${param}`;
  const divStyle = {
    background: `url(${imgSrc})`,
  };

  const {
    data: post,
    error,
    isLoading,
  } = useContractRead({
    address: inkAddress,
    abi: inkAbi,
    functionName: "getPost",
    args: [param],
    watch: true,
  });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // console.log(post);

  return (
    <section
      style={divStyle}
      className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
    >
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
          {post?.content}
        </h1>
        <p className="mb-4 text-yellow-700">By {post?.poster}</p>
        <p className="mb-8 text-lg font-normal text-300 lg:text-xl sm:px-16 lg:px-48">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, illo
          minima? Numquam minima asperiores totam eos illo dolores, eveniet
          dolorum dolor reiciendis, aut rerum earum cupiditate doloribus!
        </p>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center py-1.5 px-5 bg-white rounded-lg shadow">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/dotty/80/1A1A1A/donate.png"
              alt="donate"
            />
            <p className="font-semibold text-black">
              {formatEther(post?.tips)} ETH
            </p>
          </div>
          <div>
            <TipUser address={post?.poster} postId={param} />
          </div>
          {/* <p className="py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-neutral-950 hover:bg-neutral-900">
              Tip
            </p> */}
          {/* <img width="32" height="32" src={icon} alt="" /> */}
          {/* <div className="mr-2"> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default PostBox;
