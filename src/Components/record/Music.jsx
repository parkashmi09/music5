import React from "react";
import bg1 from "../../assets/record/bg.png";
import bg2 from "../../assets/record/Group.png";

const Music = ({data}) => {
  // Use data from props if available, otherwise use default values
  const title = data?.title || "To Record Music On STUDIOSPHERE, Use The Built-In Recording Feature Or Upload Your Audio Files Directly Through The Platform.";
  const description = data?.desc || "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.";
  const imageSrc = data?.image || bg1;

  return (
    <div className="">
      <div
        className="relative bg-cover bg-center lg:px-16 bg-no-repeat"
        style={{
          backgroundImage: `url(${bg2})`,
        }}
      >
        <div className="relative w-full h-[700px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat my-12"
            style={{
              backgroundImage: `url(${imageSrc})`,
              filter: "brightness(0.9)",
            }}
          />

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-8">
            <h1
              className="text-xl md:text-5xl font-bold mb-6 max-w-7xl leading-tight"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <p className="lg:text-4xl text-xl">
                {title.split('STUDIOSPHERE').map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < title.split('STUDIOSPHERE').length - 1 && (
                      <span className="text-[#7FFF00]">STUDIOSPHERE</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </h1>

            <p
              className="text-sm lg:text-xl max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;