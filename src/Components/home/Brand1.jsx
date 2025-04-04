import React, { useEffect, useRef } from "react";
import bgimage from "../../assets/home/Rectangle 9.png";
import bgimage1 from "../../assets/home/brand.jpeg";
import video from "../../assets/home/video1.mp4";
import ai from "../../assets/home/ai.webp";
import copy from "../../assets/home/copy.png";
import insta from "../../assets/home/insta.png";
import brand from "../../assets/home/brand1.png";

function Brand1() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Simple way to detect mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    
    // Special function just for the left section
    function animateLeftSection() {
      const leftSection = sectionRef.current.querySelector('.relative.w-full.lg\\:w-\\[42\\%\\]');
      if (!leftSection) return;
      
      const elements = leftSection.querySelectorAll('.animate-slide');
      
      elements.forEach((el, index) => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.webkitTransform = 'translateX(-30px)';
        
        // Force reflow
        void el.offsetWidth;
        
        // Animate with delay
        setTimeout(() => {
          el.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
          el.style.webkitTransition = '-webkit-transform 0.6s ease-out, opacity 0.6s ease-out';
          el.style.transform = 'translateX(0)';
          el.style.webkitTransform = 'translateX(0)';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }, index * 150);
      });
    }
    
    // Separate observers for different sections
    const leftObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateLeftSection();
          leftObserver.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    
    // Main animation function for all other elements
    function animateElement(el, index) {
      // Reset to initial position
      el.style.transform = 'translateX(-30px)';
      el.style.webkitTransform = 'translateX(-30px)';
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      
      // Force reflow
      void el.offsetWidth;
      
      // Delay proportional to index
      setTimeout(() => {
        el.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        el.style.webkitTransition = '-webkit-transform 0.6s ease-out, opacity 0.6s ease-out';
        el.style.transform = 'translateX(0)';
        el.style.webkitTransform = 'translateX(0)';
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      }, isMobile ? (index * 80 + 30) : (index * 100));
    }
    
    // Create separate observers for each card
    function setupCardObservers() {
      const cards = sectionRef.current.querySelectorAll('.bg-black\\/90');
      
      cards.forEach((card, i) => {
        const cardObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const elements = card.querySelectorAll('.animate-slide');
              elements.forEach(animateElement);
              cardObserver.disconnect();
            }
          },
          { 
            threshold: 0.1,
            rootMargin: "50px 0px"
          }
        );
        
        cardObserver.observe(card);
      });
    }
    
    if (sectionRef.current) {
      // Find the left section and observe it
      const leftSection = sectionRef.current.querySelector('.relative.w-full.lg\\:w-\\[42\\%\\]');
      if (leftSection) {
        leftObserver.observe(leftSection);
      }
      
      // Setup observers for all cards
      setupCardObservers();
    }
    
    return () => {
      leftObserver.disconnect();
      // Additional cleanup will be handled by each card observer
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Base styles for animation elements */
          .animate-slide {
            opacity: 0;
            transform: translateX(-30px);
            -webkit-transform: translateX(-30px);
            will-change: transform, opacity;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          
          /* Remove the keyframe animation as we're using JS transitions */
          
          /* Force hardware acceleration for all devices */
          .text-yellow-400, .text-gray-400, .mobile-debug {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }
          
          /* Only apply debug styles when needed */
         /* Add this to your style section */
@media (max-width: 768px) {
  /* Force hardware acceleration on all cards */
  .bg-black\/90 {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  /* Make sure nested animated elements don't conflict */
  .animate-slide .animate-slide {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  
  /* Fix visibility on mobile */
  .mobile-debug, .mobile-debug-bg {
    z-index: 10 !important;
    position: relative !important;
  }
}
        `}
      </style>
      <div
        ref={sectionRef}
        className="w-full bg-[#3E5469] lg:px-20 px-4 relative overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute top-0 lg:left-20 lg:right-20 right-0 left-0 h-full z-10">
          <video
            src={video}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="relative lg:flex h-full max-w-full box-border z-20">
          {/* Left Section */}
          <div className="relative w-full lg:w-[42%]">
            <img
              className="w-full lg:h-full h-[50%] object-cover"
              src={bgimage1}
              alt="Left background"
            />
              <div className="absolute lg:top-[30%] lg:left-[45%] top-[44%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white z-30 lg:max-w-[60%] w-[90%] text-center">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight animate-slide text-white">
                Your Music. Your Brand. Your Way
              </h1>
              <p className="text-sm lg:text-base opacity-90 animate-slide text-white px-4">
                StudioSphere 360 leverages cutting-edge AI technology to
                revolutionize the music creation process. Our AI tools are
                revolutionizing the way the next generation of creators bring
                their ideas to life. These advanced technologies enhance
                creativity, streamline workflows, and open new possibilities for
                innovation. With AI-powered solutions, creators can produce
                high-quality content faster and more efficiently than ever
                before.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative w-full lg:w-[60%]">
            <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-12 justify-center py-4">
              {/* First Column */}
              <div className="flex flex-col gap-4 w-full lg:w-[40%] space-y-4 px-4 lg:px-0">
                {/* Marketing Tools Card */}
                <div className="bg-black/90 rounded-2xl overflow-hidden mobile-debug-bg">
                  <div className="p-6 mobile-center-container">
                    <h1 className="text-[#9D4EDD] w-full mobile-debug">
                      <span className="text-yellow-400 text-[18px] lg:text-lg animate-slide mobile-debug"
                      >
                        360 Marketing Tools & AI-Powered Music Distribution
                      </span>
                    </h1>
                    <p className="text-yellow-400 text-[18px] lg:text-lg w-full lg:ml-0 animate-slide mobile-debug">
                      Reach Your Fans
                    </p>
                    <div className="relative w-full mb-6 animate-slide mobile-center-image">
                      <img
                        src={insta}
                        alt="Branding visualization"
                        className="bg-black"
                      />
                    </div>
                    <div className="animate-slide">
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed lg:pb-36 mobile-debug">
                        StudioSphere 360 offers AI-powered music distribution
                        services, ensuring that your music reaches the right
                        audience across various digital platforms. We provide radio
                        play & promotion on Blaze It Up Radio, editorial features in
                        Rhiwewurld Magazine, and attract True Fans through MUSEIQ,
                        further amplifying your reach and positioning your music in
                        front of key industry players.
                      </p>
                      <div className="w-full h-1.5 bg-gray-700 mt-4 animate-slide"></div>
                    </div>
                  </div>
                </div>

                {/* Define Image Card */}
                <div className="bg-black/90 rounded-2xl overflow-hidden mobile-debug-bg">
                  <div className="p-6 mobile-center-container">
                    <h2 className="text-[#9D4EDD] text-xl font-bold mobile-debug">
                      <span className="text-yellow-400 text-base lg:text-lg animate-slide mobile-debug">
                        Define Your Image
                      </span>
                    </h2>
                    <h3 className="text-[#9D4EDD] mobile-debug">
                      <span className="text-yellow-400 text-sm lg:text-lg animate-slide mobile-debug">
                        Identity creation, logo design, and more
                      </span>
                    </h3>
                    <div className="relative w-full mb-6 animate-slide mobile-center-image">
                      <img 
                        src={brand} 
                        alt="Branding visualization" 
                      />
                    </div>
                    <div className="animate-slide">
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed mobile-debug">
                        At StudioSphere 360, we understand the importance of
                        branding in the music industry. Our AI-driven branding
                        solutions help artists establish a unique and compelling
                        brand identity, setting the stage for long-term success.
                      </p>
                      <div className="w-full h-1.5 bg-gray-700 mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Column */}
              <div className="flex flex-col gap-4 w-full lg:w-[40%] lg:mt-40 space-y-4 px-4 lg:px-0">
                {/* Copyright Assistant Card */}
                <div className="bg-black/90 rounded-2xl overflow-hidden mobile-debug-bg">
                  <div className="p-6 mobile-center-container">
                    <h3 className="text-[#9D4EDD] font-bold mb-2 mobile-debug">
                      <span className="text-yellow-400 text-base lg:text-lg w-full animate-slide mobile-debug">
                        Copyright Assistant
                      </span>
                    </h3>
                    <h4 className="text-[#9D4EDD] mb-1 mobile-debug">
                      <span className="text-yellow-400 text-base lg:text-lg animate-slide mobile-debug">
                        "Protect Your Work"
                      </span>
                    </h4>
                    <p className="text-gray-400 text-xs lg:text-sm mb-4 animate-slide mobile-debug">
                      Easy copyright and worldwide registration
                    </p>
                    <div className="my-6 flex justify-center animate-slide mobile-center-image">
                      <img
                        src={copy}
                        alt="Copyright seal"
                        className="h-24 w-24 lg:h-32 lg:w-32"
                      />
                    </div>
                    <div className="border-gray-800">
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed animate-slide mobile-debug">
                        Monetizing music can be challenging for independent
                        artists. StudioSphere 360 equips artists with
                        AI-driven monetization strategies, empowering them
                        to generate revenue and build sustainable music
                        careers.
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 mt-4 animate-slide"></div>
                  </div>
                </div>

                {/* Artist Support Card */}
                <div className="bg-black/90 rounded-2xl overflow-hidden mobile-debug-bg">
                  <div className="p-6 mobile-center-container">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 mobile-debug">
                      <span className="text-base lg:text-lg text-yellow-400 animate-slide mobile-debug">
                        Comprehensive Artist Support
                      </span>
                    </h3>
                    <div className="mt-6 mb-6 animate-slide mobile-center-image">
                      <img 
                        src={ai} 
                        alt="Copyright seal" 
                      />
                    </div>
                    <div className="p-0 pt-0 pb-0 border-gray-800">
                      <p className="text-gray-400 text-xs lg:text-sm leading-relaxed animate-slide mobile-debug">
                        StudioSphere 360 is committed to providing
                        comprehensive support to artists at every stage of
                        their career. Our AI-powered platform offers a range
                        of artist-centric services, catering to the diverse
                        needs of independent musicians.
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 mt-4 animate-slide"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brand1;