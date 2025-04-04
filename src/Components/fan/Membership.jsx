import React from "react";
import craft from "../../assets/fan-reach/bgimage1.png";
import craft1 from "../../assets/fan-reach/image.png";
import arrow from "../../assets/create/arrow.png";

function Membership({ data }) {
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
      <div className="relative h-[70vh] w-full">
        <img src={craft} alt="craft" className="w-full h-full object-cover" />

        {/* Text Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col py-24 lg:py-4 lg:px-16">
          <div className="space-y-4 ">
            <h1 className="text-white font-['Orbitron'] text-6xl ">
              <p className=" lg:text-6xl text-4xl leading-tight ">
                {data?.title}
              </p>
            </h1>
            {/* <img src={craft1} alt="craft" className="" /> */}

            {/* Button Tags based on data.data */}
            <div className="flex flex-wrap gap-2">
              {data.data.map((item, index) => (
                <button
                  key={item._id}
                  className="border border-white !rounded-full px-4 py-2 text-white flex items-center gap-1"
                  style={{
                    backgroundColor: "transparent", // Dark background for "Video Creation" + "More"

                  }}
                >
                  <img src={item.image} alt={item.title} className="w-6 h-6" />
                  {<span>{item.title}</span>}
                </button>
              ))}
            </div>

            <p className="text-white lg:text-sm text-xs font-['Orbitron'] ">
              {data?.desc}
            </p>

            {/* Try Now Button */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Membership;
