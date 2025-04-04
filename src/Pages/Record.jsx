import React, { useEffect, useState } from "react";
import Capture from "../Components/record/Capture";
import Inspired from "../Components/record/Inspired";
import Music from "../Components/record/Music";
import TeamTrust from "../Components/Subscription/TeamTrust";
import Moment from "../Components/record/Moment";
import Frequently from "../Components/video/Frequently";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import Advertise from "../Components/blog/Advertise";
import { createMusicService } from "../services/featureServices";

function Record() {
  const { getRecordMusic } = createMusicService;
  const [recordData, setRecordData] = useState({
    top: null,
    topBottom: null,
    bottom: null,
    middle: null,
    middleBottom: null,
  });

  const [loading, setLoading] = useState(true);

  const fetchRecordMusic = async () => {
    try {
      const response = await getRecordMusic();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setRecordData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching RecordMusic data:", error);
    }
  };

  useEffect(() => {
    fetchRecordMusic();
  }, []);

  console.log(recordData,"recordData");
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
      <Capture data={recordData?.top}/>
      <Inspired data={recordData?.topBottom}/>
      <Music data={recordData?.middle}/>
      <TeamTrust />
      <Moment data={recordData?.middleBottom}/>
      <TestimonialCarousel data={recordData?.bottom} />
      <Frequently />
      <Advertise />
    </div>
  );
}

export default Record;
