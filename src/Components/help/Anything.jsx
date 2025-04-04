import React from "react";
import { IoIosSearch } from "react-icons/io";
import bannerImage from "../../assets/help/bgimage.png";
import "../../styles/career/anything.css";

export default function Anything() {
  return (
    <div
      className="container-fluid blog_section d-flex align-items-start p-lg-3 pt-4"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container p-lg-4 rounded">
        <div className="row">
          <div className="col-lg-10">
            <h1 className="mb-3 headings">Hi! How can we help?</h1>
            <p className="description">
              At Studiosphere 360, our dedicated team is here to guide you every
              step of the way—from fine-tuning your sound and distributing your
              music, to engaging your audience and optimizing your online
              presence. Whether you need creative direction, technical support,
              or marketing expertise, we’re committed to empowering your vision
              and ensuring your music journey is smooth, successful, and
              rewarding. Let us know how we can help bring your creative goals
              to life!
            </p>
          </div>
        </div>

        <div className="input-group mt-1 w-100 mx-auto" id="main-search-input">
          <span className="input-group-text bg-white border-0">
            <IoIosSearch className="text-secondary" size={30} />
          </span>
          <input
            type="text"
            className="form-control bg-white py-lg-4 border-0"
            placeholder="Find anything (like audio, looper, getting started)"
          />
        </div>
      </div>
    </div>
  );
}
