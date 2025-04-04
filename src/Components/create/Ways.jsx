import React, { useEffect, useRef } from "react";
import circle from "../../assets/create/circle.png";
import circle2 from "../../assets/create/circle2.png";
import circle3 from "../../assets/create/circle3.png";

const Ways = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when section is visible
            entry.target.classList.add("section-visible");

            // Find and animate the image in this section
            const image = entry.target.querySelector(".circle-image");
            if (image) {
              image.classList.add("pop-rotate-animation");
            }

            // Find and animate text elements
            const textElements =
              entry.target.querySelectorAll(".animate-slide");
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

    // Observe all sections
    [section1Ref, section2Ref, section3Ref].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [section1Ref, section2Ref, section3Ref].forEach((ref) => {
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
      transform: scale(0);  /* Initial state */
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
      
      .section-content {
        order: 2;
        text-align: center;
        margin-top: 1rem;
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
      
      .mobile-center {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
      
      .mobile-ml-0 {
        margin-left: 0 !important;
      }
    }
  `}
      </style>
      <div className="bg-black min-h-screen px-4 sm:px-8 py-8 sm:py-16">
        <div className="max-w-[90%] mx-auto">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-['Orbitron'] text-white mb-10 sm:mb-20 text-center sm:text-left">
            <p className="text-3xl sm:text-5xl">
              <span className="text-[#FF6B6B]">3 ways</span> to make your music
              work for you
            </p>
          </h1>

          {/* Sections */}
          <div className="space-y-16">
            {/* Section 1 - Center Aligned */}
            <div ref={section1Ref} className="flex flex-col">
              <div className="flex justify-between section-flex">
                <div className="section-image">
                  <img
                    src={circle}
                    className="lg:w-[80%] w-full circle-image"
                    alt="rotating circle"
                  />
                </div>
                <div className="flex flex-col justify-center section-content">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] text-white mb-2 mobile-center">
                    1. Create On Any DAW With <br />
                    <span className="text-[#7CFF01] ml-0 sm:ml-8 mobile-ml-0">
                      StudioSphere 360
                    </span>
                  </h2>
                  <p className="text-gray-300 max-w-2xl mb-4 sm:mb-8 leading-relaxed font-['Orbitron'] text-sm sm:text-base mobile-center">
                    Get raw creative power with StudioSphere 360. This isn’t
                    your average plug-and-play tool—it’s built to integrate
                    seamlessly with any DAW, whether you’re in Ableton, Pro
                    Tools, Logic, FL Studio, or beyond. No fluff, just a robust,
                    forward-thinking platform designed to work exactly how you
                    do. Enjoy unrestricted creative freedom, innovative
                    features, and the kind of versatility that lets you focus on
                    making music that stands out. If you’re ready to break the
                    mold and push your production to the next level,
                    StudioSphere 360 is your next essential tool.
                  </p>
                  <button
                    className="bg-[#1A1A1A] text-white px-6 sm:px-8 py-2 sm:py-2.5 max-w-xs sm:mx-0 font-['Orbitron'] text-xs sm:text-sm relative group overflow-hidden"
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
                      Try our assistant
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
              </div>
            </div>

            {/* Section 2 - Left Aligned */}
            <div ref={section2Ref} className="">
              <div className="flex justify-between section-flex section-right">
                <div className="flex flex-col justify-center max-w-2xl section-content">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] mb-2 mobile-center">
                    <span className="text-[#FFD700]">2. STUDIOSPHERE 360</span>{" "}
                    <span className="text-white">Studio –</span>
                  </h2>
                  <p className="text-white text-lg sm:text-xl md:text-2xl ml-0 sm:ml-11 mobile-ml-0 font-['Orbitron'] mb-2 sm:mb-4 mobile-center">
                    Elevate Your Project To New Heights
                  </p>
                  <p className="text-gray-300 mb-4 sm:mb-8 leading-relaxed font-['Orbitron'] text-sm sm:text-base mobile-center">
                    No more limits. STUDIOSPHERE 360 Studio is a next-gen
                    production platform engineered for creatives who are ready
                    to push boundaries. This isn’t a gimmick—it's a powerhouse
                    that integrates effortlessly with any DAW, unleashing a full
                    arsenal of cutting-edge tools and innovative features.
                    Whether you're refining your beats or sculpting a sonic
                    masterpiece, STUDIOSPHERE 360 Studio gives you the freedom
                    to experiment, innovate, and transform your project into
                    something extraordinary. It’s time to leave ordinary behind
                    and take your sound to the next level.
                  </p>
                  <button
                    className="bg-[#1A1A1A] text-white max-w-xs sm:mx-0 px-6 sm:px-8 py-2 sm:py-2.5 font-['Orbitron'] text-xs sm:text-sm relative group overflow-hidden"
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
                      Open studio
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
                    src={circle2}
                    className="lg:w-[80%] w-full circle-image"
                    alt="rotating circle"
                  />
                </div>
              </div>
            </div>

            {/* Section 3 - Center Aligned */}
            <div ref={section3Ref} className="flex flex-col">
              <div className="flex justify-between section-flex">
                <div className="section-image">
                  <img
                    src={circle3}
                    className="w-full lg:w-[80%]  circle-image"
                    alt="rotating circle"
                  />
                </div>
                <div className="flex flex-col justify-center max-w-2xl section-content">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] text-white mb-2 mobile-center">
                    3. Get Inspired On The GO With{" "}
                    <span className="text-[#FF69B4] ml-0 sm:ml-11 mobile-ml-0">
                      Studiosphere 360
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-4 sm:mb-8 leading-relaxed font-['Orbitron'] text-sm sm:text-base mobile-center">
                    Stop waiting for the perfect studio environment.
                    Studiosphere 360 is your on-the-move creative companion,
                    designed for creators who hustle wherever they are. Whether
                    you're on a train, in a café, or simply away from your usual
                    setup, this service puts a powerful suite of tools right at
                    your fingertips. Capture ideas instantly, experiment with
                    soundscapes, and stay in tune with your creative flow
                    without skipping a beat. It's innovation that travels with
                    you—raw, efficient, and ready to push your projects to the
                    next level, anytime, anywhere.
                  </p>
                  <button
                    className="bg-[#1A1A1A] text-white px-6 sm:px-8 py-2 sm:py-2.5 max-w-xs  sm:mx-0 font-['Orbitron'] text-xs sm:text-sm relative group overflow-hidden"
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
                      Create account
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ways;
