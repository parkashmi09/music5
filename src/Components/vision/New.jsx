import React, { useEffect, useRef } from "react";
import image2 from "../../assets/vision/Container.png";
import image1 from "../../assets/vision/Container1.png";

const New = ({data}) =>  {
  const sectionRef = useRef(null);
  const teamSectionRef = useRef(null);

  useEffect(() => {
    // Observer for the main section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            const bottomElements = entry.target.querySelectorAll(
              ".animate-slide-bottom"
            );

            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200);
            });

            bottomElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-up-animation");
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Dedicated observer for the team section
    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const teamSlideElements =
              entry.target.querySelectorAll(".animate-slide");
            const teamBottomElements = entry.target.querySelectorAll(
              ".animate-slide-bottom"
            );

            teamSlideElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200);
            });

            teamBottomElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-up-animation");
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (teamSectionRef.current) {
      teamObserver.observe(teamSectionRef.current);
    }

    setTimeout(() => {
      const triggerInitialAnimations = () => {
        if (sectionRef.current) {
          const elements = sectionRef.current.querySelectorAll(".animate-slide");
          const bottomElements = sectionRef.current.querySelectorAll(".animate-slide-bottom");
          
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("slide-in-animation");
            }, index * 200);
          });
          
          bottomElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("slide-up-animation");
            }, index * 200);
          });
        }
        
        if (teamSectionRef.current) {
          const teamSlideElements = teamSectionRef.current.querySelectorAll(".animate-slide");
          const teamBottomElements = teamSectionRef.current.querySelectorAll(".animate-slide-bottom");
          
          teamSlideElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("slide-in-animation");
            }, index * 200);
          });
          
          teamBottomElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("slide-up-animation");
            }, index * 200);
          });
        }
      };
      
      triggerInitialAnimations();
    }, 500);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (teamSectionRef.current) {
        teamObserver.unobserve(teamSectionRef.current);
      }
      observer.disconnect();
      teamObserver.disconnect();
    };
  }, []);

  // Find the about section and journey/team section from the data
  const aboutSection = data?.find(item => item.position === "top");
  const journeyTeamSection = data?.find(item => item.position === "topBottom");
  const journeyData = journeyTeamSection?.data?.[0];
  const teamData = journeyTeamSection?.data?.[1];

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-50px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideUp {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-slide {
            opacity: 0;
            transform: translateX(-50px);
            animation: slideIn 0.8s ease-out 1s forwards paused;
          }
          
          .animate-slide-bottom {
            opacity: 0;
            transform: translateY(50px);
            animation: slideUp 0.8s ease-out 1s forwards paused;
          }
          
          .slide-in-animation {
            animation: slideIn 0.8s ease-out forwards running !important;
          }
          
          .slide-up-animation {
            animation: slideUp 0.8s ease-out forwards running !important;
          }
          
          @media (max-width: 768px) {
            .force-visible {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              transition: opacity 0.5s ease-out, transform 0.5s ease-out;
            }
          }
          
          .content-paragraph {
            white-space: normal;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
            max-width: 100%;
            overflow-x: hidden;
          }
          
          .bullet-point {
            display: flex;
            margin-bottom: 8px;
          }
          
          .bullet-point::before {
            content: "•";
            margin-right: 8px;
          }
        `}
      </style>

      <div
        ref={sectionRef}
        className="text-white px-4 sm:px-6 lg:px-20 py-8 lg:py-12"
      >
        {/* About Section */}
        <div className="lg:max-w-2xl mb-8 lg:mb-0">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-slide text-center lg:text-left">
            {aboutSection?.title || "About StudioSphere 360"}
          </p>
          <div
            className="text-base sm:text-lg font-extralight text-white lg:pr-20 animate-slide-bottom content-paragraph force-visible"
            style={{ textAlign: "center" }}
          >
            <style jsx>{`
              @media (min-width: 768px) {
                div {
                  text-align: left !important;
                }
              }
            `}</style>
            {aboutSection?.desc || "Born from the frustration with outdated, expensive studio systems and an insatiable drive for innovation, Studiosphere 360 emerged as a game-changer in the music and creative industries."}
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 border items-center mt-8 lg:mt-16">
          {/* Image and Text for Mobile */}
          <div className="relative block md:hidden mb-6">
            <p className="text-2xl absolute sm:text-3xl left-16 top-44 flex items-center justify-center font-bold animate-slide mb-4 force-visible">
              {journeyData?.title || "Our Journey"}
            </p>
            <img
              src={image2}
              alt="Our Journey"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Left Image - Hidden on Mobile */}
          <div className="relative hidden md:flex items-center">
            <img
              src={image2}
              alt="Our Journey"
              className="w-[500px] h-[620px] object-cover"
            />
            <div className="absolute w-full">
              <p className="text-white text-4xl flex items-center mr-48 justify-center font-bold text-center animate-slide force-visible">
                {journeyData?.title || "Our Journey"}
              </p>
            </div>
          </div>

          {/* Right Text */}
          <div className="text-gray-300 font-extralight text-base sm:text-lg px-4 md:mr-40 overflow-visible">
            <div className="w-full animate-slide-bottom text-center md:text-left content-paragraph force-visible">
              {journeyData?.desc || "At StudioSphere 360, our journey is rooted in the belief that every artist deserves the opportunity to thrive in the music industry."}
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div
          ref={teamSectionRef}
          className="grid grid-cols-1 md:grid-cols-2 border gap-6 items-center justify-center mt-8"
        >
          {/* Image and Text for Mobile */}
          <div className="relative block md:hidden mb-6">
            <p className="text-2xl absolute left-16 top-44 sm:text-3xl flex items-center justify-center font-bold text-center animate-slide mb-4 force-visible">
              {teamData?.title || "Meet Our Team"}
            </p>
            <img
              src={image1}
              alt="Our Team"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Left Text */}
          <div className="flex items-center justify-center">
            <div className="text-gray-300 font-extralight text-base sm:text-lg px-4 md:ml-40">
              <p className="animate-slide-bottom text-center md:text-left content-paragraph force-visible">
                {teamData?.desc || "Our experienced leadership at StudioSphere 360 is committed to empowering artists and reshaping the music industry."}
              </p>
            </div>
          </div>

          {/* Right Image - Hidden on Mobile */}
          <div className="relative hidden md:flex justify-end items-center">
            <img
              src={image1}
              alt="Our Team"
              className="w-[500px] h-[620px] object-cover"
            />
            <div className="absolute flex items-center justify-center rounded-lg w-full">
              <p className="text-white text-4xl font-bold ml-40 animate-slide force-visible">
                {teamData?.title || "Meet Our Team"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default New;

