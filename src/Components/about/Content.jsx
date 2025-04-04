import React from "react";

const Content = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  // Get the first item from the array since data is an array with one object
  const aboutData = data[0];

  
  return (
    <div className="text-white min-h-screen lg:p-8">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-['Orbitron'] mb-6">
          <p className="lg:text-4xl">{aboutData.subTitle}</p>
        </h1>
        <div className="lg:ml-16">
          {/* Split description into paragraphs and map them */}
          {aboutData.description.split('\n\n').map((paragraph, index) => (
            <p 
              key={index}
              className="font-normal mb-6 text-sm md:text-base lg:text-md"
            >
              {paragraph}
            </p>
          ))}
          
          {/* You can add the image if needed */}
          {/* {aboutData.image && (
            <img 
              src={aboutData.image} 
              alt="About Us" 
              className="mb-6 max-w-full h-auto"
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Content;