import { useEffect, useState } from "react";
import { contract } from "../constants/contract";

const usePost = (id) => {
  const [post, setPost] = useState();
  const getPost = async (id) => {
    const postIndex = await contract.getPost(id);
    setPost(postIndex);
  };

  useEffect(() => {
    getPost(id);
  }, []);
  return post;
};

export default usePost;
