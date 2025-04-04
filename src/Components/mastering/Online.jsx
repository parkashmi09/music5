import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/mastering/bgimage.png";
import arrow from "../../assets/create/arrow.png";
import Vector from "../../assets/mastering/Vector.png";
import { useNavigate } from "react-router-dom";

function Online({ data }) {
  console.log("Online data:", data);
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
          .rotate-hover {
            transition: transform 0.3s ease;
          }
          .rotate-hover:hover {
            transform: rotate(90deg);
          }
          .create-button {
            background-color: white;
            color: black;
            height: 48px;
            padding: 0 32px;
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
            }
          }
        `}
      </style>

      {/* Main container */}
      <div
        className="relative min-h-[70vh] h-auto w-full lg:px-20 py-8 overflow-y-auto"
        ref={sectionRef}
      >
        <img
          src={data?.image || bgimage}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full h-full flex flex-col justify-center z-10">
          <div className="space-y-4">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-6xl leading-normal animate-slide">
                Fast, High Quality Online
              </p>
              <p className="lg:text-6xl leading-normal animate-slide">
                Mastering
              </p>
            </h1>
            <div>
              <button onClick={() => navigate("/mastering-sound")} className="create-button">
                <span>Create Now</span>
                <img src={arrow} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Import Section - Using data from props */}
      <div className="relative w-full">
        <div className="hidden lg:flex bg-gray-800/80 backdrop-blur-sm rounded-full absolute left-[50%] transform -translate-x-1/2 -translate-y-[80%] z-20 pl-16 pr-4 items-center justify-between p-6 py-0 w-[90%] max-w-[90%]">
          <div className="flex-1">
            <h3 className="text-white text-2xl font-['Orbitron'] mb-2">
              {data?.heading || "Import your track"}
            </h3>
            <p className="text-white text-base">
              {data?.title || "Select any video or audio file"}
            </p>
            <p className="text-white text-md mt-2 max-w-[86%]">
              {data?.desc ||
                "Lorem ipsum is simply dummy text of the printing and typesetting industry."}
            </p>
          </div>
          <div className="ml-8">
            <button
              className="w-52 h-52 bg-white flex items-center my-2 justify-center hover:bg-gray-200 transition-colors group"
              style={{ borderRadius: "9999px" }}
            >
              <img
                src={Vector}
                alt="Import icon"
                className="transition-transform duration-300 group-hover:-rotate-90"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Online;