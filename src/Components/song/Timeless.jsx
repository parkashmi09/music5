import React, { useEffect, useRef } from "react";
import circle from "../../assets/song/girl1.png";
import circle2 from "../../assets/song/girl2.png";
import circle3 from "../../assets/song/girl3.png";
import circle4 from "../../assets/song/girl4.png";

function Timeless({ data }) {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const sectionRefs = [section1Ref, section2Ref, section3Ref, section4Ref];
  const images = [circle, circle2, circle3, circle4];

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

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes initialAnimation {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            20% { transform: scale(0) rotate(0deg); opacity: 1; }
            30% { transform: scale(1) rotate(0deg); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .circle-image {
            transform: scale(0);
          }

          .pop-rotate-animation {
            opacity: 1;
            animation: 
              initialAnimation 2s ease-out forwards,
              rotate 8s linear infinite;
            animation-delay: 0.2s, 1s;
          }

          @keyframes slideIn {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }

          .animate-slide {
            opacity: 0;
            transform: translateX(-100px);
          }

          .slide-in-animation {
            animation: slideIn 0.8s ease-out forwards;
          }

          @media (max-width: 768px) {
            .section-flex {
              flex-direction: column !important;
            }
            
            .section-content {
              order: 2;
              text-align: center;
              margin-top: 1.5rem;
            }
            
            .section-image {
              order: 1;
              display: flex;
              justify-content: center;
              margin-bottom: 1rem;
            }
            
            .section-right .section-image {
              order: 1;
            }
            
            .section-right .section-content {
              order: 2;
            }
            
            .mobile-btn-center {
              margin-left: auto;
              margin-right: auto;
            }
            
            .responsive-title {
              font-size: 2rem !important;
              line-height: 1.3 !important;
              text-align: center;
            }
            
            .responsive-heading {
              font-size: 1.5rem !important;
              line-height: 1.3 !important;
              text-align: center;
            }
          }
        `}
      </style>
      <div className="bg-black min-h-screen px-4 sm:px-8 py-8 sm:py-16">
        <div className="max-w-[90%] mx-auto">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-['Orbitron'] text-white mb-10 sm:mb-20 text-center sm:text-left responsive-title">
            <p className="text-3xl sm:text-4xl">
              <span className="text-white">{data.title}</span>
            </p>
          </h1>

          {/* Sections */}
          <div className="space-y-12 sm:space-y-16">
            {data.data.map((item, index) => (
              <div
                key={item._id}
                ref={sectionRefs[index]}
                className={index === 0 || index === 2 ? "flex flex-col" : ""}
              >
                <div
                  className={`flex justify-between section-flex ${
                    index === 1 || index === 3 ? "section-right" : ""
                  }`}
                >
                  {index === 1 || index === 3 ? (
                    <>
                      <div className="flex flex-col justify-center max-w-2xl section-content">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] text-white mb-2 responsive-heading animate-slide">
                          {item.title}
                        </h2>
                        <p className="text-gray-300 mb-4 sm:mb-8 leading-relaxed font-['Orbitron'] text-sm sm:text-base animate-slide">
                          {item.desc}
                        </p>
                        <button
                          className="bg-[#1A1A1A] text-white max-w-xs mobile-btn-center px-6 sm:px-8 py-2 sm:py-2.5 font-['Orbitron'] text-sm relative group overflow-hidden animate-slide"
                          style={{
                            background:
                              "linear-gradient(180deg, #333333 0%, #1A1A1A 100%)",
                            boxShadow:
                              "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "9999px",
                          }}
                        >
                          <span className="relative z-10 text-base sm:text-lg font-['Orbitron']">
                            {item.buttonDesc}
                          </span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "linear-gradient(180deg, #444444 0%, #2A2A2A 100%)",
                            }}
                          />
                        </button>
                      </div>
                      <div className="flex justify-center sm:justify-end section-image">
                        <img
                          src={item.image || images[index]}
                          className="lg:w-[80%] circle-image"
                          alt="section image"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="section-image">
                        <img
                          src={item.image || images[index]}
                          className="lg:w-[80%] circle-image"
                          alt="section image"
                        />
                      </div>
                      <div className="flex flex-col justify-center section-content">
                        <h2 className="text-xl sm:text-2xl md:text-3xl max-w-3xl font-['Orbitron'] text-white mb-2 responsive-heading animate-slide">
                          {item.title}
                        </h2>
                        <p className="text-gray-300 max-w-2xl mb-4 sm:mb-8 leading-relaxed font-['Orbitron'] text-sm sm:text-base animate-slide">
                          {item.desc}
                        </p>
                        <button
                          className="bg-[#1A1A1A] text-white px-6 sm:px-8 py-2 sm:py-2.5 max-w-xs mobile-btn-center font-['Orbitron'] text-sm relative group overflow-hidden animate-slide"
                          style={{
                            background:
                              "linear-gradient(180deg, #333333 0%, #1A1A1A 100%)",
                            boxShadow:
                              "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "9999px",
                          }}
                        >
                          <span className="relative z-10 text-base sm:text-lg font-['Orbitron']">
                            {item.buttonDesc}
                          </span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                "linear-gradient(180deg, #444444 0%, #2A2A2A 100%)",
                            }}
                          />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Timeless;