import React, { useEffect, useRef } from "react";
import circle from "../../assets/music/add.png";
import circle2 from "../../assets/music/add1.png";
import circle3 from "../../assets/music/add2.png";
import circle4 from "../../assets/music/add3.png";

const Distribution = ({ data }) => {
  const sectionRefs = useRef([]);

  // Map imported images to maintain consistency
  const imageMap = [circle, circle2, circle3, circle4];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            const image = entry.target.querySelector(".circle-image");
            if (image) {
              image.classList.add("pop-rotate-animation");
            }
            const textElements = entry.target.querySelectorAll(".animate-slide");
            textElements.forEach((el, index) => {
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

    sectionRefs.current.forEach((ref) => {
      if (ref && ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref && ref.current) observer.unobserve(ref.current);
      });
    };
  }, [data]);

  return (
    <>
      <style>
        {`
    @keyframes initialAnimation {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      20% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
      }
      30% {
        transform: scale(1) rotate(0deg);
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .circle-image {
      // transform: scale(0);  /* Initial state */
    }

    .pop-rotate-animation {
      opacity: 1;
      animation: 
        initialAnimation 2s ease-out forwards,
        rotate 8s linear infinite;
      animation-delay: 0.2s, 1s;
    }

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
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .section-flex {
        flex-direction: column !important;
      }
      
      .section-image {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      }
      
      .section-content {
        text-align: center;
      }
      
      .section-ml-0 {
        margin-left: 0 !important;
      }
      
      .section-right .section-image {
        order: 1;
      }
      
      .section-right .section-content {
        order: 2;
      }
    }
  `}
      </style>
      <div className="bg-black min-h-screen px-4 sm:px-8 py-8 sm:py-16">
        <div className="max-w-[90%] mx-auto">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl flex justify-center font-['Orbitron'] text-white mb-10 sm:mb-20">
            <p className="text-3xl sm:text-5xl text-center">
              <span className="text-white">{data.title}</span>
            </p>
          </h1>

          {/* Sections */}
          <div className="space-y-12 sm:space-y-8">
            {data.data.map((item, index) => {
              const isImageLeft = index % 2 === 0; // Left for 0, 2; Right for 1, 3
              return (
                <div
                  key={item._id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  className={isImageLeft ? "flex flex-col" : ""}
                >
                  <div
                    className={`flex section-flex ${
                      !isImageLeft ? "justify-between section-right" : ""
                    }`}
                  >
                    {/* Image Left Section */}
                    {isImageLeft && (
                      <div className="section-image">
                        <img
                          src={item.image || imageMap[index]}
                          className="w-[80%] circle-image"
                          alt={item.title}
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex flex-col justify-center section-content">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] text-white mb-2">
                        <span
                          className={`${
                            index === 0 || index === 2
                              ? "text-[#7CFF01] ml-0 sm:ml-8 section-ml-0"
                              : index === 1
                              ? "text-[#FC5252]"
                              : "text-[#B47BFF]"
                          }`}
                        >
                          {item.title}
                        </span>
                      </h2>
                      <p
                        className={`text-gray-300 ${
                          isImageLeft
                            ? "max-w-3xl ml-0 sm:ml-8 section-ml-0"
                            : "mb-4 sm:mb-8 max-w-4xl"
                        } text-base sm:text-xl leading-relaxed font-['Orbitron']`}
                      >
                        {item.desc}
                      </p>
                    </div>

                    {/* Image Right Section */}
                    {!isImageLeft && (
                      <div className="flex justify-center sm:justify-end section-image">
                        <img
                          src={item.image || imageMap[index]}
                          className="w-[80%] circle-image"
                          alt={item.title}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Distribution;