import "../styles/footer.css";
import rotatingCd from "../assets/home/Exclude.png";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { CiYoutube } from "react-icons/ci";
import { FaDiscord, FaRedditAlien, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    // Navigate to the path and reset scroll position
    navigate(path, { replace: true, state: { from: "footer" } });
  };

  return (
    <footer className="container-fluid py-4 footer_section">
      <div className="container">
        <div className="row ">
          <div className="col-lg-4 ">
            <div className="">
              <p className="text-3xl flex items-center ">
                <div className="ms-0 lg:w-[70px] lg:h-[70px] rounded-full">
                  <img
                    src={rotatingCd}
                    className="w-full h-full rounded-full"
                    alt="Studio Logo"
                    style={{
                      animation: "rotate 8s linear infinite",
                    }}
                  />
                </div>
                STUDIOSPHERE
              </p>
            </div>
            
            {/* Social media icons in a grid layout */}
            <div className="d-flex gap-3 py-3 flex-wrap">
              <div className="icon_bg">
                <CiInstagram size={22} />
              </div>
              <div className="icon_bg">
                <CiFacebook size={22} />
              </div>
              <div className="icon_bg">
                <BsTwitterX size={22} />
              </div>
              <div className="icon_bg">
                <FaTiktok size={22} />
              </div>
              <div className="icon_bg">
                <FaDiscord size={22} />
              </div>
            </div>
            <div className="d-flex gap-3">
              <div className="icon_bg">
                <FaRedditAlien size={22} />
              </div>
              <div className="icon_bg">
                <CiYoutube size={22} />
              </div>
            </div>
          </div>
          <div className="col-lg-2 mt-2">
            <span>Features</span>
            <ul>
              <li onClick={() => handleNavigation("/subscription")}>
                Subscriptions
              </li>
              <li onClick={() => handleNavigation("/create")}>Create Music</li>
              <li onClick={() => handleNavigation("/mastering")}>Mastering</li>
              <li onClick={() => handleNavigation("/song")}>Song Writing</li>
              <li onClick={() => handleNavigation("/record")}>Record Music</li>
            </ul>
          </div>
          <div className="col-lg-2 mt-2">
            <span>Services</span>
            <ul>
              <li onClick={() => handleNavigation("/promote")}>Promote</li>
              <li onClick={() => handleNavigation("/music")}>Distribution</li>
              <li onClick={() => handleNavigation("/opportunity")}>
                Opportunities
              </li>
              <li onClick={() => handleNavigation("/review")}>Review</li>
              <li onClick={() => handleNavigation("/fan-reach")}>Fan Reach</li>
            </ul>
          </div>
          <div className="col-lg-2 mt-2">
            <span>Company</span>
            <ul>
              <li onClick={() => handleNavigation("/about")}>About Us</li>
              <li onClick={() => handleNavigation("/career")}>Careers</li>
              <li onClick={() => handleNavigation("/privacy")}>
                Privacy & Policy
              </li>
              <li onClick={() => handleNavigation("/contact")}>Contact Us</li>
              <li onClick={() => handleNavigation("/faq")}>FAQ</li>
            </ul>
          </div>
          <div className="col-lg-2 mt-2">
            <span>Community</span>
            <ul>
              <li onClick={() => handleNavigation("/blog")}>Blog</li>
              <li onClick={() => handleNavigation("/help")}>Help</li>
              <li onClick={() => handleNavigation("/right")}>Music Rights</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-12 d-flex justify-content-center align-items-center">
          <p className="right_reserved">
            SoundSparkHub All Right Reserved, 2024
          </p>
        </div>
      </div>
    </footer>
  );
}