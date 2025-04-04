import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import rotatingCd from "../assets/home/Exclude.png";
import close from "../assets/login/fontisto_close.png";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import SuccessModal from "./SuccessModal";
import { userService } from "../services/userService";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/slices/authSlice";

import { auth } from "../firebase/config";
import { signInWithGoogle, signInWithFacebook } from "../firebase/auth";

export default function Login({ onClose, onLoginSuccess }) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  console.log("show sucess is", showSuccess)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
  const [apiError, setApiError] = useState("");
  const [useRedirect, setUseRedirect] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setUseRedirect(isMobile);
    
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validation function
  const validate = (field, value) => {
    let error = "";
    if (field === "email") {
      if (value.trim() === "") {
        error = "Email is required";
      } else if (!validateEmail(value)) {
        error = "Please enter a valid email address";
      }
    } else if (field === "password") {
      if (value.trim() === "") {
        error = "Password is required";
      } else if (!validatePassword(value)) {
        error = "Password must be at least 8 characters long";
      }
    }
    return error;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Check if all fields are valid
    const allFieldsValid = email.trim() && password.trim() && 
      !errors.email && !errors.password;
    setIsValid(allFieldsValid);
  };

  // Handle input focus
  const handleFocus = (field) => {
    setIsFocused(prev => ({
      ...prev,
      [field]: true
    }));
    const value = field === "email" ? email : password;
    const error = validate(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Handle input blur
  const handleBlur = (field) => {
    setIsFocused(prev => ({
      ...prev,
      [field]: false
    }));
    const value = field === "email" ? email : password;
    const error = validate(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSignUpClick = () => {
    setShowRegister(true);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const emailError = validate("email", email);
    const passwordError = validate("password", password);
    setErrors({
      email: emailError,
      password: passwordError
    });
    setApiError(""); // Clear any previous API errors

    if (emailError || passwordError) {
      return;
    }

    setIsLoading(true);
    try {
      const userData = await userService.login(email, password);
      dispatch(
        setUser({
          user: userData.user,
          accessToken: userData.accessToken,
        })
      );
      setShowSuccess(true);
      // if (onLoginSuccess) {
      //   onLoginSuccess();
      // }
    } catch (err) {
      setApiError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        await signInWithGoogle(true);
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      setApiError(error.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(""); // Clear any previous API errors
    
    try {
      if (!useRedirect) {
        const result = await signInWithFacebook();
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
          socialType: "Facebook"
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
        await signInWithFacebook(true);
      }
    } catch (error) {
      console.error("Facebook Sign In Error:", error);
      setApiError(error.message || "Facebook login failed");
    } finally {
      setIsLoading(false);
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
      {showForgotPassword ? (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      ) : showRegister ? (
        <Register onClose={onClose} />
      ) : showSuccess ? (
        <SuccessModal onClose={handleSuccessModalClose}/>
      ) : (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-[9999] overflow-y-auto">
          <div className="bg-white p-3 rounded-lg w-full max-w-md relative shadow-lg mx-1 my-4 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 rounded-full border-none cursor-pointer z-10"
              onClick={onClose}
            >
              <img src={close} className="h-6" alt="Close" />
            </button>

            <div className="container mx-auto">
              <div className="w-full">
                <form className="px-2 py-1" onSubmit={handleLoginClick}>
                  <div className="flex justify-center items-center">
                    <h1 className="font-['Orbitron'] font-bold text-2xl ">
                      <p className="text-2xl font-bold ">Welcome Back to</p>
                    </h1>
                  </div>

                  <div className="flex justify-center items-end">
                    <p className="text-2xl font-bold">STUDIOSPHERE</p>
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={rotatingCd}
                        className="rounded-full"
                        alt="Studio Logo"
                        style={{
                          animation: "rotate 8s linear infinite",
                        }}
                      />
                    </div>
                  </div>

                  {apiError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm text-center">{apiError}</p>
                    </div>
                  )}

                  <div className="mb-2">
                    <label className="block font-['Orbitron'] font-bold mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`w-full p-2 bg-[#EDEDED] rounded outline-none ${errors.email ? 'border-red-500' : ''}`}
                      value={email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-2 relative">
                    <label className="block font-['Orbitron'] font-bold mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className={`w-full p-2 bg-[#EDEDED] rounded outline-none pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        value={password}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password")}
                        required
                      />
                      <span
                        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 text-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-center items-center ">
                    <a
                      className="cursor-pointer"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      <p className="text-gray-400 underline">
                        Forgot Password?
                      </p>
                    </a>
                  </div>

                  <div className="mb-3 ">
                    <button
                      className={`w-full py-2 text-white rounded-full disabled:opacity-50 ${isValid ? 'bg-[#3C4142] hover:bg-[#3C4142]/90' : 'bg-gray-400 cursor-not-allowed'}`}
                      type="submit"
                      style={{ borderRadius: "9999px" }}
                      disabled={isLoading || !isValid}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500 whitespace-nowrap">
                      or continue with
                    </span>
                    <div className="flex-1 h-px bg-gray-300"></div>
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
                      onClick={(e) => handleFacebookLogin(e)}
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

                  <div className="flex justify-center items-center mb-2">
                    <p className="text-gray-500 text-xs lg:text-sm text-center ">
                      By continuing, you agree to SoundSparkHub's{" "}
                      <a href="#" className="text-black font-bold">
                        Terms & conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-black font-bold">
                        Privacy Policy
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-center items-center">
                    <p className="text-gray-400 text-sm text-center">
                      Don't have an account?{" "}
                      <a
                        href="#"
                        className="text-black font-bold"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSignUpClick();
                        }}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
