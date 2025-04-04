import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] p-8 rounded-lg max-w-md w-full text-center relative overflow-hidden">
        {/* Error animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900 to-transparent opacity-10"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="text-red-500 text-6xl">✗</div>
          </div>
          
          <h1 className="text-white font-['Orbitron'] text-3xl mb-4">
            <TypeAnimation
              sequence={["Payment Failed", 1000]}
              wrapper="span"
              speed={50}
              repeat={1}
              cursor={false}
            />
          </h1>
          
          <div className="bg-[#222] p-4 rounded-md mb-6">
            <p className="text-gray-300 mb-4">
              The payment could not be processed. This could be due to insufficient funds or a temporary issue with the payment provider.
            </p>
           
          </div>
          
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => navigate("/subscription")}
              className="bg-[#CE8946] text-white py-3 px-6 rounded-md hover:bg-[#B77835] transition-colors duration-300 font-bold"
            >
              Try Again
            </button>
            
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-transparent border border-gray-600 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                Go Home
              </button>
              
              <button
                onClick={() => window.open("mailto:support@mrmusic.com", "_blank")}
                className="flex-1 bg-transparent border border-[#CE8946] text-[#CE8946] py-2 px-4 rounded-md hover:bg-[#CE8946] hover:bg-opacity-10 transition-colors duration-300"
              >
                Contact Support
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-gray-400 text-sm">
            <p>Need help? Check our <span className="text-[#CE8946] cursor-pointer" onClick={() => navigate("/faq")}>FAQ</span> or <span className="text-[#CE8946] cursor-pointer" onClick={() => navigate("/contact")}>contact us</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;