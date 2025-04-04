import React from "react";

const Information = ({ description }) => {
  // If no description is provided, return null or a fallback message
  if (!description) {
    return (
      <div className="text-white min-h-screen lg:p-8">
        <div className="max-w-[90%] mx-auto">
          <p>No privacy policy information available.</p>
        </div>
      </div>
    );
  }

  // Format the text - split by paragraph breaks and headers
  const formatDescription = () => {
    // Split the text by newline characters
    const paragraphs = description.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if this looks like a header (shorter text that doesn't end with a period)
      const isHeader = paragraph.length < 50 && !paragraph.trim().endsWith('.');
      
      if (isHeader) {
        return (
          <h2 key={index} className="text-xl font-['Orbitron'] mb-3">
            <p className="lg:text-2xl">{paragraph}</p>
          </h2>
        );
      } else {
        return (
          <p key={index} className="text-white font-normal mb-6 text-sm lg:text-lg">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <div className="text-white min-h-screen lg:p-8">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-['Orbitron'] mb-6">
          <p className="lg:text-4xl">Privacy Policy</p>
        </h1>
        <div className="lg:ml-16">
          {formatDescription()}
        </div>
      </div>
    </div>
  );
};

export default Information;
