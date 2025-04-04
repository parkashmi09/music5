import React from "react";
import pic1 from "../../assets/create/pic1.png";
import pic2 from "../../assets/create/pic2.png";
import pic3 from "../../assets/create/pic3.png";
import pic4 from "../../assets/create/pic4.png";
import pic5 from "../../assets/create/pic5.png";
import pic6 from "../../assets/create/pic6.png";
import pic7 from "../../assets/create/pic7.png";

const CommonTestimonialCarousel = () => {
  const upperCards = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Justin_Korsgaard",
      avatar: pic1,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Zaire_Curtis",
      avatar: pic2,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Maren_Dokidis",
      avatar: pic3,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Marcus_Stanton",
      avatar: pic4,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Aspen_Lubin",
      avatar: pic5,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Zaire_Levin",
      avatar: pic6,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Jordyn_Passaquindici_Arcand",
      avatar: pic7,
    },
  ];

  const lowerCards = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Justin_Korsgaard",
      avatar: pic1,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Zaire_Curtis",
      avatar: pic2,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Maren_Dokidis",
      avatar: pic3,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Marcus_Stanton",
      avatar: pic4,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Aspen_Lubin",
      avatar: pic5,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Zaire_Levin",
      avatar: pic6,
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "@Jordyn_Passaquindici_Arcand",
      avatar: pic7,
    },
  ];

  return (
    <div className="bg-black py-16 overflow-hidden">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * 7 - 1.5rem * 7))} /* Accounts for card width and gap */
        }

        @keyframes scrollRight {
          0% { transform: translateX(calc(-350px * 7 - 1.5rem * 7))}
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
          {upperCards.map((card, index) => (
            <div
              key={`original-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.avatar}
                  alt={card.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.author}</span>
              </div>
            </div>
          ))}
          {/* Duplicated cards for seamless loop */}
          {upperCards.map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.avatar}
                  alt={card.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lower Row - Right to Left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6 scroll-right quicksand">
          {/* Original cards */}
          {lowerCards.map((card, index) => (
            <div
              key={`original-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.avatar}
                  alt={card.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.author}</span>
              </div>
            </div>
          ))}
          {/* Duplicated cards for seamless loop */}
          {lowerCards.map((card, index) => (
            <div
              key={`duplicate-${index}`}
              className="card p-8 pt-4 overflow-hidden bg-gradient-to-r from-[#505A66] via-[#435561] to-[#292B3A]"
              style={{ borderRadius: "24px" }}
            >
              <p className="text-white text-lg mb-6">{card.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={card.avatar}
                  alt={card.author}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-400">{card.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonTestimonialCarousel;
