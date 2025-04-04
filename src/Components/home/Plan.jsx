import React, { useRef, useEffect } from "react";
import video1 from "../../assets/home/song.mp4";
import group from "../../assets/home/Group.png";
import "../../styles/home/Plan.css";

function Plan() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200); // Increased delay for better visual
            });
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="plan-container" ref={sectionRef}>
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={video1} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="plan-content">
        {/* Green Plans Banner */}
        <div className="plans-banner animate-slide">
          <h2>OUR PLANS</h2>
          <p>Lorem Ipsum is simply dummy text</p>
          <button className="buy-plan-btn">Buy our plan →</button>
        </div>

        {/* Plans Images */}
        <div className="img animate-slide" style={{ position: 'relative' }}>
          <img src={group} className="group1" alt="Studio Logo" />
        </div>
      </div>

      <style>
        {`
    @keyframes slideIn {
      0% {
        transform: translateX(100vw); /* Start from right edge of viewport */
        opacity: 0;
      }
      100% {
        transform: translateX(0); /* Move to original position */
        opacity: 1;
      }
    }
    
    .animate-slide {
      opacity: 0;
      transform: translateX(100vw); /* Start position at right edge */
      will-change: transform; /* Optimize animation performance */
    }
    
    .slide-in-animation {
      animation: slideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `}
      </style>
    </div>
  );
}

export default Plan;
