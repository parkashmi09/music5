import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/video/bgimage.png";
import arrow from "../../assets/create/arrow.png";
import i1 from "../../assets/create/i1.png";
import i2 from "../../assets/create/i2.png";
import i3 from "../../assets/create/i3.png";
import i4 from "../../assets/create/i4.png";
import i5 from "../../assets/create/i5.png";

function Vision({ data }) {
  const sectionRef = useRef(null);

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
  background-color: #f9d94c; /* This is the yellow color from your image */
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
      background-color: white;
      color: black;
      height: 34px;
      padding: 0 20px;
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

              }
        `}
      </style>
      <div
        className="relative min-h-[70vh] h-auto w-full lg:px-20 py-8 overflow-y-auto"
        ref={sectionRef}
      >
        {" "}
        <img
          src={data?.image || bgimage}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full h-full flex flex-col justify-center  z-10">
          <div className="space-y-4 ">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                Bring your vision to life,
              </p>
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                frame by frame.
              </p>
            </h1>
            <div className="">
              <button className="create-button">
                <span>Create Now</span>
                <img src={arrow} alt="arrow" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-white font-['Orbitron'] text-lg mb-4 ">
              {data?.title}
            </p>
            <div className="flex gap-2 lg:flex-nowrap ">
              {data?.data?.map((img, index) => (
                <div key={index} className="">
                  <img src={img.image} alt={`Label ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vision;
