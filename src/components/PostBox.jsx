// import icon from "../assets/icons8-tip.gif";
import TipUser from "./TipUser";
import { useContractRead, useContractWrite } from "wagmi";
import { inkAddress, inkTokenAddress } from "../constants/contract";
import { inkAbi } from "../abi/ink";
import { inkTokenAbi } from "../abi/inktoken";
import { formatUnits, parseEther } from "viem";

const PostBox = ({ param }) => {
  const imgSrc = `https://picsum.photos/1500?random=${param}`;
  const divStyle = {
    background: `url(${imgSrc})`,
  };

  const {
    data: erc,
    error: ercError,
    isLoading: ercLoading,
    isSucess: ercSuccess,
    write: approve,
  } = useContractWrite({
    address: inkTokenAddress,
    abi: inkTokenAbi,
    functionName: "approve",
    args: [inkAddress, parseEther("100000")],
  });

  const handleApprove = () => {
    approve?.();
    console.log({ erc, ercError, ercLoading, ercSuccess, approve });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(post);

  return (
    <section
      style={divStyle}
      className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
    >
      <button onClick={handleApprove}>Approve</button>

      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl lg:text-4xl">
          {post?.title}
        </h1>
        <p className="mb-4 text-yellow-700">By {post?.poster}</p>
        <p className="mb-8 text-justify text-lg font-normal text-300 lg:text-xl sm:px-16 lg:px-24">
          {post?.content}
        </p>
        <div className="flex   items-center justify-center space-x-4">
          <div className="flex items-center py-1.5 px-5 bg-white rounded-lg shadow">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/dotty/80/1A1A1A/donate.png"
              alt="donate"
            />
            <p className="font-semibold text-black">
              {formatUnits(post.tips)} SMK
            </p>
          </div>
          <div>
            <TipUser address={post?.poster} postId={post?.id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostBox;
