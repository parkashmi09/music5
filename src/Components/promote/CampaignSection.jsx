import React from "react";

const CampaignSection = ({ data }) => {
  console.log("data is", data);

  // Extract ad types (excluding "Make An Impact" which we'll use for button)
  const adTypes = data?.data?.filter(item => item.title !== "Make An Impact")
    .map(item => item.title);

  // Get button text
  const buttonText = data?.data?.find(item => item.title === "Make An Impact")?.title || "Make An Impact";

  return (
    <div className="min-h-screen flex items-center p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image placeholder with custom shape */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative ">
            <img src={data.image} alt="Campaign" className="w-full h-full " />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-['Orbitron']">
            <p className="text-yellow-400">
              A custom campaign that hits all targets
            </p>
          </h1>

          <p className="text-white text-lg font-['Orbitron']">
            Give us your release details and we'll handle all the heavy lifting,
            designing a personalized campaign that's impossible to ignore.
          </p>

          {/* Tags container */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {adTypes.map((type, index) => (
              <span
                key={index}
                className="lg:px-4 py-2 px-3 bg-[#DDDDDD] rounded-full text-black text-sm font-['Orbitron']"
              >
                {type}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold transition-colors font-['Orbitron']"
            style={{ borderRadius: "9999px" }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignSection;