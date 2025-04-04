// src/components/Navbar.js
import { useEffect, useState } from "react";
import logo1 from "../assets/Navbar/logo1.png";
import logo2 from "../assets/Navbar/logo2.png";
import userSvg from "../assets/Navbar/SVG.png";
import video from "../assets/home/header_video.mp4";
import { Bell, X } from 'lucide-react';
import Login from "./Login";
import Register from "./Register";
import ServicesDropdown from "./ServicesDropdown";
import "../styles/navbar.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser, clearUser } from "../redux/slices/authSlice";
import { userService } from "../services/userService";
import { getAllNotifications } from "../services/notificationServices";

// Responsive Notification Popover Component
const NotificationPopover = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const formatNotifications = (apiData) => {
    return apiData.map((notification) => ({
      id: notification.Id,
      title: notification.title,
      description: notification.body,
      createdAt: notification.createdAt,
    }));
  };

  const fetchNotifications = async () => {
    console.log("Fetching notifications...");
    try {
      if (!hasLoadedOnce) {
        setIsInitialLoading(true);
      }
      const response = await getAllNotifications();
      const formattedData = formatNotifications(response.data);
      setNotifications(formattedData);
      setError(null);
      setHasLoadedOnce(true);
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      if (!hasLoadedOnce) {
        setIsInitialLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 20000);
      return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex justify-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 md:bg-transparent"
        onClick={() => setIsOpen(false)}
      />

      {/* Popover Content */}
      <div 
        className="relative w-full max-w-[90%] sm:max-w-[400px] h-full md:h-auto max-h-[80vh] bg-white shadow-xl 
          transform transition-transform duration-300 md:rounded-lg md:mt-16 md:mr-4"
      >
        <div className="flex flex-col h-full md:max-h-[500px]">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {isInitialLoading ? (
              <div className="text-center py-4">Loading notifications...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className="shadow-md rounded-lg border p-3"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {notification.title}
                      </h4>
                      <button 
                        onClick={() => handleDelete(notification.id)} 
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-600">No notifications available</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && !isInitialLoading && (
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={handleDeleteAll} 
                className="w-full py-2 text-sm font-medium text-red-500 border border-red-500 rounded-lg hover:bg-red-50"
              >
                Delete All Notifications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const userData = userService.getUserData();
    if (userData) {
      dispatch(setUser({ user: userData.user, accessToken: userData.accessToken }));
    }
  }, [dispatch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowNotifications(false);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
    setMobileMenuOpen(false);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowRegister(true);
    setShowLogin(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLoginSuccess = () => {
    const userData = userService.getUserData();
    if (userData) {
      dispatch(setUser({ user: userData.user, accessToken: userData.accessToken }));
    }
    setShowLogin(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    userService.logout();
    dispatch(clearUser());
    setMobileMenuOpen(false);
    setShowNotifications(false);
  };

  const toggleNotifications = (e) => {
    e.preventDefault();
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <nav className="bg-black/80 backdrop-blur-sm sticky top-0 z-[9000]">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="container mx-auto py-2 px-2 relative">
          <div className="flex items-center justify-between">
            <a className="flex items-center" href="#">
              <div className="flex items-center lg:gap-6">
                <div>
                  <img src={logo1} alt="Logo 1" className="h-7" />
                </div>
                <div className="md:h-[76px]">
                  <img
                    src={logo2}
                    className="h-[70px] md:h-full transition-all duration-300"
                    alt="Logo 2"
                  />
                </div>
              </div>
            </a>

            <button
              className="lg:hidden p-2 text-white"
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-white block transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white block transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white block transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>

            <div className="hidden lg:block" id="navbarSupportedContent">
              <ul className="nav-menu flex items-center gap-8">
                <li><a className="nav-link" href="/">Home</a></li>
                <li className="relative group"><ServicesDropdown /></li>
                <li><a className="nav-link" href="/blog">Blog</a></li>
                <li><a className="nav-link" href="/subscription">Subscriptions</a></li>
                <li><a className="nav-link" href="/vision">Vision</a></li>
                <li><a className="nav-link" href="/more">More</a></li>

                <li className="flex items-center ml-4">
                  <div className="login-button">
                    {user ? (
                      <div className="flex items-center gap-4">
                        <a className="login-link flex items-center" href="#">
                          <img src={userSvg} className="w-5 h-5 mr-2" alt="User Icon" />
                          {user.firstName}
                        </a>
                        <button
                          onClick={toggleNotifications}
                          className="text-white hover:text-gray-300 relative"
                        >
                          <Bell className="w-5 h-5" />
                        </button>
                        <a
                          className="text-white hover:text-gray-300"
                          href="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </div>
                    ) : (
                      <a className="login-link" href="#" onClick={handleLoginClick}>
                        <img src={userSvg} className="w-5 h-5 mr-2" alt="User Icon" />
                        Log In
                      </a>
                    )}
                  </div>
                </li>

                {!user && (
                  <li>
                    <a className="get-started-button" href="#" onClick={handleRegisterClick}>
                      Get Started
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div
            className={`lg:hidden mobile-menu overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="flex flex-col items-start gap-2">
              <li><a className="nav-link" href="/">Home</a></li>
              <li className="w-full">
                <div className="mobile-services-dropdown">
                  <ServicesDropdown onItemClick={closeMobileMenu} />
                </div>
              </li>
              <li><a className="nav-link" href="/blog">Blog</a></li>
              <li><a className="nav-link" href="/subscription">Subscriptions</a></li>
              <li><a className="nav-link" href="/vision">Vision</a></li>
              <li><a className="nav-link" href="/more">More</a></li>

              <li className="flex w-full gap-0 mt-1">
                <div className="login-button w-full mr-0">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <a className="login-link flex items-center" href="#">
                          <img src={userSvg} className="w-5 h-5 mr-2" alt="User Icon" />
                          {user.firstName}
                        </a>
                        <button
                          onClick={toggleNotifications}
                          className="text-white hover:text-gray-300 relative"
                        >
                          <Bell className="w-5 h-5" />
                        </button>
                      </div>
                      <a className="nav-link" href="#" onClick={handleLogout}>
                        Logout
                      </a>
                    </div>
                  ) : (
                    <>
                      <a className="login-link" href="#" onClick={handleLoginClick}>
                        <img src={userSvg} className="w-5 h-5 mr-2" alt="User Icon" />
                        Log In
                      </a>
                      <a className="get-started-button ml-4" href="#" onClick={handleRegisterClick}>
                        Get Started
                      </a>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      )}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
      {user && (
        <NotificationPopover 
          isOpen={showNotifications} 
          setIsOpen={setShowNotifications} 
        />
      )}
    </>
  );
}