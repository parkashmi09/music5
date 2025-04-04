import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/contact/bgimage.png";
import rotatingCd from "../../assets/home/Exclude.png";

function Sphere() {
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
        `}
      </style>
      <div className="relative  w-full" ref={sectionRef}>
        {" "}
        {/* Added ref here */}
        <img src={bgimage} alt="background" className="w-full h-full " />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col  lg:px-20">
          <div className="space-y-4">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-5xl text-lg  lg:mt-4 mb-0">Contact</p>
              <p className="lg:text-6xl text-lg  flex items-center ">
                STUDIOSPHERE
                <div className="ms-0 w-8 h-8 lg:w-[150px] lg:h-[150px] rounded-full">
                  <img
                    src={rotatingCd}
                    className="w-full h-full rounded-full"
                    alt="Studio Logo"
                    style={{
                      animation: "rotate 8s linear infinite",
                    }}
                  />
                </div>
              </p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sphere;
