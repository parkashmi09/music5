import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full py-4 px-6 flex justify-between items-center text-left font-extralight text-white transition-colors"
        onClick={onClick}
      >
        <span>{question}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-4 text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Extract the FAQ items from the data prop if it exists
  const faqData = data?.map((item, index) => ({
    question: `${index + 1}. ${item.question}`,
    answer: item.answer
  })) || [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-4 lg:px-4">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-4xl text-center font-['Orbitron'] mb-12">
          <p className="text-[#ACBDFF]">Frequently Asked Questions</p>
        </h1>

        <div className="bg-opacity-40 rounded-lg border mt-10 border-gray-700 overflow-hidden">
          {faqData.length > 0 ? (
            faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => toggleQuestion(index)}
              />
            ))
          ) : (
            <div className="px-6 py-4 text-gray-400">
              <p>No FAQs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;