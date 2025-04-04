import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] p-8 rounded-lg max-w-md w-full text-center">
        <div className="text-[#FFD700] text-6xl mb-6">✓</div>
        
        <h1 className="text-white font-['Orbitron'] text-3xl mb-4">
          Payment Successful!
        </h1>
        
        <div className="bg-[#222] p-4 rounded-md mb-6">
          <p className="text-gray-300 mb-4">
            Your subscription has been successfully activated. You now have access to all the premium features.
          </p>
        
        </div>
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/")}
            className="bg-[#CE8946] text-white py-3 px-6 rounded-md hover:bg-[#B77835] transition-colors duration-300 font-bold"
          >
            Start Creating Now
          </button>
          
          <button
            onClick={() => navigate("/subscription")}
            className="bg-transparent border border-[#CE8946] text-[#CE8946] py-2 px-6 rounded-md hover:bg-[#CE8946] hover:bg-opacity-10 transition-colors duration-300"
          >
            View My Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;