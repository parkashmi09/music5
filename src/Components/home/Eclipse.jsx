import React, { useEffect, useRef } from "react";
import photo1 from "../../assets/home/photo1.png";
import photo2 from "../../assets/home/photo2.png";
import photo3 from "../../assets/home/photo3.png";
import photo4 from "../../assets/home/photo4.png";
import photo5 from "../../assets/home/photo5.png";
import video from "../../assets/home/eclipse.mp4";

const Eclipse = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Handle slide-in animations
            const slideElements =
              entry.target.querySelectorAll(".animate-slide");
            slideElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 100);
            });

            // Handle slide-up animations
            const slideUpElements =
              entry.target.querySelectorAll(".animate-slide-up");
            slideUpElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-up-animation");
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
            @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@900&display=swap');

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
    @keyframes slideUp {
      0% {
        opacity: 0;
        transform: translateY(100px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-slide {
      opacity: 0;
      transform: translateX(-50%);
    }
    .animate-slide-up {
      opacity: 0;
      transform: translateY(100px);
      font-family: 'Big Shoulders Stencil Text', sans-serif;
      font-weight: 900;
      font-size: 30px;
      line-height: 46px;
      letter-spacing: 0%;
      color: #FFFFFF;
    }
    .slide-in-animation {
      animation: slideIn 1s ease-out forwards;
    }
    .slide-up-animation {
      animation: slideUp 1s ease-out forwards;
    }
    
    /* Top Grid Structure Styles */
    .top-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
      gap: 1px;
      width: 100%;
    }
    
    .grid-top-cell {
      border: 1px solid #333;
      aspect-ratio: 1/1; /* square */
    }
    
    /* Bottom Grid Structure Styles */
    .bottom-grid {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 1px;
      width: 100%;
    }
    
    .grid-bottom-left {
      border: 1px solid #333;
      height: 80vh; /* Default height */
    }
    
    .grid-bottom-right {
      border: 1px solid #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
      .bottom-grid {
        grid-template-columns: 1fr;
      }
      
      .grid-bottom-left {
        height: 40vh;
      }
      
      .grid-bottom-right {
        min-height: 200px;
      }
        .animate-slide-up {
      opacity: 0;
      transform: translateY(100px);
      font-family: 'Big Shoulders Stencil Text', sans-serif;
      font-weight: 900;
      font-size: 16px;
      line-height: 16px;
      letter-spacing: 0%;
      color: #FFFFFF;
    }
    }
  `}
      </style>
      <div ref={sectionRef} className="w-full bg-black lg:p-20">
          <div className="top-grid">
            {[photo1, photo2, photo3, photo4, photo5].map((photo, index) => (
              <div
                key={index}
                className="grid-top-cell flex justify-center items-center overflow-hidden"
              >
                <img
                  src={photo}
                  className="animate-slide"
                  alt={`Photo ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="bottom-grid">
            {/* Bottom Left Cell with Eclipse */}
            <div className="grid-bottom-left relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 overflow-hidden text-center">
                  <h1 className="text-white font-bold px-4 select-none">
                    <p className="lg:text-2xl animate-slide-up">
                      Elevate Your Music Journey with
                    </p>
                  </h1>
                  <h1 className="text-white font-bold px-4 select-none">
                    <p
                      className="text-xs lg:text-2xl animate-slide-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      StudioSphere 360
                    </p>
                  </h1>
                </div>
                <video
                  className="w-full h-full object-cover"
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>

            {/* Bottom Right Cell */}
            <div className="grid-bottom-right">
              <div className="p-4 lg:p-8">
                <p className="text-gray-400 text-xs sm:text-sm lg:text-lg mb-4 lg:mb-8 leading-relaxed animate-slide">
                  Experience the future of music creation and management with
                  StudioSphere 360. Join our AI-powered platform and take your
                  music journey to new heights.
                </p>
                <button className="bg-[#FF6B6B] text-white  px-4 py-2 rounded-lg hover:bg-[#FF5252] animate-slide transition-colors duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Eclipse;
