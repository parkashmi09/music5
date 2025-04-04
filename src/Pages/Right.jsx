import React from "react";
import Music_Right from "../Components/rights/Music_Right";
import Insight from "../Components/rights/Insight";
import Advertise from "../Components/blog/Advertise";
import TeamTrust1 from "../Components/promote/TeamTrust1";
import { communityServices } from "../services/communityServices";


function Right() {
  const { getMusicRight } = communityServices;
  const [loading, setLoading] = React.useState(true);
  const [musicRightData, setMusicRightData] = React.useState([]);

  React.useEffect(() => {
    const fetchMusicRightData = async () => {
      try {
        const data = await getMusicRight();
        setMusicRightData(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching music right data:", error);
        setLoading(false);
      }
    };
    fetchMusicRightData();
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
      <Music_Right data={musicRightData} />
      <TeamTrust1 />
      <Insight />
      <Advertise />
    </div>
  );
}

export default Right;
