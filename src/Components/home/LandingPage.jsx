import React, { useEffect, useRef } from "react";
import video from "../../assets/home/p.mp4";
import { TypeAnimation } from "react-type-animation";
import "../../styles/home/Landing.css";
import rotatingCd from "../../assets/home/Exclude.png";
import audio from "../../assets/home/audio.mp3";

export default function LandingPage() {
  const audioRef = useRef(null);
  
  useEffect(() => {
    // Function to try playing audio
    const attemptPlayAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay was prevented:", error);
          // Don't remove the event listeners on error, 
          // as we'll try again on next user interaction
        });
      }
    };
    
    // Try initial play (might fail due to browser policies)
    attemptPlayAudio();
    
    // Add event listeners for user interaction to play audio
    const handleUserInteraction = () => {
      attemptPlayAudio();
    };
    
    // Add multiple event types to catch any user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('mousemove', handleUserInteraction);
    
    return () => {
      // Clean up
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('mousemove', handleUserInteraction);
    };
  }, []);

  return (
    <div className="position-relative vh-100 overflow-hidden">
      {/* Background Video */}
      <video
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        src={audio} 
        loop 
        playsInline
      />

      {/* Content Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center bg-dark bg-opacity-50">
        <div className="container-all">
          <div className="row">
            <div className="col-lg-12">
              {/* Heading with CD */}
              <div className="d-flex align-items-center mb-3">
                <h1 className="landing_heading mb-0">
                  <TypeAnimation
                    sequence={["Your Creative", 1000]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={false}
                  />
                </h1>
                <div className="ms-0 cd-container">
                  <img
                    src={rotatingCd}
                    className="rotating-cd"
                    alt="Studio Logo"
                  />
                </div>
              </div>

              {/* Second line of heading */}
              <h1 className="landing_heading">
                <TypeAnimation
                  sequence={["Playground Awaits", 2000]}
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </h1>

              {/* Description */}
              <div className="description-container mt-4">
                <p className="landing_description">
                  <TypeAnimation
                    sequence={[
                      "Transform your ideas into professional-quality music, branding, and more—all in one place.",
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}