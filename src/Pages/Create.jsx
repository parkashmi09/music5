import React, { useEffect, useState } from "react";
import Create1 from "../Components/create/Create1";
import Sample from "../Components/create/Sample";
import ArtistCarousel from "../Components/create/ArtistCarousel";
import Craft from "../Components/create/Craft";
import TeamTrust from "../Components/Subscription/TeamTrust";
import Advertise from "../Components/blog/Advertise";
import Ways from "../Components/create/Ways";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import { createMusicService } from "../services/featureServices";

function Create() {
  // Add state to store the organized data
  const [musicData, setMusicData] = useState({
    top: null,
    topBottom: null,
    middleBottom: null,
    bottomTop: null,
    bottom: null
  });

  const fetchMusicData = async () => {
    try {
      const result = await createMusicService.getCreateMusic(); 
      // Transform the array into an object with position as keys
      const organizedData = result.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});
      
      setMusicData(organizedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  return (
    <div>
      <Sample data={musicData?.top} />
      <Create1 data={musicData?.topBottom} />
      <ArtistCarousel />
      <Craft data={musicData?.middleBottom} />
      <TeamTrust />
      <Ways data={musicData?.bottomTop} />
      <TestimonialCarousel data={musicData?.bottom} />
      <Advertise />
    </div>
  );
}

export default Create;