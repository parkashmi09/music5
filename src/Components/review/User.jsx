import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/review/bgimage.png";
import bgimage1 from "../../assets/review/Group.png";

function User() {
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
      <div className="relative min-h-[70vh] w-full" ref={sectionRef}>
        <img
          src={bgimage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col-reverse md:flex-row justify-between px-4 md:px-20 lg:py-0 md:py-0">
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 md:space-y-0 text-center md:text-left">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="text-2xl md:text-6xl animate-slide mb-4 md:mb-32">
                Reviews of Our Users
              </p>
              <div
                className=" text-sm lg:text-2xl max-w-3xl lg:pt-8  text-white font-['Orbitron']"
                style={{ textAlign: "center" }}
              >
                <style jsx>{`
                  @media (min-width: 768px) {
                    div {
                      text-align: left !important;
                    }
                  }
                `}</style>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </h1>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
            <img
              src={bgimage1}
              alt="background"
              className="lg:w-[70%] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
