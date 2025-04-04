import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import close from "../assets/login/fontisto_close.png";
import Login from "./Login";
import SuccessModal from "./SuccessModal";
import { userService } from "../services/userService";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";
import { auth } from "../firebase/config";
import { signInWithGoogle } from "../firebase/auth";

export default function Register({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [apiError, setApiError] = useState("");
  // Determine if we should use redirect-based auth on mobile
  const [useRedirect, setUseRedirect] = useState(false);

  const dispatch = useAppDispatch();

  // Disable body scrolling when modal is open
  useEffect(() => {
    // Check if the device is a mobile device to decide whether to use redirect
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setUseRedirect(isMobile);
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validation function
  const validate = (field, value) => {
    let error = "";
    switch (field) {
      case "firstName":
        if (value.trim() === "") {
          error = "First name is required";
        }
        break;
      case "lastName":
        if (value.trim() === "") {
          error = "Last name is required";
        }
        break;
      case "email":
        if (value.trim() === "") {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "mobileNumber":
        if (value.trim() === "") {
          error = "Phone number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid 10-digit phone number";
        }
        break;
      case "password":
        if (value.trim() === "") {
          error = "Password is required";
        } else if (!validatePassword(value)) {
          error = "Password must be at least 8 characters long";
        }
        break;
    }
    return error;
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Check if all fields are valid
    const allFieldsValid = Object.values(formData).every(field => field.trim() !== "") &&
      Object.values(errors).every(error => error === "");
    setIsValid(allFieldsValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validate(key, formData[key]);
    });
    setErrors(newErrors);
    setApiError(""); // Clear any previous API errors

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        password: formData.password,
      };

      const response = await userService.register(userData);
      console.log("Registration successful:", response);
      setShowLogin(true);
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(""); // Clear any previous API errors
    
    try {
      if (!useRedirect) {
        const result = await signInWithGoogle();
        const user = result.user;
        
        // Prepare data for social login API
        const socialLoginData = {
          fullName: user?.displayName || "",
          firstName: user?.displayName?.split(' ')[0] || user?.displayName || "",
          lastName: user?.displayName?.split(' ').slice(1).join(' ') || "",
          email: user?.email || "",
          mobileNumber: user?.phoneNumber || "",
          deviceToken: "", // Add device token if available
          socialId: user?.uid || "",
          socialType: "Google"
        };

        // Call social login through userService
        const userData = await userService.socialLogin(socialLoginData);

        // Update Redux state
        dispatch(
          setUser({
            user: userData.user,
            accessToken: userData.accessToken,
          })
        );

        setShowSuccess(true);
      } else {
        // Using redirect auth
        await signInWithGoogle(true);
        // No need to update state here as the redirect will navigate away
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setApiError(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccess(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {showLogin ? (
        <Login onClose={onClose} />
      ) : showSuccess ? (
        <SuccessModal onClose={handleSuccessModalClose}  />
      ) : (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-[9999] overflow-y-auto">
          <div className="bg-white p-6 pt-10 rounded-2xl w-full  sm:max-w-[33%] relative shadow-lg mx-1 my-4 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <button
              className="absolute top-3 right-3 cursor-pointer z-10 bg-white rounded-full p-1"
              onClick={onClose}
            >
              <img src={close} className="h-5 w-5" alt="Close" />
            </button>

            <div className="w-full lg:mb-6">
              <h1 className="font-['Orbitron'] font-bold text-2xl text-center">
                <p className="lg:text-3xl text-xl">Create an Account</p>
              </h1>
            </div>

            {apiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm text-center">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-['Orbitron'] font-bold lg:text-sm mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={`w-full p-2 bg-[#EDEDED] rounded outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block font-['Orbitron'] font-bold lg:text-sm mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={`w-full p-2 bg-[#EDEDED] rounded outline-none ${errors.lastName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label className="block font-['Orbitron'] font-bold lg:text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={`w-full p-2 bg-[#EDEDED] rounded outline-none ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-2">
                <label className="block font-['Orbitron'] font-bold lg:text-sm mb-2">
                  Phone Number
                </label>
                <div className="flex">
                  <div className="bg-[#EDEDED] p-2 rounded-l-md border-r border-gray-300 text-gray-500">
                    +91
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`w-full p-2 bg-[#EDEDED] rounded-r-md outline-none ${errors.mobileNumber ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="mb-3">
                <label className="block font-['Orbitron'] font-bold lg:text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`w-full p-2 bg-[#EDEDED] rounded-md outline-none pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !isValid}
                className={`w-full py-2 text-white rounded-full font-['Orbitron'] font-bold disabled:opacity-50 ${
                  isValid ? 'bg-[#3C4142] hover:bg-[#3C4142]/90' : 'bg-gray-400 cursor-not-allowed'
                }`}
                style={{ borderRadius: "9999px" }}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-gray-300"></div>
                <p className="text-gray-400 text-sm whitespace-nowrap">
                  or continue with
                </p>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>

              <div className="flex justify-between gap-3 mb-2 lg:mb-3">
                <button
                  type="button"
                  onClick={(e) => handleGoogleLogin(e)}
                  className="flex-1 py-2.5 border border-gray-200 bg-[#3C4142]/13 rounded-full flex justify-center items-center"
                  style={{ borderRadius: "9999px" }}
                >
                  <FcGoogle size={24} />
                </button>
                {/* <button
                  type="button"
                  className="flex-1 py-2.5 border border-gray-200 rounded-full bg-[#3C4142]/13 flex justify-center items-center"
                  style={{ borderRadius: "9999px" }}
                >
                  <FaFacebook size={24} color="#1877F2" />
                </button> */}
                {/* <button
                  type="button"
                  className="flex-1 py-2.5 border border-gray-200 rounded-full bg-[#3C4142]/13 flex justify-center items-center"
                  style={{ borderRadius: "9999px" }}
                >
                  <FaApple size={24} />
                </button> */}
              </div>

              <p className="text-gray-500 text-xs lg:text-sm text-center">
                By continuing, you agree to SoundSparkHub's{" "}
                <a href="#" className="text-black font-bold">
                  Terms & conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-black font-bold">
                  Privacy Policy
                </a>
              </p>

              <p className="text-gray-400 text-sm text-center mt-4">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-black font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLoginClick();
                  }}
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}