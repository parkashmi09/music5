import React, { useEffect, useState } from "react";
import Next from "../Components/opportunity/Next";
import Group from "../Components/opportunity/Group";
import OpportunitiesSection from "../Components/opportunity/OpportunitiesSection";
import Advertise from "../Components/blog/Advertise";
import TeamTrust1 from "../Components/promote/TeamTrust1";
import { providedServices } from "../services/providedServices";

function Opportunity() {
  const { getOpportunities } = providedServices;
  const [opportunityData, setOpportunityData] = useState({
    top: null,
    topBottom: null,
    middle: null,
  });
  console.log(opportunityData,"opportunityData");

  const [loading, setLoading] = useState(true);

  const fetchOpportunity = async () => {
    try {
      const response = await getOpportunities();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setOpportunityData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Opportunity data:", error);
    }
  };

  useEffect(() => {
    fetchOpportunity();
  }, []);

  console.log(opportunityData,"opportunityData");
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
    <div>
      <Next data={opportunityData?.top}/>
      <TeamTrust1 />
      <Group data={opportunityData?.topBottom}/>
      <OpportunitiesSection data={opportunityData?.middle}/>
      <Advertise/>
    </div>
  );
}

export default Opportunity;
