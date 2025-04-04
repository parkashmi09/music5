import React from "react";
import { IoIosSearch } from "react-icons/io";
import bannerImage from "../../assets/career/bgimage.png";

export default function Passion({ data }) {
  // Use data from props if available, otherwise use fallback values
  const title = data?.title || "Turn your passion for music into a lifelong career.";
  const description = data?.desc || "At Studiosphere 360, we're blending cutting-edge AI technology with the timeless passion for music. We're on a mission to revolutionize the industry—from how music is created and shared, to how artists and fans connect. If you're driven by innovation and ready to take the music world to new heights, we want you on our team. We're hiring across a wide range of roles, including Social Media & Content Management, Music Licensing & Copyright, Creative Direction, Business Development, AI Music Innovation, Music Technology Consulting, Public Relations, Music Video Production, Brand Partnerships, SEO/SEM, Digital Marketing, Customer Support, Legal/Compliance, Quality Assurance, and IT Support. Join us, and turn your passion for music into a lifelong career at the forefront of AI-driven creativity.";

  return (
    <div
      className="w-full flex items-start py-4 lg:p-3"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "550px",
      }}
    >
      <div className="w-full max-w-7xl h-[70vh] mx-auto p-4 lg:p-4 rounded">
        <div className="grid grid-cols-1">
          <div className="col-span-1 lg:w-10/12">
            <h1 className="mb-3 font-['Orbitron'] font-semibold text-2xl md:text-3xl lg:text-4xl text-white">
              {title}
            </h1>
            <p className="font-['Orbitron'] font-medium text-sm md:text-base lg:text-sm text-white">
              {description}
            </p>
          </div>
        </div>

        {/* Input with Icon */}
        <div className="relative mt-4 w-full mx-auto shadow-[0px_0px_10px_2px_#00FFFF] rounded-lg transition-shadow duration-300 hover:shadow-[0px_0px_15px_3px_#00FFFF] focus-within:shadow-[0px_0px_15px_3px_#00FFFF]">
          <div className="flex items-center bg-white rounded-lg">
            <span className="pl-3 text-gray-500">
              <IoIosSearch size={30} />
            </span>
            <input
              type="text"
              className="w-full py-3 lg:py-4 px-2 bg-white border-0 focus:outline-none rounded-lg"
              placeholder="Start typing job title or Keywords"
            />
          </div>
        </div>
      </div>
    </div>
  );
}