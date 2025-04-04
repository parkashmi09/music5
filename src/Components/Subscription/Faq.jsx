import React from "react";
import faq from "../../assets/subscription/faq.png";
import "../../styles/subscription/faq.css";
import { companyService } from "../../services/companyService";


export default function Faq() {

  const [loading, setLoading] = React.useState(true);
  const [faqData, setFaqData] = React.useState([]);
  React.useEffect(() => {
    const fetchFaq = async () => {
      try {
        const result = await companyService.getFAQ();
        // Filter data to only include items with type "Main"
        const mainFAQs = result.data.filter(item => item.type === "Subscription");
        setFaqData(mainFAQs);
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
    <div className="container-fluid gradient-bg my-5 py-lg-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-lg-4 py-3">
            <img src={faq} className="img-fluid" alt="FAQ" />
          </div>
          <div className="col-lg-8 border faq">
            <div className="accordion" id="faqAccordion">
              {faqData.length > 0 && faqData.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
