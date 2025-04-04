import React, { useEffect, useState } from "react";
import Policy from "../Components/privacy/Policy";
import Information from "../Components/privacy/Information";
import Advertise from "../Components/blog/Advertise";
import TeamTrust1 from "../Components/promote/TeamTrust1";
import { companyService } from "../services/companyService";

function Privacy() {
  const [privacyData, setPrivacyData] = useState(null); // State to hold API data
  const [loading, setLoading] = useState(true); // Optional: Handle loading state
  const [error, setError] = useState(null); // Optional: Handle errors

  const fetchPrivacyPolicy = async () => {
    try {
      const result = await companyService.getPrivacyPolicy();
      console.log("privacy policy data is", result);
      setPrivacyData(result.data[0]); // Assuming you want the first item in the data array
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Optional: Show error state
  }

  return (
    <div>
      {/* Pass relevant data to Policy component */}
      <Policy 
        title={privacyData?.title} 
        subTitle={privacyData?.subTitle} 
        image={privacyData?.image} 
      />
      <TeamTrust1 />
      {/* Pass description to Information component */}
      <Information description={privacyData?.description} />
      <Advertise />
    </div>
  );
}

export default Privacy;