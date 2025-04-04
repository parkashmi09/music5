import React, { useState } from "react";
import close from "../assets/login/fontisto_close.png";
import rotatingCd from "../assets/home/Exclude.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userService } from "../services/userService";

export default function NewPassword({ onClose, userId }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password requirements
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await userService.resetPassword(
        userId,
        newPassword,
        confirmPassword
      );

      if (response.message === "Password updated successfully.") {
        // Show success message or redirect
        onClose();
      }
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-[9999] overflow-y-auto">
      <div className="bg-white p-6 pt-10 rounded-2xl w-full sm:max-w-[420px] relative shadow-lg mx-1 my-4 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 cursor-pointer z-10"
          onClick={onClose}
        >
          <img src={close} className="h-5 w-5" alt="Close" />
        </button>

        <div className="w-full mb-6">
          <h1 className="font-['Orbitron'] font-bold text-2xl text-center mb-0">
            <p className="text-2xl font-bold mb-0">Enter New Password</p>
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
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-['Orbitron'] font-bold text-lg mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 bg-gray-100 rounded-md outline-none text-gray-500 pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-['Orbitron'] font-bold text-lg mb-2">
              Re-enter Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full p-2 bg-gray-100 rounded-md outline-none text-gray-500 pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gray-400 text-white rounded-full font-['Orbitron'] font-bold mb-6"
            style={{borderRadius:"9999px"}}
          >
            Confirm
          </button>

          <p className="text-gray-500 text-sm text-center mt-3">
            By continuing, you agree to SoundSparkHub's{" "}
            <a href="#" className="text-black font-bold">
              Terms & conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-black font-bold">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
