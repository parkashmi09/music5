import React, { useState, useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { graphicDesignService } from "../services/graphicDesignService";
import arrow from "../assets/create/arrow.png";
import bgimage from "../assets/mastering/bgimage.png";
import "../styles/home/GraphicDesign.css";

function GraphicDesignMockup() {
  const [designUrl, setDesignUrl] = useState("");
  const [mockupType, setMockupType] = useState("album_cover");
  const [mockupImage, setMockupImage] = useState("");
  const [createdMockups, setCreatedMockups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mockupTemplates, setMockupTemplates] = useState([]);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [selectedPrintArea, setSelectedPrintArea] = useState("");
  const sectionRef = useRef(null);

  const imageCollections = {
    album_cover: [
      {
        id: "album1",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
      {
        id: "album2",
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
      {
        id: "album3",
        url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
    ],
    flyer: [
      {
        id: "flyer1",
        url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
      {
        id: "flyer2",
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
      {
        id: "flyer3",
        url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&w=1200",
        thumb:
          "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&w=300",
        photographer: "Unsplash",
      },
    ],
  };

  useEffect(() => {
    fetchMockupTemplates();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("slide-in-animation");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const images = imageCollections[mockupType];
    if (images && images.length > 0) {
      setSelectedImageIndex(0);
      setDesignUrl(images[0].url);
    }
  }, [mockupType]);

  useEffect(() => {
    if (mockupTemplates.length > 0) {
      const template = mockupTemplates[selectedTemplateIndex];
      const tshirtObject = template.smart_objects.find(
        (obj) => obj.name === "T-shirt"
      );
      if (tshirtObject && tshirtObject.print_area_presets.length > 0) {
        setSelectedPrintArea(tshirtObject.print_area_presets[0].uuid);
      }
    }
  }, [mockupTemplates, selectedTemplateIndex]);

  const fetchMockupTemplates = async () => {
    try {
      setLoading(true);
      const response = await graphicDesignService.getDynamicMockups();
      const templates = response.data || [];
      setMockupTemplates(templates);
    } catch (err) {
      setError(`Error fetching mockup templates: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateGraphicMockup = async () => {
    if (!designUrl) return;

    setLoading(true);
    setImageLoading(true);
    setError("");
    setMockupImage("");

    try {
      const selectedTemplate = mockupTemplates[selectedTemplateIndex];
      if (!selectedTemplate) {
        throw new Error("No suitable mockup template found");
      }

      const tshirtObject = selectedTemplate.smart_objects.find(
        (obj) => obj.name === "T-shirt"
      );
      if (!tshirtObject) {
        throw new Error("No T-shirt smart object found");
      }

      const imageResponse = await fetch(designUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "design.jpg", {
        type: "image/jpeg",
      });

      const mockupData = await graphicDesignService.createDynamicMockup({
        image: imageFile,
        mockupUuid: selectedTemplate.uuid,
        smartObjectsUuid: tshirtObject.uuid,
      });

      setMockupImage(mockupData);
      setCreatedMockups((prev) => [
        {
          url: mockupData,
          type: mockupType,
          templateName: selectedTemplate.name,
          printArea:
            tshirtObject.print_area_presets.find(
              (p) => p.uuid === selectedPrintArea
            )?.name || "Default",
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      setError(`Error generating mockup: ${err.message}`);
    } finally {
      setLoading(false);
      setImageLoading(false);
    }
  };

  const selectImage = (index, imageUrl) => {
    setSelectedImageIndex(index);
    setDesignUrl(imageUrl);
  };

  const selectTemplate = (index) => {
    setSelectedTemplateIndex(index);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide {
            opacity: 0;
            transform: translateX(-100px);
          }
          .slide-in-animation {
            animation: slideIn 0.8s ease-out forwards;
          }
          .create-button {
            background-color: white;
            color: black;
            height: 40px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            border: none;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .create-button:hover {
            background-color: #f9d94c;
          }
          .create-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .create-button img {
            width: 14px;
            height: 14px;
            margin-left: 6px;
            transition: transform 0.5s ease-in-out;
          }
          .create-button:hover:not(:disabled) img {
            transform: translateX(4px);
          }
          .mockup-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
            margin-top: 1.5rem;
          }
          .mockup-item {
            aspect-ratio: 1;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .mockup-item:hover {
            transform: scale(1.05);
          }
          .mockup-item.selected {
            border: 2px solid #f9d94c;
          }
          .mockup-result {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            padding: 16px;
            margin-top: 1.5rem;
            height: 350px; /* Fixed height to prevent shifting */
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .mockup-result-image {
            width: 100%;
            max-height: 280px;
            object-fit: contain;
            border-radius: 8px;
            transition: opacity 0.3s ease;
          }
          .mockup-result-image.loaded {
            opacity: 1;
          }
          .loading-placeholder {
            height: 280px; /* Matches image height */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
          }
          .loading-placeholder::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.15),
              transparent
            );
            animation: shimmer 1.5s infinite;
          }
          .loading-placeholder-content {
            z-index: 1;
            text-align: center;
            color: white;
          }
          .loading-placeholder-content h3 {
            font-size: 20px;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #f9d94c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .created-mockups-section {
            margin-top: 2rem;
            padding: 16px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .created-mockups-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 0.75rem;
            margin-top: 1rem;
          }
          .created-mockup-item {
            position: relative;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .created-mockup-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            aspect-ratio: 1;
          }
          .mockup-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 4px;
            font-size: 10px;
          }
          .template-selector {
            display: flex;
            gap: 0.75rem;
            margin: 1rem 0;
            flex-wrap: wrap;
            justify-content: center;
          }
          .template-item {
            cursor: pointer;
            border-radius: 6px;
            overflow: hidden;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .template-item:hover {
            transform: scale(1.05);
          }
          .template-item.selected {
            border: 2px solid #f9d94c;
          }
          .template-item img {
            width: 80px;
            height: 80px;
            object-fit: cover;
          }
          .print-area-selector {
            margin: 1rem 0;
            text-align: center;
          }
          .print-area-selector select {
            padding: 6px 16px;
            border-radius: 9999px;
            background: white;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .print-area-selector select:hover {
            background: #f9d94c;
          }
          .control-section {
            margin: 1.5rem 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        `}
      </style>

      <div
        className="relative min-h-[70vh] h-auto w-full lg:px-16 py-6"
        ref={sectionRef}
      >
        <img
          src={bgimage}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />

        <div className="relative w-full h-full flex flex-col justify-center z-10">
          <div className="space-y-3 max-w-5xl mx-auto">
            <h1 className="text-white font-bold font-['Orbitron'] animate-slide text-center">
              <TypeAnimation
                sequence={["Create Professional", 1000]}
                wrapper="p"
                speed={50}
                repeat={1}
                cursor={false}
                className="lg:text-5xl text-3xl leading-normal"
              />
              <TypeAnimation
                sequence={["Design Mockups", 1000]}
                wrapper="p"
                speed={50}
                repeat={1}
                cursor={false}
                className="lg:text-5xl text-3xl leading-normal"
              />
            </h1>

            <div className="animate-slide">
              <div className="flex justify-center gap-3 mb-6">
                <button
                  onClick={() => setMockupType("album_cover")}
                  className={`create-button ${
                    mockupType === "album_cover" ? "bg-[#f9d94c]" : ""
                  }`}
                >
                  Album Cover
                </button>
                <button
                  onClick={() => setMockupType("flyer")}
                  className={`create-button ${
                    mockupType === "flyer" ? "bg-[#f9d94c]" : ""
                  }`}
                >
                  Flyer
                </button>
              </div>

              <div className="mockup-grid">
                {imageCollections[mockupType].map((image, index) => (
                  <div
                    key={image.id}
                    onClick={() => selectImage(index, image.url)}
                    className={`mockup-item ${
                      selectedImageIndex === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={image.thumb}
                      alt={`Mockup ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="control-section">
                {mockupTemplates.length > 0 && (
                  <div className="template-selector">
                    {mockupTemplates.map((template, index) => (
                      <div
                        key={template.uuid}
                        onClick={() => selectTemplate(index)}
                        className={`template-item ${
                          selectedTemplateIndex === index ? "selected" : ""
                        }`}
                      >
                        <img
                          src={
                            template.thumbnails.find((t) => t.width === 240)
                              ?.url || template.thumbnail
                          }
                          alt={template.name}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {mockupTemplates.length > 0 && (
                  <div className="print-area-selector">
                    <select
                      value={selectedPrintArea}
                      onChange={(e) => setSelectedPrintArea(e.target.value)}
                    >
                      {mockupTemplates[selectedTemplateIndex]?.smart_objects
                        .find((obj) => obj.name === "T-shirt")
                        ?.print_area_presets.map((preset) => (
                          <option key={preset.uuid} value={preset.uuid}>
                            {preset.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={generateGraphicMockup}
                  disabled={
                    loading || !designUrl || mockupTemplates.length === 0
                  }
                  className="create-button"
                >
                  {loading ? "Generating..." : "Generate Mockup"}
                  <img src={arrow} alt="arrow" />
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-center mt-3">{error}</div>
              )}

              <>
                {createdMockups?.length > 0 && (
                  <>
                    <div className="mockup-result">
                      {imageLoading ? (
                        <div className="loading-placeholder">
                          <div className="loading-placeholder-content flex w-full flex-col items-center justify-center">
                            <h3>Generating Mockup</h3>
                            <div className="loading-spinner" />
                            <p className="mt-3 text-sm">
                              Crafting your design...
                            </p>
                          </div>
                        </div>
                      ) : mockupImage ? (
                        <>
                          <img
                            src={mockupImage}
                            alt="Generated Mockup"
                            className="mockup-result-image loaded"
                            onError={(e) =>
                              setError("Failed to load mockup image")
                            }
                          />
                          <div className="flex justify-end">
                            <a
                              href={mockupImage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="create-button"
                            >
                              Download
                              <img src={arrow} alt="arrow" />
                            </a>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>
                )}
              </>

              {createdMockups.length > 0 && (
                <div className="created-mockups-section">
                  <h2 className="text-white text-xl font-bold mb-3">
                    Created Mockups
                  </h2>
                  <div className="created-mockups-grid">
                    {createdMockups.map((mockup, index) => (
                      <div key={index} className="created-mockup-item">
                        <img
                          src={mockup.url}
                          alt={`Created Mockup ${index + 1}`}
                        />
                        <div className="mockup-info">
                          {/* <p>Type: {mockup.type}</p> */}
                          <p className="text-nowrap">Template: {mockup.templateName}</p>
                          {/* <p>Position: {mockup.printArea}</p> */}
                          <p>
                            Date:{" "}
                            {new Date(mockup.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GraphicDesignMockup;
