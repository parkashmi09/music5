import React from "react";

const Create1 = ({ data }) => {


  // Fallback data in case props.data is undefined
  const defaultData = {
    title: "Our producers, your perfect sound.",
    data: []
  };

  const sectionData = data || defaultData;

  // Define colors for each producer
  const producerColors = [
    "#E28412", // Tiana
    "#FFC2C2", // Omar
    "#FC5252", // Cheyenne
    "#FF12CB"  // Kaiya
  ];

  return (
    <div className="bg-black min-h-screen p-4 md:p-6 lg:p-8">
      <style>
        {`
          /* Default for mobile */
          .producer-info {
            text-align: center;
          }

          /* Override for larger screens */
          @media (min-width: 768px) {
            .producer-info {
              text-align: left !important;
            }
          }
        `}
      </style>

      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-['Orbitron'] text-center mb-8 md:mb-10 lg:mb-14">
        {sectionData.title}
      </div>

      <div className="mx-auto space-y-8 md:space-y-10 lg:space-y-12 max-w-[90%]">
        {sectionData.data.map((producer, index) => (
          <div
            key={producer._id}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-4 lg:gap-8 mb-12 md:mb-16 lg:mb-20`}
          >
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } w-full`}
            >
              {/* Image */}
              <div className="rounded-lg mb-4 lg:mb-0 mx-auto lg:mx-0">
                <img
                  src={producer.image}
                  alt={producer.title}
                  className="max-w-full h-auto"
                />
              </div>

              {/* Producer Info */}
              <div className="flex flex-col justify-center producer-info">
                <p
                  className="underline underline-offset-7 text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 lg:mb-4"
                  style={{ color: producerColors[index] || "#FFFFFF" }}
                >
                  {producer.title}
                </p>
                <div className="flex flex-col lg:flex-row items-center gap-1 md:gap-2 text-xl md:text-2xl lg:text-4xl">
                  <span className="text-white font-['Orbitron'] tracking-widest">
                    Achievements :
                  </span>
                  <span className="text-white font-['Orbitron'] tracking-widest">
                    {producer.desc.replace("Achievements: ", "")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Create1;