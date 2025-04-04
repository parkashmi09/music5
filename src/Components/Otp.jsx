import React, { useState, useEffect } from "react";
import close from "../assets/login/fontisto_close.png";
import rotatingCd from "../assets/home/Exclude.png";
import NewPassword from "./NewPassword";
import { userService } from "../services/userService";

export default function Otp({ onClose, email }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const inputRefs = Array(4)
    .fill(0)
    .map(() => React.createRef());

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input field after entry
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Countdown timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Format timer to 00:00 format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      await userService.forgotPassword(email);
      setTimer(60);
      setOtp(["", "", "", ""]);
      inputRefs[0].current.focus();
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  // Handle Next button click
  const handleNextClick = async () => {
    const isOtpComplete = otp.every(digit => digit !== "");
    
    if (isOtpComplete) {
      try {
        const otpString = otp.join("");
        const response = await userService.verifyOtp(email, otpString);
        
        if (response.status === 200 && response.data?.userId) {
          setUserId(response.data.userId);
          setShowNewPassword(true);
        }
      } catch (err) {
        setError(err.message || "Invalid OTP. Please try again.");
      }
    } else {
      setError("Please enter the complete 4-digit OTP");
    }
  };

  return (
    <>
      {showNewPassword ? (
        <NewPassword onClose={onClose} userId={userId} />
      ) : (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-[9999] overflow-y-auto">
          <div className="bg-white p-6 pt-10 rounded-2xl w-full sm:max-w-[420px] relative shadow-lg mx-1 my-4 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 cursor-pointer z-10"
              onClick={onClose}
            >
              <img src={close} className="h-5 w-5" alt="Close" />
            </button>

            <div className="w-full">
              <h1 className="font-['Orbitron'] font-bold text-2xl text-center">
                <p className="text-2xl font-bold mb-0">Forgot Password?</p>
              </h1>

              <div className="flex justify-center items-end mt-0">
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

              <p className="text-center text-gray-400 text-sm mt-2">
                Enter your 4 digits OTP to reset your SoundSparkHub's password
              </p>
            </div>

            <div className="mb-0">
              <label className="block font-['Orbitron'] font-bold text-xl">
                OTP
              </label>

              <div className="flex justify-start lg:gap-4 gap-2 mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-14 h-14 text-center text-xl bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-gray-300 focus:outline-none"
                  />
                ))}
              </div>

              <div className="flex w-full justify-between items-center mb-2">
                <p className="text-gray-400 text-sm m-0">
                  Trying to auto-fill OTP {formatTime(timer)}
                </p>
                <button
                  className="text-black font-bold m-0 p-0 text-sm"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center mb-2">{error}</p>
              )}

              <button
                type="button"
                className="w-full py-2 bg-gray-400 text-white rounded-full mt-0 font-['Orbitron'] font-bold mb-2"
                style={{ borderRadius: "9999px" }}
                onClick={handleNextClick}
              >
                Next
              </button>

              <p className="text-gray-500 text-xs text-center mt-1">
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
          </div>
        </div>
      )}
    </>
  );
}