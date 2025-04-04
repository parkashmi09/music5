import React from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import bgimage1 from "../../assets/review/girl1.png";
import bgimage2 from "../../assets/review/girl2.png";
import bgimage3 from "../../assets/review/girl3.png";
import bgimage4 from "../../assets/review/girl4.png";

// ReviewCard Component (unchanged)
const ReviewCard = ({ userName, name, review, score, image }) => {
  return (
    <div className="bg-white rounded-3xl px-4 md:px-6 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="relative lg:w-[15%] w-full rounded-xl flex flex-col md:flex-row items-center justify-center">
            <div className="absolute top-0 left-0 bg-gray-900 w-full text-white text-center text-xs py-1 px-2 rounded-tl-lg rounded-br-lg">
              User Name: {userName}
            </div>
            <div className="pt-8 lg:pb-4 px-2 w-full flex justify-center">
              <img
                src={image}
                alt={name}
                className="lg:w-16 lg:h-16 object-cover rounded-full"
              />
            </div>
          </div>
          <div className="flex-1 w-full md:w-[88%] py-4 md:py-6 text-center md:text-left">
            <div
              className="font-['Orbitron'] text-xl mb-2"
              style={{ textAlign: "center" }}
            >
              <style jsx>{`
                @media (min-width: 768px) {
                  div {
                    text-align: left !important;
                  }
                }
              `}</style>
              {name}
            </div>
            <div
              className="text-gray-700 mb-3 text-sm md:text-base"
              style={{ textAlign: "center" }}
            >
              <style jsx>{`
                @media (min-width: 768px) {
                  div {
                    text-align: left !important;
                  }
                }
              `}</style>
              {review}
            </div>
            <div
              className="text-gray-600 text-xs md:text-sm flex gap-1 lg:ml-0 ml-24 "
              style={{ textAlign: "center" }}
            >
              <style jsx>{`
                @media (min-width: 768px) {
                  div {
                    text-align: left !important;
                  }
                }
              `}</style>
              Review details <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-auto ml-0 lg:ml-24 py-4 mx-auto lg:py-6 justify-center items-center lg:justify-start">
          {/* Score display */}
          <div className="flex items-center gap-1">
            <span className="font-['Orbitron'] text-2xl md:text-3xl text-[#3C4142] font-medium">
              {score}
            </span>
            <span className="text-[#3C4142] font-['Orbitron'] text-2xl md:text-3xl">
              /5
            </span>
            <span className="text-gray-400 font-['Orbitron'] text-xs ml-2">
              score
            </span>
          </div>

          {/* Dark button/bar with chevron */}
          <div className="w-24 md:w-32 h-6 md:h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-400"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ReviewsSection Component (updated with data mapping)
const ReviewsSection = ({ data }) => {
  // Map images to match the original structure
  const imageMap = [bgimage1, bgimage2, bgimage3, bgimage4];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-full md:max-w-[90%] mx-auto space-y-4">
        {data.map((review, index) => (
          <ReviewCard
            key={review._id}
            userName={review.userName} // Replaced userId with userName
            name={review.userName} // Using userName twice as requested
            review={review.description} // Mapping description to review
            score={review.rating.toFixed(1)} // Mapping rating to score (e.g., 5 -> 5.0)
            image={imageMap[index % imageMap.length]} // Cycle through images
          />
        ))}

        {/* Pagination */}
        <div className="flex flex-row justify-center items-center gap-4 md:gap-8 mt-8 text-white font-['Orbitron']">
          <button className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm md:text-base">
            <ChevronLeft size={16} /> Previous Page
          </button>
          <button className="flex items-center gap-2 hover:text-gray-300 transition-colors text-sm md:text-base">
            Next Page <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;