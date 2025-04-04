import React from "react";
import DataAnalysisPrograms from "../Components/more/DataAnalysisPrograms";
import Advertise from "../Components/blog/Advertise";
import { providedServices } from "../services/providedServices";

function More() {
  const { getMore } = providedServices;
  const [loading, setLoading] = React.useState(true);
  const [moreData, setMoreData] = React.useState([]);

  console.log(moreData,"moreData");

  React.useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const data = await getMore();
        setMoreData(data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching more data:", error);
        setLoading(false);
      }
    };
    fetchMoreData();
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

  const dataAnalysisData = moreData.find(item => item.title === "Data Analysis Programs");

  return (
    <div>
      <DataAnalysisPrograms data={dataAnalysisData} />
      <Advertise />
    </div>
  );
}

export default More;
