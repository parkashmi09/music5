import React, { useEffect } from "react";

export default function SuccessModal({ onClose, title = "" }) {
  // Add this useEffect to disable body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Add timer to auto-close the modal after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 2000);

    // Clear timeout if component unmounts before timer completes
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-[9999] overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative shadow-lg mx-1 my-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-2xl font-bold mb-6 text-center">{title}</p>
          <div className="w-42 h-42 rounded-full bg-green-500 flex items-center justify-center mb-6 animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-green-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 50,
                animation: "draw 0.8s ease forwards",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <style jsx>{`
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }

            @keyframes fadeIn {
              0% {
                opacity: 0;
                transform: scale(0.6);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
