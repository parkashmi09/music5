import React, { useEffect, useRef } from "react";

const DataAnalysisPrograms = ({ data }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
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

  if (!data) return null;

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
          }
          
          .animate-slide-bottom {
            opacity: 0;
            transform: translateY(50px);
          }
          
          .slide-in-animation {
            animation: slideIn 0.8s ease-out forwards;
          }
          
          .slide-up-animation {
            animation: slideUp 0.8s ease-out forwards;
          }
        `}
      </style>

      <div ref={sectionRef} className="text-white min-h-screen p-8 py-4">
        <div className="max-w-[90%] mx-auto overflow-hidden">
          <h1 className="text-5xl font-['Orbitron'] mb-0">
            <p className="lg:text-5xl animate-slide">{data.title}</p>
          </h1>

          <p className="text-white font-light mt-4 lg:text-lg max-w-lg animate-slide-bottom">
            {data.desc}
          </p>

          <div className="grid grid-cols-1 mt-20 md:grid-cols-3 gap-0">
            {data.data.map((program, index) => (
              <div
                key={program._id}
                className="border border-gray-700 aspect-square flex flex-col"
              >
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="object-contain"
                  />
                </div>

                <div className="p-6 space-y-4 overflow-hidden">
                  <h3 className="text-lg font-['Orbitron']">
                    <p className="text-lg font-extralight mb-0 animate-slide-bottom">
                      {program.title}
                    </p>
                  </h3>
                  <p className="text-white font-extralight text-md mt-0 animate-slide-bottom">
                    {program.week} Weeks
                  </p>
                  <p className="text-white font-extralight font-['Orbitron'] animate-slide">
                    ${program.price}.00
                  </p>
                  <button className="bg-[#FD6262] hover:bg-red-500 text-black font-extralight font-['Orbitron'] py-2 px-4 rounded-md text-sm transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataAnalysisPrograms;
