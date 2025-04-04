import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/home/unlock.png";
import "../../styles/home/Unlock.css";

function Unlock() {
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
              }, index * 100);
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
    <>
      <div ref={sectionRef} className="unlock-container">
        <img src={bgimage} alt="background" className="unlock-bg" />
        <div className="unlock-content">
          <h1 className="unlock-title animate-slide ">
            Unlock Your Potential with StudioSphere 360
          </h1>

          <div className="stats-container">
            <div className="stat-item animate-slide">
              <div className="stat-number">1</div>
              <div className="stat-title">AI-Driven Platform</div>
              <div className="stat-divider"></div>
            </div>

            <div className="stat-item animate-slide">
              <div className="number-wrapper">
                <div className="stat-number">100K</div>
                <div className="plus-sign">+</div>
              </div>
              <div className="stat-title1">Songs Created</div>
              <div className="stat-divider1"></div>
            </div>

            <div className="stat-item animate-slide">
              <div className="stat-number">
                50
                <span
                  className="plus
-sign1"
                >
                  +
                </span>
              </div>
              <div className="stat-title">Genres Supported</div>
              <div className="stat-divider"></div>
            </div>

            <div className="stat-item animate-slide">
              <div className="stat-number">22</div>
              <div className="stat-title">Artists Empowered</div>
              <div className="stat-divider"></div>
            </div>

            <div className="stat-item animate-slide">
              <div className="stat-number">5</div>
              <div className="stat-title">Years of Innovation</div>
              <div className="stat-divider"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Unlock;
