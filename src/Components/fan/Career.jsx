import React, { useEffect, useRef } from "react";
import group1 from "../../assets/fan-reach/Group1.png";
import group2 from "../../assets/fan-reach/Group2.png";
import group3 from "../../assets/fan-reach/Group3.png";

const Career = ({ data }) => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const sectionRefs = [section1Ref, section2Ref, section3Ref];
  const defaultImages = [group1, group2, group3];


  // Use data from props if available, otherwise use default values
  const mainTitle = data?.title || "Start music as your career in 3 easy steps";
  const sections = data?.data || [
    {
      title: "Create Your Sound:",
      desc: "Dive into our intuitive recording and production tools to craft your unique sound. Studiosphere 360 offers an all-in-one studio where you can write, record, mix, and master your music—no need to juggle multiple platforms or invest in expensive equipment.",
      buttonDesc: "Try Now",
      image: group1,
    },
    {
      title: "Launch Your Project:",
      desc: "Once your track is polished, easily distribute it across all major streaming platforms with just a few clicks. Our streamlined process ensures your music reaches a global audience, maximizing your exposure without the hassle.",
      buttonDesc: "Try Now",
      image: group2,
    },
    {
      title: "Connect and Grow:",
      desc: "Engage with a vibrant community of fans, fellow artists, and industry experts. Use our integrated promotional tools and real-time analytics to build your brand, refine your strategy, and turn your passion into a thriving career. With Studiosphere 360, starting your music career is straightforward, efficient, and designed to empower you every step of the way.",
      buttonDesc: "Try Now",
      image: group3,
    },
  ];

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
      <div className="bg-black min-h-screen px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl flex justify-center font-['Orbitron'] text-white mb-20 responsive-title">
            <p className="lg:text-5xl text-2xl">{mainTitle}</p>
          </h1>

          {/* Sections */}
          <div className="space-y-16">
            {sections.map((item, index) => (
              <div
                key={item._id || index}
                ref={sectionRefs[index]}
                className={index === 0 || index === 2 ? "flex flex-col" : ""}
              >
                <div
                  className={`flex justify-between section-flex ${
                    index === 1 ? "section-right" : ""
                  }`}
                >
                  {index === 1 ? (
                    <>
                      <div className="flex flex-col justify-center max-w-2xl section-content">
                        <h2 className="text-2xl md:text-3xl font-['Orbitron'] text-[#NEW_COLOR] mb-2 responsive-heading animate-slide">
                          {item.title}
                        </h2>
                        <p className="text-gray-300 mb-8 leading-relaxed font-['Orbitron'] lg:text-2xl text-base animate-slide">
                          {item.desc}
                        </p>
                        <button
                          className="bg-[#1A1A1A] text-white max-w-xs mobile-btn-center px-8 py-2.5 font-['Orbitron'] text-sm relative group overflow-hidden animate-slide"
                          style={{
                            background: "linear-gradient(180deg, #333333 0%, #1A1A1A 100%)",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "9999px",
                          }}
                        >
                          <span className="relative z-10 text-lg font-['Orbitron']">
                            {item.buttonDesc}
                          </span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(180deg, #444444 0%, #2A2A2A 100%)" }}
                          />
                        </button>
                      </div>
                      <div className="flex justify-center sm:justify-end section-image">
                        <img
                          src={item.image || defaultImages[index]}
                          className="circle-image"
                          alt="section image"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="section-image">
                        <img
                          src={item.image || defaultImages[index]}
                          className="circle-image"
                          alt="section image"
                        />
                      </div>
                      <div className="flex flex-col justify-center section-content">
                        <h2
                          className={`text-2xl md:text-3xl font-['Orbitron'] mb-2 responsive-heading animate-slide ${
                            index === 0
                              ? "text-[#FC5252]"
                              : index === 1
                              ? "text-[#FFD700]"
                              : "text-[#00FF08]"
                          }`}
                        >
                          {item.title}
                        </h2>
                        <p className="text-gray-300 max-w-2xl mb-8 leading-relaxed font-['Orbitron'] lg:text-2xl text-base animate-slide">
                          {item.desc}
                        </p>
                        <button
                          className="bg-[#1A1A1A] text-white px-8 py-2.5 max-w-xs mobile-btn-center font-['Orbitron'] text-sm relative group overflow-hidden animate-slide"
                          style={{
                            background: "linear-gradient(180deg, #333333 0%, #1A1A1A 100%)",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "9999px",
                          }}
                        >
                          <span className="relative z-10 text-lg font-['Orbitron']">
                            {item.buttonDesc}
                          </span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ background: "linear-gradient(180deg, #444444 0%, #2A2A2A 100%)" }}
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
};

export default Career;