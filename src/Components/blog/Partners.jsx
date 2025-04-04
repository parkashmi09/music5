import React from "react";
import vector from "../../assets/blog/partners/Vector.png"; // Apple Music
import vector1 from "../../assets/blog/partners/Vector1.png"; // Amazon Music
import vector2 from "../../assets/blog/partners/Vector2.png"; // Spotify
import vector3 from "../../assets/blog/partners/Vector3.png"; // TikTok
import vector4 from "../../assets/blog/partners/Vector4.png"; // Meta
import vector5 from "../../assets/blog/partners/Vector5.png"; // Google

const logos = [vector, vector1, vector2, vector3, vector4, vector5];

export default function Part() {
  return (
    <div className="w-full py-0 mt-0 mb-0 pt-0">
      <div className="flex justify-center items-center ">
        <p className="lg:text-3xl font-bold text-white  font-['Quicksand']  ">
          Release your music on major music platforms. Keep your earnings and
          rights.{" "}
        </p>
      </div>

      {/* Logo slider container */}
      <div className="relative w-full overflow-hidden pt-4 pb-10">
        {/* This is the track that moves */}
        <div className="logo-track flex whitespace-nowrap">
          {/* Triple the logos for seamless looping */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="mx-10 flex items-center justify-center">
              <img
                src={logo}
                alt={`Partner logo ${index}`}
                className="logo-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add styles */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 3 * 2));
            }
          }
          
          .logo-track {
            animation: marquee 30s linear infinite;
            width: 300%; /* Triple width for 3 sets of logos */
          }
          
          .logo-track:hover {
            animation-play-state: paused;
          }
          
          /* Logo styling */
          .logo-image {
            filter: brightness(0) invert(1); /* Makes images white */
            height: auto;
            width: auto;
            max-height: 30px;
            max-width: 180px;
            margin: 0 15px;
            object-fit: contain;
            display: block;
          }
          
          @media (max-width: 768px) {
            .logo-track {
              animation: marquee 25s linear infinite;
            }
            .logo-image {
              max-height: 30px;
              max-width: 120px;
              margin: 0 10px;
            }
          }
        `}
      </style>
    </div>
  );
}
