import React, { useState } from "react";

const Inspired = ({ data }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  // Split genres into two rows (roughly equal halves)
  const genreList = data.data.map(item => item.title);
  const middleIndex = Math.ceil(genreList.length / 2);
  const genres = [
    genreList.slice(0, middleIndex),
    genreList.slice(middleIndex)
  ];

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleGetStarted = () => {
    console.log("Starting with genre:", selectedGenre);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
          
          .quicksand {
            font-family: 'Quicksand', sans-serif;
          }
          
          @media (max-width: 768px) {
            .genre-container {
              gap: 8px !important;
            }
            
            .genre-button {
              padding: 8px 16px !important;
              font-size: 14px !important;
              min-width: calc(50% - 16px);
              margin-bottom: 8px;
            }
          }
          
          @media (max-width: 480px) {
            .genre-button {
              min-width: calc(100% - 16px);
              margin-bottom: 8px;
            }
          }
        `}
      </style>
      <div className="min-h-[90vh] bg-black text-white flex flex-col items-center quicksand justify-center p-4 sm:p-6">
        <div className="mt-0 w-full max-w-4xl lg:max-w-[90%]">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {data.title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 text-center">
            Pick a genre
          </p>
        </div>

        <div className="w-full max-w-4xl lg:max-w-[90%]">
          {genres.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center gap-10 mb-4 genre-container"
            >
              {row.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  className="genre-button-wrapper"
                >
                  <p
                    className={`
                      px-8 py-3 rounded-full text-base sm:text-lg genre-button
                      ${
                        selectedGenre === genre
                          ? "bg-white text-black"
                          : "bg-gray-400 text-black hover:bg-gray-500"
                      }
                      transition-colors duration-300
                    `}
                  >
                    {genre}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handleGetStarted} className="w-full max-w-xs">
          <p
            className="w-full mt-8 sm:mt-12 px-6 sm:px-8 py-2 sm:py-3 bg-[#3C4142] hover:bg-gray-600 
                 rounded-full text-lg sm:text-xl text-white transition-colors duration-300"
            style={{
              background: "linear-gradient(180deg, #333333 0%, #1A1A1A 100%)",
              boxShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "9999px",
            }}
          >
            Get Started
          </p>
        </button>

        <div className="mt-6 sm:mt-8 text-center">
          <span className="text-gray-400 mr-2">Or</span>
          <button className="text-white hover:underline">Enter Lyric</button>
        </div>
      </div>
    </>
  );
};

export default Inspired;