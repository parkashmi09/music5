import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import bgimage from "../../assets/video/frequently.png";
import { companyService } from "../../services/companyService";

const Frequently = () => {
  const [openQuestion, setOpenQuestion] = useState(null);



  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };


  const [loading, setLoading] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  React.useEffect(() => {
    const fetchFaq = async () => {
      try {
        const result = await companyService.getFAQ();
        // Filter data to only include items with type "Main"
        const mainFAQs = result.data.filter(item => item.type === "Song");
        setQuestions(mainFAQs);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchFaq();
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
    <div className="relative w-full lg:min-h-[70vh]">
      {/* Background placeholder - replace with your actual image */}
      <div className="absolute inset-0">
        <img
          src={bgimage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-full py-8">
        <div className="max-w-[90%] mx-auto flex flex-col md:flex-row justify-center items-start gap-8">
          {/* Title */}
          <div className="md:w-1/3 md:sticky md:top-8">
            <h2
              className="text-6xl font-bold text-white mb-8"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <p className="text-5xl">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </p>
            </h2>
          </div>

          {/* FAQ List */}
          <div
            className="md:w-2/3 border backdrop-blur-sm rounded-xl px-6 max-h-[70vh] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.3) rgba(0,0,0,0.1)",
            }}
          >
            {questions.map((item) => (
              <div
                key={item._id}
                className="border-b border-gray-700 last:border-0"
              >
                <button
                  onClick={() => toggleQuestion(item._id)}
                  className="w-full py-4 flex justify-between items-center text-left text-white hover:text-gray-300 transition-colors"
                >
                  <span className="text-md pr-8">{item.question}</span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-200
                      ${openQuestion === item._id ? "rotate-180" : ""}`}
                  />
                </button>

                {openQuestion === item._id && (
                  <div className="pb-4 text-gray-300 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frequently;
