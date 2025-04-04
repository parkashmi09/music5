import React, { useState, useEffect } from "react";
import bronzeFrame from "../../assets/subscription/plans/BronzeFrame.png";
import goldFrame from "../../assets/subscription/plans/GoldFrame.png";
import platinumFrame from "../../assets/subscription/plans/PlatinumFrame.png";
import diamondFrame from "../../assets/subscription/plans/DiamondFrame.png";
import group from "../../assets/subscription/Group.png";
import BrozeText from "../../assets/subscription/plans/info/bronzetxt.png";
import GoldText from "../../assets/subscription/plans/info/goldtxt.png";
import PlatinumText from "../../assets/subscription/plans/info/platinumtxt.png";
import DiamondText from "../../assets/subscription/plans/info/diamondtxt.png";
import { takeSubscriptionFromWebsite } from "../../services/stripe";

export default function Plan({
  planData,
  monthlyData,
  yearlyData,
  onPlanTypeChange,
}) {
  const [isYearly, setIsYearly] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, setUserId] = useState(null);

  console.log("monthy data", monthlyData);
  console.log("yearly data", yearlyData);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      console.log("Raw user data:", storedUserData);
      
      if (storedUserData) {
        // Direct regex approach to extract the ID - most reliable for this format
        const idMatch = storedUserData.match(/"_id":"([^"]+)"/);
        if (idMatch && idMatch[1]) {
          setUserId(idMatch[1]);
          console.log("Extracted user ID:", idMatch[1]);
        }
      }
    } catch (error) {
      console.error("Error processing user data:", error);
    }
  }, []);

  const togglePlanType = () => {
    const newValue = !isYearly;
    setIsYearly(newValue);
    onPlanTypeChange?.(newValue ? "yearly" : "monthly");
  };

  const mapPlansData = (data) =>
    data.map((plan) => ({
      ...plan, // Include all original plan data including _id
      name: plan.plan.toLowerCase(),
      price: plan.price,
      discount: plan.discount,
      details: plan.details,
      type: plan.type,
      priceId: plan.priceId, // Optional for subscription mode
      text: {
        bronze: BrozeText,
        gold: GoldText,
        platinum: PlatinumText,
        diamond: DiamondText,
      },
      image: {
        bronze: bronzeFrame,
        gold: goldFrame,
        platinum: platinumFrame,
        diamond: diamondFrame,
      }[plan.plan.toLowerCase()],
    }));

  const monthlyPlans = mapPlansData(monthlyData);
  const yearlyPlans = mapPlansData(yearlyData);
  const plans = isYearly ? yearlyPlans : monthlyPlans;

  const parseDetails = (details) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(details, "text/html");
    const listItems = Array.from(doc.querySelectorAll("li"));

    const title = listItems[0]?.textContent || "Plan Features";
    const description = listItems
      .slice(1)
      .map((item) => item.textContent)
      .join(" • ");

    return { title, description };
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowCheckoutForm(true);
    setProcessing(false);
    setError(null);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!selectedPlan || !selectedPlan._id) {
      setError("Invalid plan selection. Please select a valid plan.");
      setProcessing(false);
      return;
    }

    try {
      const planDetails = {
        planName: selectedPlan.name,
        planType: isYearly ? "yearly" : "monthly",
        price: selectedPlan.price,
        priceId: selectedPlan.priceId || null,
      };

      // Use the plan's _id instead of userId
      const response = await takeSubscriptionFromWebsite(selectedPlan._id, planDetails);
      
      // Handle successful subscription
      console.log("Subscription successful:", response);
      
      // Check if response contains a checkout session with URL
      if (response && response.status === "success" && response.session && response.session.url) {
        // Redirect to Stripe checkout URL
        window.location.href = response.session.url;
      } else {
        throw new Error("Invalid response from payment service. Please try again.");
      }
      
    } catch (err) {
      setError(err.message || "An error occurred during payment processing.");
      console.error("Subscription error:", err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="px-4 md:px-0 w-full">
      {/* Error message display */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 max-w-[800px] mx-auto"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Monthly/Yearly Toggle */}
      <div className="flex justify-center mt-5 lg:px-2.5">
        <div className="flex bg-[#333] rounded-[50px] p-1.5 gap-1.5 w-full max-w-[400px]">
          <button
            className={`text-black border-none py-3 lg:px-[60px] cursor-pointer transition-all duration-300 font-[Orbitron] text-base font-bold relative z-[1] flex-1 ${
              !isYearly ? "bg-white text-black" : "bg-[#333] text-white"
            }`}
            style={{ borderRadius: "9999px" }}
            onClick={togglePlanType}
          >
            Monthly
          </button>
          <button
            className={`text-black border-none py-3 lg:px-[60px] cursor-pointer transition-all duration-300 font-[Orbitron] text-base font-bold relative z-[1] flex-1 ${
              isYearly ? "bg-white text-black" : "bg-[#333] text-white"
            }`}
            style={{ borderRadius: "9999px" }}
            onClick={togglePlanType}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Checkout Form Modal */}
      {showCheckoutForm && selectedPlan && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center p-4"
        >
          <div className="bg-[#1A1A1A] rounded-xl p-8 max-w-md w-full border border-[#333] shadow-2xl h-auto max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center flex-shrink-0">
              <h2 className="text-white text-2xl font-[Orbitron] font-bold">
                Complete Purchase
              </h2>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mt-6 pr-2" style={{ scrollbarWidth: 'none' }}>
              <div className="bg-[#222] rounded-lg p-4 mb-6 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Plan</span>
                  <span className="text-white font-semibold capitalize">
                    {selectedPlan.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Price</span>
                  <span className="text-[#FFD700] font-bold">
                    ${selectedPlan.price}/{isYearly ? "YR" : "MO"}
                  </span>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <p className="text-white text-sm">
                  Click the button below to subscribe to the {selectedPlan.name} plan.
                  Your payment will be processed securely.
                </p>

                {error && (
                  <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    disabled={processing}
                    className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors font-[Orbitron] text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className={`flex-1 px-6 py-3 bg-[#FFD700] text-black rounded-lg font-bold hover:bg-[#E5C300] transition-colors font-[Orbitron] text-sm
                      ${processing ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {processing ? "Processing..." : `Pay $${selectedPlan.price}`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Plans Container */}
      <div className="flex flex-wrap md:flex-nowrap justify-center pt-10 bg-[#1A1A1A]">
        {plans.map((plan, index) => {
          const { title, description } = parseDetails(plan.details);
          return (
            <div
              key={plan._id || index}
              className={`w-full max-w-[300px] flex flex-col ${
                plan.name === "bronze" ||
                plan.name === "platinum" ||
                plan.name === "diamond"
                  ? !isYearly
                    ? "mt-[0px]"
                    : "mt-[0px]"
                  : ""
              }`}
            >
              <div className="relative bg-[#1A1A1A]">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={plan.image}
                    className="w-full h-auto"
                    alt={`${plan.name} Plan`}
                  />
                  <div className="absolute inset-0 top-[-20%] flex flex-col items-center justify-center">
                    <div className="text-black text-3xl font-bold">
                      ${plan.price}/{isYearly ? "YR" : "MO"}
                    </div>
                    <img
                      className="relative top-[30%] h-[30px] w-[78px] object-contain"
                      src={plan.text[plan.name]}
                      alt={`${plan.name} Plan`}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#222] relative flex-grow">
                <img src={group} />
                <div className="absolute top-0 p-4 text-center">
                  <h3 className="text-white font-bold text-sm mb-2">
                    <p className="text-2xl">{title}</p>
                  </h3>
                  <p className="text-gray-300 text-xs mb-4 text-left pr-8">
                    {description}
                  </p>
                </div>
              </div>
              <div className="p-2 flex justify-center items-center">
                <button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={processing}
                  className={`border-none py-2 px-4 font-bold cursor-pointer transition-colors duration-300 hover:bg-[#B77835] mt-2 ${
                    processing ? "opacity-70 cursor-not-allowed" : ""
                  } ${
                    plan.name === "bronze" && isYearly
                      ? "bg-white text-[#CE8946]"
                      : plan.name === "bronze" && !isYearly
                      ? "bg-[#CE8946] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {processing
                    ? "Processing..."
                    : isYearly
                    ? "Buy now"
                    : plan.name === "bronze"
                    ? "Already using"
                    : "Buy now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media screen and (max-width: 767px) {
          .plans-container {
            flex-direction: column !important;
            justify-content: flex-start;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            gap: 15px;
          }

          .plans-container::-webkit-scrollbar {
            display: none;
          }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none !important;
        }

        /* Hide scrollbar for Firefox */
        * {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
