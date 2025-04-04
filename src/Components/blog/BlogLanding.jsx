import React from "react";
import { IoIosSearch } from "react-icons/io";
import bannerImage from "../../assets/blog/mainbanner.png";
import "../../styles/blog/blogLanding.css";
export default function BlogLanding() {
  return (
    <div
      className="container-fluid blog_section  d-flex align-items-start p-lg-3 pt-4"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container p-lg-4 rounded">
        <div className="row">
          <div className="col-lg-10">
            <h1 className="mb-3 headings">Search for your interest.</h1>
            <p className="description">
              <b className="text-blue-400">Discover Your Musical Edge with StudioSphere Open AI</b><br/>
              Dive into a dynamic search engine designed to unearth your musical
              interests and elevate your creative journey. StudioSphere Open AI
              cuts through the noise, delivering tailored insights, industry
              trends, and innovative tools that align with your unique sound.
              Whether you're honing your craft or breaking new ground, this
              smart platform connects you to the knowledge and inspiration you
              need—fast, efficient, and built for forward-thinking creators like
              you.
            </p>
          </div>
        </div>

        {/* Input with Icon */}
        <div className="input-group mt-1 w-100 mx-auto">
          <span className="input-group-text bg-white border-0">
            <IoIosSearch className="text-secondary" size={30} />
          </span>
          <input
            type="text"
            className="form-control bg-white py-lg-4 border-0"
            placeholder="Find your interest...."
          />
        </div>
      </div>
    </div>
  );
}
