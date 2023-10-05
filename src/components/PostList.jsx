// import useAllPosts from "../hooks/useAllPosts";
import { Link, useParams } from "react-router-dom";
import { formatDate, shortenAccount } from "../utils";
import { formatEther } from "ethers";
import { inkAddress } from "../constants/contract";
import { inkAbi } from "../abi/ink";
import { useContractRead, useWalletClient } from "wagmi";
import { getContract } from "wagmi/actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { getContract } from "viem";

const PostList = () => {
  // const posts = useAllPosts();
  const [posts, setAllPosts] = useState([]);
  const {
    data: allPosts,
    error,
    isLoading,
    refetch,
  } = useContractRead({
    address: inkAddress,
    abi: inkAbi,
    functionName: "getPosts", //try just 'getPosts'
    watch: true,
    args: [0, 60],
  });
  // console.log({posts});

  useEffect(() => {
    if (allPosts?.length > 0) {
      setAllPosts(allPosts);
      toast.success("Posts fetched");
    }
  }, [allPosts]);

  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
      <button onClick={() => refetch()}>fetch</button>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {posts?.map((post, index) => (
          <div
            key={index}
            className="overflow-hidden transition-shadow duration-300 bg-white rounded"
          >
            <img
              src={`https://picsum.photos/1500?random=${Number(post.id)}`}
              className="object-cover w-full h-64 rounded"
              alt=""
            />
            <div className="py-5">
              <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                {formatDate(Number(post.timePosted))}
              </p>
              <Link
                to={`/post/${Number(post.id)}`}
                aria-label="Article"
                className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                <p className="text-2xl font-bold leading-5">{post.content}</p>
              </Link>
              <p className="mb-4 text-gray-700">
                By {shortenAccount(post.poster)}
              </p>
              <div className="flex space-x-4">
                <div
                  href="/"
                  aria-label="Tips"
                  className="flex items-center text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group"
                >
                  <div className="mr-1">
                    <img
                      width="32"
                      height="32"
                      src="https://img.icons8.com/dotty/80/1A1A1A/donate.png"
                      alt="donate"
                    />
                  </div>
                  <p className="font-semibold">{formatEther(post.tips)} INK</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//stopppp

// <div className="bg-white py-6 sm:py-8">
//   <div className="mx-auto max-w-7xl px-6 lg:px-8">
//     <div className="mx-auto max-w-2xl lg:mx-0">
//       <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//         Blogs
//       </h2>
//     </div>
//     {posts?.map((post) => (
//       <Link
//         to={Number(post.id)}
//         className="mx-auto border-t border-gray-200 pt-5 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none"
//       >
//         <article
//           key={post.id}
//           className="flex max-w-xl flex-col items-start justify-between"
//         >
//           <div className="flex items-center gap-x-4 text-xs">
//             <p className="text-gray-500">
//               {Date(Number(post.timePosted).toLocaleString())}
//             </p>
//           </div>
//           <div className="relative">
//             <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//               {post.content}
//             </h3>
//             <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//               From: {post.poster}
//             </p>
//           </div>
//           <div className="text-sm leading-6">
//             <p className="text-gray-600"></p>
//           </div>
//         </article>
//       </Link>
//     ))}
//   </div>
// </div>

export default PostList;
