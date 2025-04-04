import React, { useEffect, useRef } from "react";
import cross1 from "../../assets/create/cross1.png";
import cross2 from "../../assets/create/cross2.png";
import cross3 from "../../assets/create/cross3.png";
import cross4 from "../../assets/create/cross4.png";
import cross5 from "../../assets/create/cross5.png";
import cross6 from "../../assets/create/cross6.png";
import cross7 from "../../assets/create/cross7.png";
import cross8 from "../../assets/create/cross8.png";
import cross9 from "../../assets/create/cross9.png";
import cross10 from "../../assets/create/cross10.png";
import { Play } from "lucide-react";

const ArtistCarousel = () => {
  const sectionRef = useRef(null);

  const imageData = [
    { image: cross1, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross2, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross3, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross4, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross5, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross6, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross7, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross8, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross9, title: "Lorem Ipsum", samples: "100 samples" },
    { image: cross10, title: "Lorem Ipsum", samples: "100 samples" },

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
          <div className=" mb-8 overflow-hidden">
            <div className="animate-slide text-center">
              <h2 className="text-4xl md:text-5xl font-['Orbitron'] text-white ">
                Music created by our{" "}
                <span className="text-[#7CFF01]">Artists</span>
              </h2>
            </div>
            <div className="lg:block hidden animate-slide text-center ">
              <p className="text-white text-xl md:text-2xl font-['Orbitron']">
                Some of the biggest artists in the game started
                <br />
                <p  className="">their careers at STUDIOSPHERE</p>
              </p>
            </div>
            <div className=" lg:hidden animate-slide text-center ">
              <p className="text-white text-xl md:text-2xl font-['Orbitron']">
                Some of the biggest artists in the game started their careers at STUDIOSPHERE
              </p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-6 pb-8 snap-x snap-mandatory">
                {imageData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-none w-[350px] h-[350px] rounded-2xl overflow-hidden snap-center image-container relative cursor-pointer group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    {/* Text and Play Button Overlay */}
                    <div className="image-overlay absolute inset-0 z-10">
                      <div className="absolute bottom-0 bg-white left-0 right-0 p-0 flex justify-between items-end">
                        <div>
                          <h3 className="text-black text-sm font-semibold mb-1">
                            <p className="text-lg ml-4 mb-0">{item.title}</p>
                          </h3>
                          <p className="text-yellow-400 text-sm mb-0">
                            <p className="text-lg ml-4 mb-0"> {item.samples}</p>
                          </p>
                        </div>
                        <button className="bg-black bg-opacity-50 rounded-full p-2 flex justify-center hover:bg-opacity-75 transition-all duration-300">
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
              {imageData.map((_, index) => (
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

export default ArtistCarousel;
