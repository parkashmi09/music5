import React, { useEffect, useState } from "react";
import Studio from "../Components/about/Studio";
import Expertise from "../Components/about/Expertise";
import Advertise from "../Components/blog/Advertise";
import Content from "../Components/about/Content";
import { companyService } from "../services/companyService";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const result = await companyService.getAboutUs();
      setAboutData(result.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
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
      <Studio />
      <Content data={aboutData} />
      <Advertise />
    </div>
  );
}

export default About;
