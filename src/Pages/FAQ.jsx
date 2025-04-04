import React, { useEffect, useState } from 'react'
import FAQSection from '../Components/faq/FAQSection'
import Advertise from '../Components/blog/Advertise'
import { companyService } from '../services/companyService';


function FAQ() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

const fetchFAQ = async () => {
  try {
    const result = await companyService.getFAQ(); 
    // Filter data to only include items with type "Main"
    const mainFAQs = result.data.filter(item => item.type === "Main");
    setData(mainFAQs);
    setLoading(false);
  } catch (error) {
    console.error(error.message);
  }
};

useEffect(() => {
  fetchFAQ();
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
        <FAQSection data={data}/>
        <Advertise/>
    </div>
  )
}

export default FAQ