import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/promote/bgimage.png";
import arrow from "../../assets/create/arrow.png";

function Eyes({ data }) {
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
          src={data.image || bgimage} // Using data.image instead of static bgimage
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col lg:px-20">
          <div className="space-y-4 mt-16">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-6xl leading-normal animate-slide">
                {data.title} {/* Using data.title instead of static text */}
              </p>
              <p className="text-white font-['Orbitron'] lg:text-2xl text-sm mb-4">
                {data.desc} {/* Using data.desc instead of static text */}
              </p>
            </h1>
            <div className="">
              <button
                className="text-black h-14 px-12 flex items-center justify-center rounded-full hover:bg-pink-400 hover:text-white transition-all duration-300 shadow-lg"
                style={{
                  borderRadius: "9999px",
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <span className="font-bold text-xl font-['Orbitron'] text-[#272727]">
                  Promote your music
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Eyes;