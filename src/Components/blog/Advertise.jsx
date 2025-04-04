import React, { useRef, useEffect, useState } from "react";
import bannerImage from "../../assets/blog/banner1.png";
import google from "../../assets/login/google.png";
import facebook from "../../assets/login/communication.png";
import "../../styles/blog/blogLanding.css";

export default function Advertise() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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

  const contentStyle = {
    opacity: isVisible ? 1 : 0,
    transition: "opacity 0.5s ease-in",
  };

  return (
    <div
      ref={sectionRef}
      className="container-fluid advertise-section my-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div className="container text-center" style={contentStyle}>
        <div className="row justify-content-center">
          <div className="col-lg-8 d-flex justify-content-center align-items-center">
            <h1 className="heading_advertise">
              Join a global movement of over{" "}
              <strong className="tag">100 million</strong> creators and fans.
            </h1>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            <p className="advertise_description">
              Join a global movement where creativity knows no bounds. With over
              100 million creators and fans, you're not just stepping into a
              platform—you're becoming part of a dynamic community that empowers
              you to innovate, connect, and elevate your art to legendary
              status. Embrace the revolution and amplify your creative voice on
              a stage built for limitless possibility.
            </p>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-6 d-flex justify-content-center gap-3">
            <div className="facebook_btn d-flex align-items-center gap-2">
              <div>
                <img src={facebook} className="img-fluid" alt="Facebook" />
              </div>
              <div>Follow us on Facebook</div>
            </div>
            <div className="google_btn d-flex align-items-center gap-2">
              <div>
                <img src={google} className="img-fluid" alt="Google" />
              </div>
              <div>Follow us on Google</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
