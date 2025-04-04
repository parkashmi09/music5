

import React from "react";

const TestimonialCarousel = ({ data }) => {
  
  // Extract the testimonials from the data prop
  const testimonials = data?.data || [];

  return (
    <div className="bg-black py-16 overflow-hidden">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * ${testimonials.length} - 1.5rem * ${testimonials.length}))}
        }

        @keyframes scrollRight {
          0% { transform: translateX(calc(-350px * ${testimonials.length} - 1.5rem * ${testimonials.length}))}
          100% { transform: translateX(0); }
        }

        .scroll-left {
          animation: scrollLeft 10s linear infinite;
        }

        .scroll-right {
          animation: scrollRight 10s linear infinite;
        }

        .card {
          min-width: 350px;
          max-width: 350px;
        }

        .quicksand {
          font-family: 'Quicksand', sans-serif;
        }
      `}
      </style>

      {/* Upper Row - Left to Right */}
      <div className="mb-8 relative overflow-hidden">
        <div className="flex gap-6 scroll-left quicksand">
          {/* Original cards */}
          {testimonials.map((card, index) => (
            <div
              key={`original-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.desc}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.title}</span>
              </div>
            </div>
          ))}
          {/* Duplicated cards for seamless loop */}
          {testimonials.map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.desc}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lower Row - Right to Left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 scroll-right quicksand">
          {/* Original cards */}
          {testimonials.map((card, index) => (
            <div
              key={`original-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.desc}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.title}</span>
              </div>
            </div>
          ))}
          {/* Duplicated cards for seamless loop */}
          {testimonials.map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.desc}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;


