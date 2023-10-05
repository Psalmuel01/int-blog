import React from "react";
import { useParams } from "react-router-dom";
import PostBox from "../components/PostBox";

const PostFull = () => {
  const { postId } = useParams();
  return <PostBox param={postId} />;
};

export default PostFull;
