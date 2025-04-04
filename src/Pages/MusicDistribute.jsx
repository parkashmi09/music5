import React, { useEffect, useState } from 'react'
import Create from '../Components/music/Create'
import TeamTrust from '../Components/Subscription/TeamTrust'
import Distribution from '../Components/music/Distribution'
import Comes from '../Components/music/Comes'
import Frequently from '../Components/video/Frequently'
import TestimonialCarousel from '../Components/create/TestimonialCarousel'
import Advertise from '../Components/blog/Advertise'
import { providedServices } from '../services/providedServices'

function MusicDistribute() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    top: null,
    topBottom: null,
    middleBottom: null,
    bottomTop: null,
    bottom: null
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        setLoading(true);
        const result = await providedServices.getDistribution();
        const organizedData = result.data.reduce((acc, item) => {
          acc[item.position] = item;
          return acc;
        }, {});
        setData(organizedData);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDistribution();
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
        <Create data={data?.top}/>
        <TeamTrust/>
        <Distribution data={data?.topBottom}/>
        <Comes data={data?.middle}/>
        <Frequently/>
        <TestimonialCarousel data={data?.bottom}/>
        <Advertise/>
    </div>
  )
}

export default MusicDistribute