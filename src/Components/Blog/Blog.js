import React from "react";
import "../../style/Blog/Blog.css";
import BlogFeed from "./Child_Components/BlogFeed";
import BlogPost from "./Child_Components/BlogPost";
import BlogSubFeed from "./Child_Components/BlogSubFeed";
import BlogSubFeed2 from "./Child_Components/BlogSubFeed2";
import BlogSubPost from "./Child_Components/BlogSubPost";
import BlogPostLast from "./Child_Components/BlogPostLast";

const Blog = () => {
  return (
    <div className="blog_container">
      <BlogFeed />
      <BlogPost />
      <BlogSubFeed />
      <BlogSubFeed2 />
      <BlogSubPost />
      <BlogPostLast />
    </div>
  );
};

export default Blog;
