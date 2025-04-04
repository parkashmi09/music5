import React, { useEffect, useRef } from "react";
import group1 from "../../assets/career/Group1.png";
import group2 from "../../assets/career/Group2.png";
import group3 from "../../assets/career/Group3.png";

const Consistency = ({ data }) => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            const image = entry.target.querySelector(".circle-image");
            if (image) {
              image.classList.add("pop-animation"); // Changed from pop-rotate-animation
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

  if (!data || !data.data) {
    return null;
  }

  return (
    <>
      <style>
        {`
    @keyframes initialAnimation {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      20% {
        transform: scale(0);
        opacity: 1;
      }
      30% {
        transform: scale(1);
      }
    }

    .circle-image {
      // transform: scale(0);
    }

    .pop-animation {
      opacity: 1;
      animation: initialAnimation 2s ease-out forwards;
      animation-delay: 0.2s;
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
  `}
      </style>
      <div className="bg-black min-h-screen px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl flex justify-center font-['Orbitron'] text-white mb-20">
            <p className="lg:text-5xl">{data.title}</p>
          </h1>

          <div className="space-y-16">
            {/* Section 1 */}
            <div ref={section1Ref} className="flex flex-col mt-16">
              <div className="lg:flex lg:flex-row flex-col justify-between">
                <div className="flex justify-center lg:justify-start">
                  <img src={group1} className="circle-image" alt="circle" />
                </div>
                <div className="flex flex-col justify-center mt-4 lg:mt-0">
                  <h2 className="text-2xl md:text-3xl font-['Orbitron']">
                    <div
                      className="text-[#FFD700] mb-0 text-xl lg:text-3xl animate-slide"
                      style={{ textAlign: "center" }}
                    >
                      <style jsx>{`
                        @media (min-width: 768px) {
                          div {
                            text-align: left !important;
                          }
                        }
                      `}</style>
                      {data.data[0].title}
                    </div>
                  </h2>
                  <div
                    className="text-gray-300 max-w-2xl mb-8 lg:text-2xl leading-relaxed font-['Orbitron'] animate-slide"
                    style={{ textAlign: "center" }}
                  >
                    <style jsx>{`
                      @media (min-width: 768px) {
                        div {
                          text-align: left !important;
                        }
                      }
                    `}</style>
                    {data.data[0].desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div ref={section2Ref} className="">
              <div className="flex lg:flex-row flex-col justify-between">
                <div className="flex justify-center lg:hidden">
                  <img src={group2} className="circle-image" alt="circle" />
                </div>
                <div className="flex flex-col justify-center max-w-2xl mt-4 lg:mt-0">
                  <h2 className="text-3xl font-['Orbitron']">
                    <div
                      className="text-[#FFD700] text-lg lg:text-3xl animate-slide"
                      style={{ textAlign: "center" }}
                    >
                      <style jsx>{`
                        @media (min-width: 768px) {
                          div {
                            text-align: left !important;
                          }
                        }
                      `}</style>
                      {data.data[1].title}
                    </div>
                  </h2>
                  <div
                    className="text-gray-300 mb-8 lg:text-2xl max-w-2xl leading-relaxed font-['Orbitron'] animate-slide"
                    style={{ textAlign: "center" }}
                  >
                    <style jsx>{`
                      @media (min-width: 768px) {
                        div {
                          text-align: left !important;
                        }
                      }
                    `}</style>
                    {data.data[1].desc}
                  </div>
                </div>
                <div className="hidden lg:flex justify-end">
                  <img src={group2} className="circle-image" alt="circle" />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div ref={section3Ref} className="flex flex-col">
              <div className="flex lg:flex-row flex-col justify-between">
                <div className="flex justify-center lg:justify-start">
                  <img src={group3} className="circle-image" alt="circle" />
                </div>
                <div className="flex flex-col justify-center max-w-2xl mt-4 lg:mt-0">
                  <h2 className="text-2xl md:text-3xl font-['Orbitron'] text-white mb-2">
                    <div
                      className="text-[#FC5252] text-xl lg:text-3xl animate-slide"
                      style={{ textAlign: "center" }}
                    >
                      <style jsx>{`
                        @media (min-width: 768px) {
                          div {
                            text-align: left !important;
                          }
                        }
                      `}</style>
                      {data.data[2].title}
                    </div>
                  </h2>
                  <div
                    className="text-gray-300 mb-8 lg:text-2xl leading-relaxed font-['Orbitron'] animate-slide"
                    style={{ textAlign: "center" }}
                  >
                    <style jsx>{`
                      @media (min-width: 768px) {
                        div {
                          text-align: left !important;
                        }
                      }
                    `}</style>
                    {data.data[2].desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Consistency;