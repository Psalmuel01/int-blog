import { contract } from "../constants/contract";

import { useEffect, useState } from "react";

const useAllPosts = () => {
  const [post, setPost] = useState();
  const [allPosts, setAllPosts] = useState();
  const [end, setEnd] = useState(50);

  const getAll = async () => {
    const allCalls = await contract.getPosts(1, end);
    // const posts = Array.from(allCalls);
    setAllPosts(allCalls);
  };

  const getPost = async (id) => {
    const postIndex = await contract.getPost(id);
    setPost(postIndex);
    return postIndex.content;
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const handleNewPostEvent = async (id, poster, timePosted) => {
      const content = await getPost(Number(id));
      // setEnd(end + 1);
      // console.log({ id, poster, timePosted });
      // console.log(content);
      setAllPosts([
        ...allPosts,
        {
          id,
          poster,
          content,
          timePosted,
          tips: 0,
        },
      ]);
    };
    contract.on("NewPost", handleNewPostEvent);

    return () => {
      contract.off("NewPost", handleNewPostEvent);
    };
  }, [allPosts]);

  return allPosts;
};

export default useAllPosts;
