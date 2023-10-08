// import useAllPosts from "../hooks/useAllPosts";
import { Link } from "react-router-dom";
import { formatDate, shortenAccount, shortenContent } from "../utils";
import { inkAddress } from "../constants/contract";
import { inkAbi } from "../abi/ink";
import { useContractRead } from "wagmi";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { formatUnits } from "viem";

const PostList = () => {
  const [posts, setAllPosts] = useState([]);
  const { data: allPosts } = useContractRead({
    address: inkAddress,
    abi: inkAbi,
    functionName: "getPosts",
    watch: true,
    args: [0, 60],
  });

  useEffect(() => {
    if (allPosts?.length > 0) {
      setAllPosts(allPosts);
      // toast.success("Posts fetched");
    }
  }, [allPosts]);

  return (
    <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
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
                <p className="text-2xl font-bold leading-normal">
                  {post.title}
                </p>
                <p className="mt-4 text-lg font-normal text-300 lg:text-xl">
                  {shortenContent(post.content)}
                </p>
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
                  <p className="font-semibold">{formatUnits(post.tips)} SMK</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
