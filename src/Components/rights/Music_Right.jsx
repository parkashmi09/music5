import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/rights/bgimage.png";
import bgimage1 from "../../assets/rights/Group.png";

function Music_Right({ data }) {
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

  if (!data || data.length === 0) return null;

  const musicRight = data[0];

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
        `}
      </style>
      <div className="relative h-[70vh] w-full" ref={sectionRef}>
        <img
          src={bgimage}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex lg:flex-row flex-col justify-between lg:px-20">
          <div className="space-y-0 lg:mt-4">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-5xl font-['Poppins'] lg:mb-32 animate-slide">
                {musicRight.title}
              </p>
              <p className="text-white font-['Orbitron'] lg:text-xl text-sm max-w-2xl lg:pt-8 lg:mt-20 animate-slide">
                {musicRight.description}
              </p>
            </h1>
          </div>
          <div className="flex items-center justify-center lg:items-start">
            <img
              src={musicRight.image}
              alt={musicRight.title}
              className="lg:w-[80%] w-[60%] animate-slide"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Music_Right;
