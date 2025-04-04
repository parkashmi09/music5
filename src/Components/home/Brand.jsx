import React, { useEffect, useRef } from "react";
import video1 from "../../assets/home/video2.mp4";
import video2 from "../../assets/home/video4.mp4";
import video3 from "../../assets/home/Brand.mp4";
import video4 from "../../assets/home/video9.mp4";
import "../../styles/home/brand.css";
import { useNavigate } from "react-router-dom";

export default function Brand() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    // Simple way to detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Function specifically for animating the center card
    function animateCardContent() {
      if (!cardRef.current) return;
      
      const cardElements = cardRef.current.querySelectorAll(".animate-element");
      
      cardElements.forEach((el, index) => {
        // Reset to initial position
        el.style.transform = 'translateX(-100%)';
        el.style.webkitTransform = 'translateX(-100%)';
        el.style.opacity = '0';
        
        // Force reflow
        void el.offsetWidth;
        
        // Delay proportional to index - longer delay for card elements
        setTimeout(() => {
          // Set the transition properties
          el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
          el.style.webkitTransition = '-webkit-transform 0.8s ease-out, opacity 0.8s ease-out';
          
          // Trigger the animation
          el.style.transform = 'translateX(0)';
          el.style.webkitTransform = 'translateX(0)';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }, index * 150 + 100); // Extra delay for card elements
      });
    }
    
    // Function for standard elements
    function animateElement(el, index) {
      // Reset to initial position
      el.style.transform = 'translateX(-100%)';
      el.style.webkitTransform = 'translateX(-100%)';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      
      // Force reflow
      void el.offsetWidth;
      
      // Delay proportional to index
      setTimeout(() => {
        // Set the transition properties
        el.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        el.style.webkitTransition = '-webkit-transform 0.8s ease-out, opacity 0.8s ease-out';
        
        // Trigger the animation
        el.style.transform = 'translateX(0)';
        el.style.webkitTransform = 'translateX(0)';
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }, isMobile ? (index * 100 + 50) : (index * 150));
    }
    
    // Set up two separate observers
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get only video frame elements, not the card
            const elements = Array.from(entry.target.querySelectorAll(".video-frame .animate-element"));
            
            // Animate each element with delay
            elements.forEach(animateElement);
            
            // Also trigger card animation when section comes into view
            animateCardContent();
            
            // Only trigger once
            sectionObserver.disconnect();
          }
        });
      },
      { threshold: isMobile ? 0.05 : 0.1 }
    );
    
    // Add a separate observer just for the card
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate card content when it becomes visible
            animateCardContent();
            cardObserver.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "20px" }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    if (cardRef.current) {
      cardObserver.observe(cardRef.current);
    }
    
    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const services = [
    { title: "AI MUSIC PRODUCTION", video: video2, path: "/" },
    { title: "AI SONG RECORDING", video: video1, path: "/" },
    { title: "AI BRAND & MERCHANDISE", video: video3, path: "/graphic-design-mockup" },
    { title: "AI VIDEO PRODUCTION", video: video4, path: "/" },
  ];

  const navigate = useNavigate();

  return (
    <div ref={sectionRef} className="brand-section">
      <div className="brand-grid">
        {/* First two videos */}
        {services.slice(0, 2).map((service, index) => (
          <div key={index} className="video-frame">
            <video autoPlay playsInline loop muted>
              <source src={service.video} type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h3 className="animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>
                {service.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Center Card - Add ref here */}
        <div ref={cardRef} className="brand-card">
          <div className="card-content">
            <div className="line-decorator animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>—</div>
            <h2 className="animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>Your Music.</h2>
            <h2 className="animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>Your Brand.</h2>
            <h2 className="animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>Your Way</h2>
            <div className="line-decorator animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>—</div>
            <button className="see-all-btn animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>SEE ALL</button>
          </div>
        </div>

        {/* Last two videos */}
        {services.slice(2).map((service, index) => (
          <div key={index + 2} className="video-frame" onClick={() => navigate(service.path)}>
            <video autoPlay playsInline loop muted>
              <source src={service.video} type="video/mp4" />
            </video>
            <div className="video-overlay">
              <h3 className="animate-element" style={{transform: 'translateX(-100%)', opacity: 0}}>
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}