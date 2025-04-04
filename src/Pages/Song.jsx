import React, { useEffect, useState } from "react";
import Emotion from "../Components/song/Emotion";
import TeamTrust from "../Components/Subscription/TeamTrust";
import Timeless from "../Components/song/Timeless";
import Written from "../Components/song/Written";
import Feelings from "../Components/song/Feelings";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import Frequently from "../Components/video/Frequently";
import Advertise from "../Components/blog/Advertise";
import { createMusicService } from "../services/featureServices";

function Song() {
  const { getSongWriting } = createMusicService;
  const [songWritingData, setSongWritingData] = useState({
    top: null,
    topBottom: null,
    bottom: null,
    middle: null,
    middleBottom:null
  });
  const [loading, setLoading] = useState(true);
  const fetchSongWriting = async () => {
    try {
      const response = await getSongWriting();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setSongWritingData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching SongWriting data:", error);
    }
  };

  useEffect(() => {
    fetchSongWriting();
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
      <Emotion data={songWritingData?.top} />
      <TeamTrust/>
      <Timeless data={songWritingData?.topBottom}/>
      <Written data={songWritingData?.middle}/>
      <Feelings data={songWritingData?.middleBottom}/>
      <TestimonialCarousel data={songWritingData?.bottom}/>
      <Frequently/>
      <Advertise/>
    </div>
  );
}

export default Song;
