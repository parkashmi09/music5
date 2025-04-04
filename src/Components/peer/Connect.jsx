import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/peer/bgimage.png";
import arrow from "../../assets/create/arrow.png";
import i1 from "../../assets/create/i1.png";
import i2 from "../../assets/create/i2.png";
import i3 from "../../assets/create/i3.png";
import i4 from "../../assets/create/i4.png";
import i5 from "../../assets/create/i5.png";

function Connect({data}) {
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
              }, index * 200); // Increased delay between elements
            });
          }
        });
      },
      {
        threshold: 0.1, // Reduced threshold for earlier triggering
        rootMargin: "50px", // Added margin to trigger earlier
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
                        /* Button styles */
    .create-button {
      background-color: white;
      color: black;
      height: 48px;
      padding: 0 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .create-button:hover {
  background-color: #f9d94c; /* This is the yellow color from your image */
    }
    
    .create-button img {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      transition: transform 0.5s ease-in-out;
    }
    
    .create-button:hover img {
      transform: translateX(4px);
    }
            @media (max-width: 640px) {
              .create-button {
      background-color: white;
      color: black;
      height: 34px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      border: none;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

              }
        `}
      </style>
      <div
        className="relative min-h-[70vh] h-auto w-full lg:px-20 py-8 overflow-y-auto"
        ref={sectionRef}
      >
        {" "}
        <img
          src={data?.image}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full h-full flex flex-col justify-center  z-10">
          <div className="space-y-4 ">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-5xl text-3xl leading-normal animate-slide">
                Connect Collaborate,
              </p>
              <p className="lg:text-5xl text-3xl leading-normal animate-slide">
                Create Together.
              </p>
            </h1>
            <div>
              {/* <p className="text-white text-xs lg:text-sm">
                The Studiosphere 360 Gold package is your all-access pass to the
                ultimate creative network. Forget working in isolation—this
                platform brings together industry-leading songwriters, music
                producers, engineers, and artists into one dynamic ecosystem.
                Here's how it works: • Real-Time Collaboration: Jump into live
                sessions with peers from around the globe. Share tracks, swap
                ideas, and make instant tweaks together, just like you would in
                a state-of-the-art studio. • Integrated Communication Tools: No
                more endless email threads. With built-in chat, video
                conferencing, and project boards, every creative conversation
                happens in one centralized hub—keeping your workflow fast and
                efficient. • Seamless Project Management: Organize
                collaborations with intuitive project timelines, file-sharing
                capabilities, and real-time updates. Stay on top of every beat,
                note, and edit with a system designed for modern music
                production. • Diverse Creative Input: Leverage the collective
                genius of industry professionals. Whether you need a hot lyric,
                a refined mix, or groundbreaking production techniques, the Gold
                package ensures you're connected to experts who elevate your
                sound. • Secure and Scalable: Work with confidence knowing that
                your projects are backed by robust security and scalable tools
                that grow with your ambitions. The Studiosphere 360 Gold package
                isn’t about waiting for the perfect moment—it’s about creating
                it together, right now. It’s raw, efficient, and built for those
                who are ready to push the boundaries of music collaboration.
              </p> */}
            </div>
            <div className="">
              <button className="create-button">
                <span>Create Now</span>
                <img src={arrow} alt="arrow" />
              </button>
            </div>
            <div className="mt-4">
            <p className="text-white font-['Orbitron'] text-lg mb-4 ">
              {data?.title}
            </p>
            <div className="flex gap-2 lg:flex-nowrap ">
              {data?.data?.map((img, index) => (
                <div key={index} className="">
                  <img src={img.image} alt={`Label ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connect;
