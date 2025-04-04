import React from "react";
import arrow from "../../assets/create/arrow.png";

function Craft({ data }) {
  // Fallback data in case props.data is undefined
  const defaultData = {
    title: "Craft Your Sound, Share Your Soul.",
    desc: "Lorem Ipsum is simply dummy text",
    image: ""
  };
  const sectionData = data || defaultData;

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide {
            opacity: 0;
            transform: translateX(-100px);
          }
          .slide-in-animation {
            animation: slideIn 0.8s ease-out forwards;
          }
          
          /* Button styles */
          .create-button {
            background-color: white;
            color: black;
            height: 48px;
            padding: 0 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            border: none;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .create-button:hover {
            background-color: #f9d94c;
            color: black;
          }
          
          .create-button img {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            transition: transform 0.5s ease-in-out;
          }
          
          .create-button:hover img {
            transform: translateX(4px);
          }
          
          @media (max-width: 640px) {
            .create-button {
              height: 34px;
              padding: 0 20px;
              font-size: 14px;
            }
          }
        `}
      </style>
      <div className="relative h-[70vh] w-full">
        <img
          src={sectionData.image}
          alt="craft background"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center lg:px-16">
          <div className="space-y-4">
            <h1 className="text-white font-['Orbitron'] text-6xl">
              <p className="lg:text-6xl text-4xl">
                {sectionData.title.split(",").map((line, index) => (
                  <React.Fragment key={index}>
                    {line.trim()}
                    {index < sectionData.title.split(",").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </h1>

            <p className="text-white lg:text-2xl text-sm font-['Orbitron']">
              {sectionData.desc}
            </p>

            {/* Try Now Button */}
            <div className="pt-8">
              <button className="create-button">
                <span className="font-medium text-xl">Try Now</span>
                <img src={arrow} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Craft;