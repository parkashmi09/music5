import React from "react";
import TeamTrust from "../Components/Subscription/TeamTrust";
import Faq from "../Components/Subscription/Faq";
import Plan from "../Components/Subscription/Plan";
import Studio from "../Components/Subscription/Studio";
import Content from "../Components/Subscription/Content2";
import { subscriptionService } from "../services/subscriptionService";
import { Elements } from "@stripe/react-stripe-js";
import  stripePromise from "../services/stripe";

export default function Subscriptions() {
  const [monthlySubscriptions, setMonthlySubscriptions] = React.useState([]);
  const [yearlySubscriptions, setYearlySubscriptions] = React.useState([]);
  const [planComparison, setPlanComparison] = React.useState([]);
  const [planType, setPlanType] = React.useState("monthly");
  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { getSubscriptions, getPlatformComparison, getPlanDetails } =
    subscriptionService;

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [monthlyData, yearlyData, planComparison, content] =
          await Promise.all([
            getSubscriptions("monthly"),
            getSubscriptions("yearly"),
            getPlatformComparison(),
            getPlanDetails(),
          ]);

        setMonthlySubscriptions(monthlyData);
        setYearlySubscriptions(yearlyData);
        setContent(content);
        setPlanComparison(planComparison);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handlePlanTypeChange = (type) => {
    setPlanType(type);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FFD700]"></div>
          <p className="mt-4 text-white font-['Orbitron'] text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <Elements stripe={stripePromise}>
    <div>
      <Plan
        planData={
          planType === "monthly" ? monthlySubscriptions : yearlySubscriptions
        }
        monthlyData={monthlySubscriptions}
        yearlyData={yearlySubscriptions}
        onPlanTypeChange={handlePlanTypeChange}
      />
      <Studio data={planComparison} />
      <TeamTrust />
      <Content data={content} />
      <Faq />
    </div>
    </Elements>
  );
}
