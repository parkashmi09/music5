import React, { useState, useEffect } from "react";
import { Music, Video, Sliders, Pen, Share2, Radio } from "lucide-react";
import video from "../assets/Navbar/service.mp4";
import music from "../assets/Navbar/music.png";
import videop from "../assets/Navbar/video.png";
import mastering from "../assets/Navbar/mastering.png";
import rmusic from "../assets/Navbar/rmusic.png";
import song from "../assets/Navbar/song.png";
import peer from "../assets/Navbar/peer.png";
import lmusic from "../assets/Navbar/lmusic.png";
import insta from "../assets/Navbar/insta.png";
import amazon from "../assets/Navbar/amazon.png";
import Youtube from "../assets/Navbar/Youtube.png";
import Spotify from "../assets/Navbar/Spotify.png";
import tiktok from "../assets/Navbar/Tiktok.png";
import { useNavigate } from "react-router-dom";

const ServicesDropdown = ({ onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverText, setHoverText] = useState(
    "Distribution your songs on various platforms"
  );
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false); // Close the dropdown

    // Call the onItemClick function if it exists (to close mobile menu)
    if (onItemClick) {
      onItemClick();
    }

    navigate(path); // Navigate to the specified path
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

          .font-anton {
            font-family: 'Anton', sans-serif;
          }
          @media (max-width: 768px) {
  .music-distribution {
    order: -1; /* Make this appear first */
    margin-bottom: 1rem;
  }
  
  .music-distribution-content {
    padding: 1rem !important;
  }
}
          
        `}
      </style>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-transparent border-0 p-0 flex items-center"
        >
          <p className="font-['Anton'] font-[400] text-[18px] tracking-wider text-white hover:text-[#FD6262] transition-colors m-0 flex items-center">
            Services
            <svg
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-transparent"
              onClick={() => {
                setIsOpen(false);
                // Close mobile menu if dropdown is closed by clicking outside
                if (onItemClick && isMobile) {
                  onItemClick();
                }
              }}
              style={{ zIndex: 9998 }}
            />
            <div
              className="fixed left-0 right-0 mt-10 bg-black shadow-xl border-t border-gray-800 overflow-y-auto max-h-[90vh]"
              style={{ zIndex: 9999 }}
            >
              <div className="max-w-[85rem] mx-auto p-4 md:p-6">
                {!isMobile && (
                  <video
                    className="position-absolute top-0 start-0 w-full h-full"
                    src={video}
                    autoPlay
                    loop
                    muted
                  />
                )}
                {/* Service Cards Layout */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    {/* First Column - 3 Vertical Items */}
                    <div className="w-full md:w-[32%] flex flex-col gap-2">
                      <div>
                        <span className="text-xl md:text-2xl font-anton text-[#FC5252] tracking-wider">
                          CREATE
                        </span>
                      </div>
                      {/* Create Music */}
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-[#D9D9D9] transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FF6B6B40" }}
                        onClick={() => handleNavigation("/create")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FF6B6B" }}
                          >
                            <img src={music} className="w-12 md:w-12" />
                          </div>
                          <div className="w-full">
                            <p className="text-lg md:text-xl text-[#FC5252] font-anton font-bold mb-2">
                              Create Music
                            </p>

                            <p className="text-[#FC5252] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Create Video */}
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-[#D9D9D9] transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FF6B6B40" }}
                        onClick={() => handleNavigation("/video")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FF6B6B" }}
                          >
                            <img src={videop} className="w-30" />
                          </div>
                          <div>
                            <p className="text-lg md:text-xl text-[#FC5252] font-anton font-bold mb-2">
                              Create Video
                            </p>
                            <p className="text-[#FC5252] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mastering */}
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-[#D9D9D9] transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FF6B6B40" }}
                        onClick={() => handleNavigation("/mastering")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FF6B6B" }}
                          >
                            <img src={mastering} className="w-30" />
                          </div>
                          <div>
                            <p className="text-lg md:text-xl text-[#FC5252] font-anton font-bold mb-2">
                              Mastering
                            </p>
                            <p className="text-[#FC5252] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - 2 Items */}
                    <div className="w-full md:w-[32%] flex flex-col gap-2  md:mt-0">
                      {/* First Card */}
                      <div className="">
                        <span className="text-xl md:text-2xl font-anton text-[#FFA500] tracking-wider">
                          WRITING & RECORDING
                        </span>
                      </div>
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-yellow-400 transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FFA50040" }}
                        onClick={() => handleNavigation("/record")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FFA500" }}
                          >
                            <img src={rmusic} className="w-30" />
                          </div>
                          <div>
                            <p className="text-lg md:text-xl text-[#DB841D] font-anton font-bold mb-2">
                              Recording Music
                            </p>
                            <p className="text-[#DB841D] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Second Card */}
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-yellow-400 transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FFA50040" }}
                        onClick={() => handleNavigation("/song")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FFA500" }}
                          >
                            <img src={song} className="w-30" />
                          </div>
                          <div>
                            <p className="text-lg md:text-xl text-[#DB841D] font-anton font-bold mb-2">
                              Song Writing
                            </p>
                            <p className="text-[#DB841D] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Last Column - 2 Items */}
                    <div className="w-full md:w-[32%] flex flex-col gap-2 mt-0">
                      {/* First Card */}
                      <div>
                        <span className="text-xl md:text-2xl font-anton text-[#FF00FF] tracking-wider">
                          SHARING
                        </span>
                      </div>
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 hover:bg-pink-200 transition-all duration-300 cursor-pointer"
                        style={{ border: "1px solid #FF00FF40" }}
                        onClick={() => handleNavigation("/peer")}
                      >
                        <div className="flex gap-3">
                          <div
                            className="flex items-center justify-between"
                            style={{ color: "#FF00FF" }}
                          >
                            <img src={peer} className="w-30" />
                          </div>
                          <div>
                            <p className="text-lg md:text-xl text-[#FF00FF] font-anton font-bold mb-2">
                              Peer to Peer Collaboration
                            </p>
                            <p className="text-[#FF00FF] font-light font-anton text-xs md:text-sm mt-1">
                              Lorem ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem ipsum has been the
                              industry's standard dummy text ever since
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Second Card */}
                      <div
                        className="flex rounded-xl p-3 md:p-2 bg-black/70 mb-36 lg:mb-0 hover:bg-pink-200 transition-all duration-300 cursor-pointer "
                        style={{ border: "1px solid #FF00FF40" }}
                        onClick={() => handleNavigation("/music")}
                      >
                        <div className="flex flex-col">
                          <div className="flex gap-3">
                            <div
                              className="flex items-center justify-between"
                              style={{ color: "#FF00FF" }}
                            >
                              <img src={lmusic} className="w-30" />
                            </div>
                            <div>
                              <p className="text-lg md:text-xl text-[#FF00FF] font-anton font-bold mb-2">
                                Music Distribution
                              </p>
                              <p className="text-[#FF00FF] font-light font-anton text-xs md:text-sm mt-1">
                                Lorem ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem ipsum has been
                                the industry's standard dummy text ever since
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-4">
                            <div className="flex justify-center gap-3 items-baseline flex-wrap">
                              <div
                                className="cursor-pointer transition-transform hover:scale-110"
                                onMouseEnter={() =>
                                  setHoverText("Amazon Music")
                                }
                                onMouseLeave={() =>
                                  setHoverText(
                                    "Distribution your songs on various platforms"
                                  )
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigation("/amazon");
                                }}
                              >
                                <img
                                  src={amazon}
                                  alt="Amazon Music"
                                  className="w-8 md:w-auto"
                                />
                              </div>
                              <div
                                className="cursor-pointer transition-transform hover:scale-110"
                                onMouseEnter={() =>
                                  setHoverText("Share on Instagram")
                                }
                                onMouseLeave={() =>
                                  setHoverText(
                                    "Distribution your songs on various platforms"
                                  )
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigation("/instagram");
                                }}
                              >
                                <img
                                  src={insta}
                                  alt="Instagram"
                                  className="w-8 md:w-auto"
                                />
                              </div>
                              <div
                                className="cursor-pointer transition-transform hover:scale-110"
                                onMouseEnter={() =>
                                  setHoverText("Watch on YouTube")
                                }
                                onMouseLeave={() =>
                                  setHoverText(
                                    "Distribution your songs on various platforms"
                                  )
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigation("/youtube");
                                }}
                              >
                                <img
                                  src={Youtube}
                                  alt="YouTube"
                                  className="w-8 md:w-auto"
                                />
                              </div>
                              <div
                                className="cursor-pointer transition-transform hover:scale-110"
                                onMouseEnter={() =>
                                  setHoverText("Listen on Spotify")
                                }
                                onMouseLeave={() =>
                                  setHoverText(
                                    "Distribution your songs on various platforms"
                                  )
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigation("/spotify");
                                }}
                              >
                                <img
                                  src={Spotify}
                                  alt="Spotify"
                                  className="w-8 md:w-auto"
                                />
                              </div>
                              <div
                                className="cursor-pointer transition-transform hover:scale-110"
                                onMouseEnter={() =>
                                  setHoverText("Follow on TikTok")
                                }
                                onMouseLeave={() =>
                                  setHoverText(
                                    "Distribution your songs on various platforms"
                                  )
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigation("/tiktok");
                                }}
                              >
                                <img
                                  src={tiktok}
                                  alt="TikTok"
                                  className="w-8 md:w-auto"
                                />
                              </div>
                            </div>
                            <div className="bg-white rounded-lg p-2 max-w-sm mx-auto">
                              <p className="text-[#C00096] font-anton font-medium mb-0">
                                {hoverText}
                              </p>
                              <p className="text-[#C00096] text-xs mb-0 font-anton font-light">
                                Lorem ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ServicesDropdown;
