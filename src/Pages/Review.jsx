import React, { useEffect, useState } from 'react'
import User from '../Components/review/User'
import ReviewsSection from '../Components/review/ReviewsSection'
import Advertise from '../Components/blog/Advertise'
import { providedServices } from '../services/providedServices';

function Review() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  console.log("data is", data);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await providedServices.getClientReviews();
        setData(result.data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        <User/>
        <ReviewsSection data={data}/>
        <Advertise/>
    </div>
  )
}

export default Review