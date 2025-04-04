import React, { useEffect, useState } from 'react'
import Fans from '../Components/fan/Fans'
import Career from '../Components/fan/Career'
import Membership from '../Components/fan/Membership'
import TestimonialCarousel from '../Components/create/TestimonialCarousel'
import Advertise from '../Components/blog/Advertise'
import TeamTrust1 from '../Components/promote/TeamTrust1'
import { providedServices } from '../services/providedServices'

function Fan() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    top: null,
    topBottom: null,
    middleBottom: null,
    bottomTop: null,
    bottom: null,
    middle: null
  });
  const [error, setError] = useState(null);

  console.log("data is%%%", data);
  useEffect(() => {
    const fetchFanReach = async () => {
      try {
        setLoading(true);
        const result = await providedServices.getFanReach();
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
    fetchFanReach();
  }, []);

  console.log("data is", data)

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
        <Fans data={data?.top}/>
        <TeamTrust1/>
        <Career data={data?.topBottom}/>
        <Membership data={data?.middle}/>
        <TestimonialCarousel/>
        <Advertise/>
    </div>
  )
}

export default Fan