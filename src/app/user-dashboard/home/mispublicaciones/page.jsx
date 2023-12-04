"use client";

import PostsDashboard from "../../../../components/postsDashboard/PostsDashboard";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MyPosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.logedInUser);

  return (
    <div>
      <PostsDashboard />
    </div>
  );
};

export default MyPosts;
