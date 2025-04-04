// Career.jsx
import React, { useEffect, useState } from "react";
import Passion from "../Components/Carrer/Passion";
import Consistency from "../Components/fan/Consistency";
import TestimonialCarousel from "../Components/create/TestimonialCarousel";
import Advertise from "../Components/blog/Advertise";
import TeamTrust1 from "../Components/promote/TeamTrust1";
import { companyService } from "../services/companyService";
import CommonTestimonialCarousel from "../Components/common/CommonTestimonialCarousel";

function Career() {
  const [careerData, setCareerData] = useState({
    top: null,
    topBottom: null,
  });
  const [loading, setLoading] = useState(true);

  const fetchCareerData = async () => {
    try {
      setLoading(true);
      const result = await companyService.getCareerData();
      const organizedData = result.data.reduce((acc, item) => {
        acc[item.position] = item;
        return acc;
      }, {});
      setCareerData(organizedData);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerData();
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
      <Passion data={careerData?.top} />
      <TeamTrust1 />
      <Consistency data={careerData?.topBottom} />
      <CommonTestimonialCarousel />
      <Advertise />
    </div>
  );
}

export default Career;
