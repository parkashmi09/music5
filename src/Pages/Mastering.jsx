import React, { useState } from "react";
import Online from "../Components/mastering/Online";
import SignatureSound from "../Components/mastering/SignatureSound";
import TeamTrust from "../Components/Subscription/TeamTrust";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import Frequently from "../Components/video/Frequently";
import Advertise from "../Components/blog/Advertise";
import Sound from "../Components/mastering/Sound";
import { createMusicService } from "../services/featureServices";
import { useEffect } from "react";
import CommonTestimonialCarousel from "../Components/common/CommonTestimonialCarousel";

function Mastering() {
  const { getMastering } = createMusicService;
  const [masteringData, setMasteringData] = useState({
    top: null,
    topBottom: null,
    bottom: null,
  });
  const [loading, setLoading] = useState(true);
  const fetchMastering = async () => {
    try {
      const response = await getMastering();
      // Transform the array into an object with position as keys
      const organizedData = response.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});

      setMasteringData(organizedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Mastering data:", error);
    }
  };

  useEffect(() => {
    fetchMastering();
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
      <Online data={masteringData?.top} />
      <SignatureSound data={masteringData?.topBottom} />
      <TeamTrust />
      <Sound  />
      <TestimonialCarousel data={masteringData?.bottom}/>
      <Frequently />
      <Advertise />
    </div>
  );
}

export default Mastering;
