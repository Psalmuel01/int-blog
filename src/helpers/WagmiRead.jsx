import { useContractRead, useWalletClient } from "wagmi";

export function WagmiRead() {
  const { data, error, isLoading, refetch } = useContractRead({
    config: {
      address: "0x1234567890123456789012345678901234567890", // The address of the contract
      abi: [
        /* The ABI of the contract */
      ], // The ABI of the contract
    },
    functionName: "myFunction", // The name of the function to call
    args: [arg1, arg2], // Optional arguments for the function
  });

  if (isLoading) {
    // Show a loading indicator while the data is being fetched
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle any errors that occurred during the contract read operation
    return <div>Error: {error.message}</div>;
  }

  // Access the data returned by the contract read operation
  console.log(data);

  return <div>{/* Render the data */}</div>;
}

function wagmiGetContract() {
  // const [posts, setAllPosts] = useState([]);
    const { data: walletClient, isError, isLoading } = useWalletClient();
    const contract = getContract({
      address: inkAddress,
      abi: inkAbi,
      walletClient,
    })
    console.log(contract.read);
    // const loadPosts = async () => {
    //   const allPosts = await contract.read.getPosts();
    //   setAllPosts(allPosts);
   }

   return <div>{/* Render the data */}</div>;

}
