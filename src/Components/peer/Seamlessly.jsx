import React from "react";
import craft from "../../assets/peer/port.png";
import arrow from "../../assets/create/arrow.png";

function Seamlessly({ data }) {
  console.log(data, "data");

  // Use data from props if available, otherwise use defaults
  const mainTitle = data?.title || "Collaborate Seamlessly, Create Limitlessly.";
  const mainDesc = data?.desc || "Lorem Ipsum is simply dummy text";
  const mainImage = data?.image || craft;

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
            background-color: #f9d94c; /* Dark pink color */
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
      <div className="relative h-[80vh] w-full">
        <img src={mainImage} alt="craft" className="w-full h-full object-cover" />

        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:px-16 lg:py-4">
          <div className="space-y-4">
            <h1 className="text-white font-['Orbitron'] text-6xl">
              <p className="lg:text-5xl text-4xl">
                {mainTitle.split(".")[0]}
                <br />
                {mainTitle.split(".")[1]}
                <br />
                {mainTitle.split(".")[2] || ""}
              </p>
            </h1>

            <p className="text-white lg:text-sm text-[10px] font-['Orbitron']">
              {mainDesc}
            </p>

            {/* Try Now Button */}
            <div className="pt-8">
              <button className="create-button">
                <span className="font-medium text-xl">Try Now</span>
                <img src={arrow} alt="arrow" className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Seamlessly;