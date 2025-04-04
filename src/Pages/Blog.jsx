import React from "react";
import LatestVideos from "../Components/blog/LatestVideos";
import Advertise from "../Components/blog/Advertise";
import Article from "../Components/blog/Article";
import CategoryCard from "../Components/blog/CategoryCard";
import Partners from "../Components/blog/Partners";
import BlogLanding from "../Components/blog/BlogLanding";
import Headline from "../Components/blog/Headline";

export default function Blog() {
  return (
    <div className="">
      <BlogLanding />
      <Partners/>
      <CategoryCard />
      <Headline />
      <LatestVideos />
      <Article />
      <Advertise />
    </div>
  );
}
