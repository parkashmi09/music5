import React from "react";
import industry from "../../assets/blog/industry.png";
import production from "../../assets/blog/production.png";
import promotion from "../../assets/blog/promotion.png";
import backgroundImage from "../../assets/blog/videos_bg.png";
import videoHeading from "../../assets/blog/HeadingLatestVideos.png";
import Youtube from "../../assets/blog/youtube.png";
import Youtube1 from "../../assets/blog/ybg.png";

import "../../styles/blog/latestVideo.css";

const videos = [
  {
    id: 1,
    category: "Industry",
    image: industry,
    title: "How Does the Spotify Algorithm Work? | STUDIOSPHERE Music.",
    description:
      "Learn how to crack the Spotify code with our insider tips on how Spotify's algorithm really works.",
    date: "January 9, 2025",
  },
  {
    id: 2,
    category: "Production",
    image: production,
    title: "Mastering Music Production Techniques | Pro Tips & Tricks.",
    description:
      "Discover essential production techniques that will elevate your sound to the next level.",
    date: "January 10, 2025",
  },
  {
    id: 3,
    category: "Promotion",
    image: promotion,
    title: "Music Promotion in 2025 | Strategies for Success.",
    description:
      "Get the latest marketing strategies to boost your music career and gain more streams.",
    date: "January 11, 2025",
  },
];

export default function LatestVideos() {
  return (
    <div
      className="container-fluid py-5 text-white production_wrapper"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-between align-items-center mb-4">
          <div className="col-md-6 text-md-start">
            <img src={videoHeading} alt="Latest Videos" className="img-fluid" />
          </div>
          <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
            <button className="d-flex align-items-center bg-[#FF0200] gap-2 px-3 "
            style={{borderRadius:"9999px"}}>
            <img src={Youtube1} className=" p-2 w-16 " />
            <span className="text-white">Subscribe</span>
            </button>
          </div>
        </div>
        <div className="row g-4">
          {videos.map((video) => (
            <div key={video.id} className="col-lg-4 col-md-6">
              <div className="card !bg-white cards h-100 shadow-sm border-0 position-relative">
                <div className="position-relative">
                  <img src={video.image} className="card-img-top" alt={video.category} />
                  <div className="position-absolute top-50 start-50 translate-middle text-white">
                    <img src={Youtube} className=" p-2" />
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className={`card-title ${video.category.toLowerCase()}`}>{video.category}</h5>
                  <h6 className="card-text fw-bold">{video.title}</h6>
                  <p className="text-muted flex-grow-1">{video.description}</p>
                  <span className="text-muted small">{video.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      
      </div>
    </div>
  );
}
