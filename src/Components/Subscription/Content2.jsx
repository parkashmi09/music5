import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  .font-quicksand { font-family: 'Quicksand', sans-serif; }
  .font-inter { font-family: 'Inter', sans-serif; }
  
  @media (max-width: 768px) {
    .mobile-scroll-container {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .mobile-scroll-container::-webkit-scrollbar { display: none; }
    .mobile-min-width { min-width: 700px; }
    .mobile-section-title {
      position: sticky;
      left: 0;
      background-color: black;
      z-index: 20;
    }
    .mobile-feature-name {
      position: sticky;
      left: 0;
      background-color: black;
      z-index: 20;
      width: 200px;
    }
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    .accordion-content.open { max-height: 1000px; }
  }
`;

const Content2 = ({ data }) => {
  const [openSections, setOpenSections] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(1);

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Assuming data is an array of plans
  const plans = data.map((plan, index) => ({
    name: plan.name,
    price: `$${plan.price}`,
    period: plan.price === 0 ? "" : "/mo. per user",
    cta: `Go ${plan.name}`,
    ctaClass: index === 2 
      ? "bg-[#FFD700] text-black rounded-xl hover:bg-[#FFE44D] transition-all duration-300"
      : "border border-white rounded-xl hover:bg-white hover:text-black transition-all duration-300"
  }));

  const sections = [
    {
      title: "Video creation",
      features: data.map(plan => ({
        name: "Quality",
        free: plan.name === "Free" ? plan.videoCreation.quality : "-",
        bronze: plan.name === "Bronze Plan" ? plan.videoCreation.quality : "-",
        gold: plan.name === "Gold Plan" ? plan.videoCreation.quality : "-",
        platinum: plan.name === "Platinum Plan" ? plan.videoCreation.quality : "-",
      })).concat([
        {
          name: "Creation Limit",
          free: data.find(p => p.name === "Free")?.videoCreation.creationLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.videoCreation.creationLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.videoCreation.creationLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.videoCreation.creationLimit || "-",
        },
        {
          name: "Storage Limit",
          free: data.find(p => p.name === "Free")?.videoCreation.storageLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.videoCreation.storageLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.videoCreation.storageLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.videoCreation.storageLimit || "-",
        },
        {
          name: "Bandwidth Limit",
          free: data.find(p => p.name === "Free")?.videoCreation.bandwidthLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.videoCreation.bandwidthLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.videoCreation.bandwidthLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.videoCreation.bandwidthLimit || "-",
        },
        {
          name: "Extra Features",
          free: data.find(p => p.name === "Free")?.videoCreation.extraFeatures || false,
          bronze: data.find(p => p.name === "Bronze Plan")?.videoCreation.extraFeatures || false,
          gold: data.find(p => p.name === "Gold Plan")?.videoCreation.extraFeatures || false,
          platinum: data.find(p => p.name === "Platinum Plan")?.videoCreation.extraFeatures || false,
        }
      ])
    },
    {
      title: "Music Creation",
      features: data.map(plan => ({
        name: "Quality",
        free: plan.name === "Free" ? plan.musicCreation.quality : "-",
        bronze: plan.name === "Bronze Plan" ? plan.musicCreation.quality : "-",
        gold: plan.name === "Gold Plan" ? plan.musicCreation.quality : "-",
        platinum: plan.name === "Platinum Plan" ? plan.musicCreation.quality : "-",
      })).concat([
        {
          name: "Creation Limit",
          free: data.find(p => p.name === "Free")?.musicCreation.creationLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.musicCreation.creationLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.musicCreation.creationLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.musicCreation.creationLimit || "-",
        },
        {
          name: "Storage Limit",
          free: data.find(p => p.name === "Free")?.musicCreation.storageLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.musicCreation.storageLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.musicCreation.storageLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.musicCreation.storageLimit || "-",
        },
        {
          name: "Bandwidth Limit",
          free: data.find(p => p.name === "Free")?.musicCreation.bandwidthLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.musicCreation.bandwidthLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.musicCreation.bandwidthLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.musicCreation.bandwidthLimit || "-",
        },
        {
          name: "Extra Features",
          free: data.find(p => p.name === "Free")?.musicCreation.extraFeatures || false,
          bronze: data.find(p => p.name === "Bronze Plan")?.musicCreation.extraFeatures || false,
          gold: data.find(p => p.name === "Gold Plan")?.musicCreation.extraFeatures || false,
          platinum: data.find(p => p.name === "Platinum Plan")?.musicCreation.extraFeatures || false,
        }
      ])
    },
    {
      title: "Mastering",
      features: data.map(plan => ({
        name: "Quality",
        free: plan.name === "Free" ? plan.mastering.quality : "-",
        bronze: plan.name === "Bronze Plan" ? plan.mastering.quality : "-",
        gold: plan.name === "Gold Plan" ? plan.mastering.quality : "-",
        platinum: plan.name === "Platinum Plan" ? plan.mastering.quality : "-",
      })).concat([
        {
          name: "Creation Limit",
          free: data.find(p => p.name === "Free")?.mastering.creationLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.mastering.creationLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.mastering.creationLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.mastering.creationLimit || "-",
        },
        {
          name: "Storage Limit",
          free: data.find(p => p.name === "Free")?.mastering.storageLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.mastering.storageLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.mastering.storageLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.mastering.storageLimit || "-",
        },
        {
          name: "Bandwidth Limit",
          free: data.find(p => p.name === "Free")?.mastering.bandwidthLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.mastering.bandwidthLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.mastering.bandwidthLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.mastering.bandwidthLimit || "-",
        },
        {
          name: "Extra Features",
          free: data.find(p => p.name === "Free")?.mastering.extraFeatures || false,
          bronze: data.find(p => p.name === "Bronze Plan")?.mastering.extraFeatures || false,
          gold: data.find(p => p.name === "Gold Plan")?.mastering.extraFeatures || false,
          platinum: data.find(p => p.name === "Platinum Plan")?.mastering.extraFeatures || false,
        }
      ])
    },
    {
      title: "Recording Music",
      features: data.map(plan => ({
        name: "Quality",
        free: plan.name === "Free" ? plan.recordingMusic.quality : "-",
        bronze: plan.name === "Bronze Plan" ? plan.recordingMusic.quality : "-",
        gold: plan.name === "Gold Plan" ? plan.recordingMusic.quality : "-",
        platinum: plan.name === "Platinum Plan" ? plan.recordingMusic.quality : "-",
      })).concat([
        {
          name: "Creation Limit",
          free: data.find(p => p.name === "Free")?.recordingMusic.creationLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.recordingMusic.creationLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.recordingMusic.creationLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.recordingMusic.creationLimit || "-",
        },
        {
          name: "Storage Limit",
          free: data.find(p => p.name === "Free")?.recordingMusic.storageLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.recordingMusic.storageLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.recordingMusic.storageLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.recordingMusic.storageLimit || "-",
        },
        {
          name: "Bandwidth Limit",
          free: data.find(p => p.name === "Free")?.recordingMusic.bandwidthLimit || "-",
          bronze: data.find(p => p.name === "Bronze Plan")?.recordingMusic.bandwidthLimit || "-",
          gold: data.find(p => p.name === "Gold Plan")?.recordingMusic.bandwidthLimit || "-",
          platinum: data.find(p => p.name === "Platinum Plan")?.recordingMusic.bandwidthLimit || "-",
        },
        {
          name: "Extra Features",
          free: data.find(p => p.name === "Free")?.recordingMusic.extraFeatures || false,
          bronze: data.find(p => p.name === "Bronze Plan")?.recordingMusic.extraFeatures || false,
          gold: data.find(p => p.name === "Gold Plan")?.recordingMusic.extraFeatures || false,
          platinum: data.find(p => p.name === "Platinum Plan")?.recordingMusic.extraFeatures || false,
        }
      ])
    }
  ];

  const renderCell = (value) => {
    if (value === true)
      return <Check className="w-4 h-4 text-green-500 mx-auto" />;
    if (value === false)
      return <Check className="w-4 h-4 text-red-500 mx-auto" />;
    return <span className="text-md">{value}</span>;
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bg-black pt-16">
        {/* Desktop View - Fixed Header */}
        <div className="sticky top-26 z-40 w-full bg-black px-4 border-b border-gray-800 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-end">
            <div className="w-4/5 grid grid-cols-4 gap-4 py-4">
              {plans.map((plan, index) => (
                <div key={index} className="flex flex-col items-center">
                  <h3><p className="text-white text-lg font-medium font-quicksand mb-0">{plan.name}</p></h3>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-gray-400 font-quicksand font-medium text-sm">{plan.price}</span>
                    <span className="text-gray-400 font-quicksand font-medium text-sm">{plan.period}</span>
                  </div>
                  <button className={`mt-2 px-6 py-2 rounded-xl text-white font-inter font-medium ${plan.ctaClass}`}>
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View - Plan Selector */}
        <div className="md:hidden sticky top-24 z-40 w-full bg-black px-4 border-b border-gray-800">
          <div className="py-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-lg font-medium font-quicksand">Select Plan</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {plans.map((plan, index) => (
                <button
                  key={index}
                  className={`px-3 py-2 rounded-xl text-sm font-medium font-inter ${
                    selectedPlan === index 
                      ? index === 2 ? "bg-[#FFD700] text-black" : "bg-white text-black" 
                      : "border border-gray-600 text-white"
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <div className="text-center">{plan.name}</div>
                  <div className="text-center text-xs">{plan.price}{plan.period}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content - Desktop View */}
        <div className="max-w-7xl mx-auto hidden md:block">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <div className="border-b border-gray-800 py-4">
                <h3><p className="font-medium font-quicksand text-[#FC5252] text-lg">{section.title}</p></h3>
              </div>
              {section.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="grid grid-cols-5 py-4 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-[#FC5252] font-medium font-quicksand">{feature.name}</span>
                  </div>
                  <div className="text-center text-[#FC5252] font-medium font-quicksand">
                    {renderCell(feature.free)}
                  </div>
                  <div className="text-center text-[#CE8946] font-medium font-quicksand">
                    {renderCell(feature.bronze)}
                  </div>
                  <div className="text-center text-[#FFD700] font-medium font-quicksand">
                    {renderCell(feature.gold)}
                  </div>
                  <div className="text-center text-[#E5E4E2] font-medium font-quicksand">
                    {renderCell(feature.platinum)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Content - Mobile View with Accordion */}
        <div className="md:hidden px-4">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <div 
                className="border-b border-gray-800 py-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(sectionIndex)}
              >
                <h3><p className="text-[#FC5252] font-medium font-quicksand text-lg">{section.title}</p></h3>
                {openSections[sectionIndex] ? (
                  <ChevronUp className="w-6 h-6 text-[#FC5252]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#FC5252]" />
                )}
              </div>
              <div className={`accordion-content ${openSections[sectionIndex] ? 'open' : ''}`}>
                {section.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="py-3 border-b border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-[#FC5252] font-medium font-quicksand">{feature.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 rounded-lg">
                        <span className="text-gray-400 font-quicksand text-sm">Current Plan</span>
                        <span className={`font-medium font-quicksand text-sm ${
                          selectedPlan === 0 ? "text-[#FC5252]" :
                          selectedPlan === 1 ? "text-[#CE8946]" :
                          selectedPlan === 2 ? "text-[#FFD700]" : "text-[#E5E4E2]"
                        }`}>
                          {selectedPlan === 0 ? renderCell(feature.free) :
                           selectedPlan === 1 ? renderCell(feature.bronze) :
                           selectedPlan === 2 ? renderCell(feature.gold) : 
                           renderCell(feature.platinum)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-900 rounded-lg">
                        <span className="text-gray-400 font-quicksand text-sm">Upgrade to</span>
                        <span className={`font-medium font-quicksand text-sm ${
                          selectedPlan === 0 ? "text-[#CE8946]" :
                          selectedPlan === 1 ? "text-[#FFD700]" :
                          "text-[#E5E4E2]"
                        }`}>
                          {selectedPlan === 0 ? renderCell(feature.bronze) :
                           selectedPlan === 1 ? renderCell(feature.gold) :
                           selectedPlan === 2 ? renderCell(feature.platinum) : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Content2;