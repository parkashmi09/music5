import React from "react";
import Vision from "../Components/video/Vision";
import Bringvideo from "../Components/video/Bringvideo";
import Substitle from "../Components/video/Substitle";
import TeamTrust from "../Components/Subscription/TeamTrust";
import Transform from "../Components/video/Transform";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import Advertise from "../Components/blog/Advertise";
import Frequently from "../Components/video/Frequently";
import { useEffect, useState } from "react";
import { createMusicService } from "../services/featureServices";

function Video() {
  const { getRecordVideo } = createMusicService;
  const [recordVideoData, setRecordVideoData] = useState({
    top: null,
    topBottom: null,
    bottom: null,
    bottomTop: null,
    middleBottom: null,
  });

  console.log("revordeerd videp", recordVideoData)
  const [loading, setLoading] = useState(true);
  const fetchRecordVideo = async () => {
    try {
      const response = await getRecordVideo();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setRecordVideoData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching RecordVideo data:", error);
    }
  };

  useEffect(() => {
    fetchRecordVideo();
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
      <Vision data={recordVideoData?.top} />
      <Bringvideo data={recordVideoData?.topBottom} />
      <Substitle data={recordVideoData?.bottom} />
      <TeamTrust />
      <Transform data={recordVideoData?.bottomTop} />
      <TestimonialCarousel data={recordVideoData?.bottom} />
      <Frequently />
      <Advertise />
    </div>
  );
}

export default Video;
