import React, { useEffect, useState } from "react";
import Advertise from "../Components/blog/Advertise";
import New from '../Components/vision/New'
import { communityServices } from "../services/communityServices";



function Vision() {
  const [vision, setVision] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getVision } = communityServices;
  console.log(vision, "vsionary data");

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const response = await getVision();
        setVision(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vision data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchVision();
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
      <New data={vision} />
      <Advertise />
    </div>
  );
}

export default Vision;
