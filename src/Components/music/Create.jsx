import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/music/bgimage.png";
import arrow from "../../assets/create/arrow.png";
import i1 from "../../assets/create/i1.png";
import i2 from "../../assets/create/i2.png";
import i3 from "../../assets/create/i3.png";
import i4 from "../../assets/create/i4.png";
import i5 from "../../assets/create/i5.png";

function Create({ data }) {
  const sectionRef = useRef(null);
  const defaultData = {
    title: "Create Now",
    desc: "Featuring samples from world–class labels:",
    data: [],
  };
  const sectionData = data || defaultData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200); // Increased delay between elements
            });
          }
        });
      },
      {
        threshold: 0.1, // Reduced threshold for earlier triggering
        rootMargin: "50px", // Added margin to trigger earlier
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
          /* Button styles */
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
            background-color: #f9d94c; /* Yellow color from your image */
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
              font-size: 14px; /* Slightly smaller font for mobile */
            }
          }
        `}
      </style>
      <div
        className="relative min-h-[70vh] h-auto w-full lg:px-20 py-8 overflow-y-auto"
        ref={sectionRef}
      >
        <img
          src={bgimage}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full h-full flex flex-col justify-center z-10">
          <div className="space-y-4">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                Create today, share your vision
              </p>
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                with the world tomorrow.
              </p>
            </h1>

            <div className="">
              <button className="create-button">
                <span>Create Now</span>
                <img src={arrow} alt="arrow" />
              </button>
            </div>

            <div className="mt-4">
              <p className="text-white font-['Orbitron'] text-lg mb-4">
                {sectionData.desc}
              </p>
              <div className="flex flex-wrap gap-2 lg:flex-nowrap justify-center md:justify-start">
                {sectionData.data.map((img, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-full sm:w-auto"
                  >
                    <img
                      src={img.image}
                      alt={`Label ${index + 1}`}
                      className="max-w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;