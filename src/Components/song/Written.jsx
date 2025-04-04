import React, { useEffect, useRef } from "react";
import cross1 from "../../assets/song/pic1.png";
import cross2 from "../../assets/song/pic2.png";
import cross3 from "../../assets/song/pic3.png";
import cross4 from "../../assets/song/pic4.png";
import cross5 from "../../assets/song/pic5.png";
import cross6 from "../../assets/song/pic6.png";
import cross7 from "../../assets/song/pic7.png";
import cross8 from "../../assets/song/pic8.png";
import cross9 from "../../assets/song/pic9.png";
import cross10 from "../../assets/song/pic10.png";
import { Play } from "lucide-react";

const Written = ({ data }) => {
  // console.log(data, "data^^^^^");
  const sectionRef = useRef(null);

  const fallbackImages = [
    cross1, cross2, cross3, cross4, cross5,
    cross6, cross7, cross8, cross9, cross10
  ];

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
        threshold: 0.3,
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
          @keyframes slideInFromRight {
            0% {
              transform: translateX(100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .animate-slide {
            opacity: 0;
            transform: translateX(100px);
          }
          
          .slide-in-animation {
            animation: slideInFromRight 0.8s ease-out forwards;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .image-container {
            transition: all 0.3s ease;
          }

          .image-container:hover {
            transform: scale(1.05);
          }

          .image-container:hover .image-overlay {
            opacity: 1;
          }

          .image-container:hover img {
            transform: scale(1.1);
          }

          .image-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
            transition: all 0.3s ease;
            opacity: 0;
          }
        `}
      </style>
      <div className="py-8 px-4" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          {/* Heading Section */}
          <div className="text-center mb-8 overflow-hidden">
            <div className="animate-slide">
              <h2 className="text-4xl md:text-5xl font-['Orbitron'] text-white mb-4">
                {data.title}
              </h2>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-6 pb-8 snap-x snap-mandatory">
                {data.data.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex-none w-[350px] h-[350px] rounded-2xl overflow-hidden snap-center image-container relative cursor-pointer group"
                  >
                    <img
                      src={item.image || fallbackImages[index]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    {/* Text and Play Button Overlay */}
                    <div className="image-overlay absolute inset-0 z-10">
                      {/* Create a gradient overlay at the bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-[#D9D9D9] backdrop-blur-lg"></div>
                      {/* Content container with proper z-index */}
                      <div className="absolute bottom-0 p-2 left-0 right-0 flex justify-between items-center z-20">
                        <div>
                          <h3 className="text-white text-sm font-semibold mb-1">
                            <p className="text-[1.2rem] font-['poppins'] ml-4 mb-0">
                              Created by: {item.title}
                            </p>
                          </h3>
                          <p className="text-white text-sm mb-0">
                            <p className="text-sm ml-4 font-extralight font-['poppins'] mb-0">
                              {item.desc}
                            </p>
                          </p>
                        </div>
                        <button
                          className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                          style={{ borderRadius: "9999px" }}
                        >
                          <Play fill="white" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {data.data.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? "bg-white" : "bg-gray-600"
                  } transition-all duration-300`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Written;