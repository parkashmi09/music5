import React, { useEffect, useRef } from "react";
import video from "../../assets/home/341065623620591621.mp4";

export default function Production() {
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
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.3,
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
              transform: translateX(-50%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide {
            opacity: 0;
            transform: translateX(-50%);
          }
          .slide-in-animation {
            animation: slideIn 1s ease-out forwards;
          }
        `}
      </style>
      <div
        ref={sectionRef}
        className="relative lg:w-[calc(100%-80px)] lg:h-[calc(100vh-40px)] overflow-hidden lg:mx-[20px] lg:my-[20px]"
      >
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-10 lg:p-[60px]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Right side overlay */}
        <div className="absolute right-14 w-1/2 top-14 bottom-14 lg:bg-black/50 z-20"></div>

        {/* Content */}
        <div className="relative z-30 w-full h-full flex items-center">
          <div className="w-full lg:mx-auto grid lg:grid-cols-2 gap-16">
            {/* Left side - Title */}
            <div className="flex justify-center items-center overflow-hidden">
              <h1 className="font-['Russo_One'] text-2xl md:text-[2.5rem] lg:text-[3rem] font-bold text-white uppercase leading-tight m-0 tracking-[2px] drop-shadow-[0_0_40px_rgba(138,43,226,0.3)]">
                <p className="text-3xl lg:ml-20 ml-6 mt-4 lg:mt-0 animate-slide">
                  AI-Powered Music Production
                </p>
              </h1>
            </div>

            {/* Right side - Description and Button */}
            <div className="lg:pl-8 px-6">
              <div className="max-w-[500px]">
                <p className="text-white lg:text-lg leading-relaxed mb-8 font-light animate-slide">
                  StudioSphere 360's AI-powered music production services
                  combine innovation and creativity to streamline the music
                  creation process. Our cutting-edge tools and technologies
                  enable artists to produce professional-grade music with ease.
                </p>
                <button className="bg-[#ff4d4d] hover:bg-[#ff3333] text-white border-none lg:py-3 lg:px-8 px-4 py-2 text-base font-medium rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,77,77,0.3)] animate-slide">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
