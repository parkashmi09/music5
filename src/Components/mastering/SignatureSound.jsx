import React, { useState } from "react";
import { Play } from "lucide-react";
import pic1 from "../../assets/mastering/pic1.png";
import fire from "../../assets/mastering/Fire.png";
import Clarity from "../../assets/mastering/Clarity.png";
import Tape from "../../assets/mastering/Tape.png";
import Natural from "../../assets/mastering/natural.png";
import Spatial from "../../assets/mastering/Spatial.png";
import cinema from "../../assets/mastering/cinema.png";
import punch from "../../assets/mastering/punch.png";
import button from "../../assets/mastering/Button.png";
import girl from "../../assets/mastering/girl.png";
import girl1 from "../../assets/mastering/girl1.png";
import girl2 from "../../assets/mastering/girl2.png";
import girl3 from "../../assets/mastering/girl3.png";

const PresetCard = ({ icon, title, description, tags, buttonDesc, buttonDesc1 }) => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePlanType = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        borderRadius: "40px",
        background:
          "radial-gradient(circle at center, #505A66 0%, #435561 36%, #292B3A 100%)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex items-center justify-center">
          <img src={icon} alt={title} className="w-full h-full" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-0.5 rounded-full bg-white text-black mb-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="text-white text-2xl font-['Orbitron']"
            style={{ textAlign: "center" }}
          >
            <style jsx>{`
              @media (min-width: 768px) {
                div {
                  text-align: left !important;
                }
              }
            `}</style>
            {title}
          </div>
          <div className="text-white text-sm" style={{ textAlign: "center" }}>
            <style jsx>{`
              @media (min-width: 768px) {
                div {
                  text-align: left !important;
                }
              }
            `}</style>
            {description}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button className="rounded-full transition-colors mb-3 sm:mb-0">
          <img src={button} alt="button" className="w-12 h-12" />
        </button>
        <div className="flex justify-center flex-1 w-full">
          <div
            className="flex flex-row bg-neutral-800 rounded-full p-1.5 gap-1.5 w-full"
            style={{ borderRadius: "9999px" }}
          >
            <button
              className={`font-bold text-sm sm:text-base px-4 sm:px-8 md:px-16 py-2 sm:py-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out relative z-10 font-['Orbitron'] w-full
              ${
                !isYearly
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-white/20"
              }`}
              onClick={togglePlanType}
              style={{ borderRadius: "9999px" }}
            >
              {buttonDesc || "Original"}
            </button>
            <button
              className={`font-bold text-sm sm:text-base px-4 sm:px-8 md:px-16 py-2 sm:py-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out relative z-10 font-['Orbitron'] w-full
              ${
                isYearly
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-white hover:bg-white/20"
              }`}
              onClick={togglePlanType}
              style={{ borderRadius: "9999px" }}
            >
              {buttonDesc1 || "Mastered"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignatureSound = ({ data }) => {
  // Use data from props if available, otherwise use static presets
  const presets = data?.data?.length > 0 ? data.data.map(item => ({
    icon: item.image,
    title: item.title,
    description: item.desc,
    tags: item.dataDesc,
    buttonDesc: item.buttonDesc,
    buttonDesc1: item.buttonDesc1
  })) : [

  ];

  const decorativeImages = [
    { src: girl, alt: "DJ Girl 1" },
    { src: girl1, alt: "DJ Girl 2" },
    { src: girl2, alt: "DJ Girl 3" },
    { src: girl3, alt: "DJ Girl 4" },
  ];

  // Split presets into rows of two
  const rows = [];
  for (let i = 0; i < presets.length; i += 2) {
    rows.push(presets.slice(i, i + 2));
  }

  return (
    <div className="min-h-screen px-4 lg:pt-12">
      <div className="max-w-full mx-auto">
        <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-['Orbitron'] mb-8 sm:mb-16 text-center">
          <p className="text-3xl sm:text-5xl">
          {data?.heading}
          </p>
        </h1>

        {/* Mobile view - stacked cards */}
        <div className="md:hidden space-y-6">
          {presets.map((preset, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-center">
                <img
                  src={decorativeImages[index % decorativeImages.length].src}
                  alt={decorativeImages[index % decorativeImages.length].alt}
                  className="w-32 h-32"
                />
              </div>
              <PresetCard {...preset} />
            </div>
          ))}
        </div>

        {/* Tablet view - one card per row with image */}
        <div className="hidden md:block lg:hidden">
          {presets.map((preset, index) => (
            <div
              key={index}
              className={`flex w-full gap-4 mb-8 ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-[20%] flex justify-center items-center">
                <img
                  src={decorativeImages[index % decorativeImages.length].src}
                  alt={decorativeImages[index % decorativeImages.length].alt}
                  className="w-24 h-24 sm:w-32 sm:h-32"
                />
              </div>
              <div className="w-[80%]">
                <PresetCard {...preset} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view - original layout */}
        <div className="hidden lg:block">
          {rows.map((rowPresets, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex w-full gap-4 mb-8 mt-8 ${
                rowIndex % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-[15%] flex justify-center items-center">
                <img
                  src={decorativeImages[rowIndex % decorativeImages.length].src}
                  alt={decorativeImages[rowIndex % decorativeImages.length].alt}
                  className="w-40 h-40"
                />
              </div>
              <div className="grid grid-cols-2 gap-6 flex-1">
                {rowPresets.map((preset, index) => (
                  <PresetCard key={index} {...preset} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignatureSound;