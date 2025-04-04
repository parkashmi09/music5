import React, { useEffect, useState } from 'react'
import Eyes from '../Components/promote/Eyes'
import CampaignSection from '../Components/promote/CampaignSection'
import Advertise from '../Components/blog/Advertise'
import TeamTrust1 from '../Components/promote/TeamTrust1'
import { providedServices } from '../services/providedServices'

function Promote() {

  const [promoteData, setPromoteData] = useState({
    top: null,
    topBottom: null,
  });

  const [loading, setLoading] = useState(true);
  const fetchPromote = async () => {
    try {
      setLoading(true);
      const response = await providedServices.getPromote();
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});
      setPromoteData(organizedData);
    } catch (error) {
      console.error('Error fetching promote data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPromote();
  }, []);

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
        <Eyes data={promoteData?.top}/>
        <TeamTrust1/>
        <CampaignSection data={promoteData?.topBottom}/>
        <Advertise/>
    </div>
  )
}

export default Promote