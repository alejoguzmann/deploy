"use client";

import React from "react";
import { auth } from "../../../firebase.js";

import PostsDashboard from "../../../components/postsDashboard/PostsDashboard.jsx";

const Home = () => {
  return (
    <div>
      <PostsDashboard />
    </div>
  );
};

export default Home;
