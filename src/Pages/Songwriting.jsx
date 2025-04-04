import React, { useState, useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { lyricsService } from '../services/lyricsServices';
import arrow from "../assets/create/arrow.png";
import bgimage from "../assets/mastering/bgimage.png";
import '../styles/home/GraphicDesign.css';
import SuccessModal from '../Components/SuccessModal';

function Songwriting() {
  // User input states
  const [lyricsPrompt, setLyricsPrompt] = useState('');
  const [mood, setMood] = useState('');
  const [situation, setSituation] = useState('');
  
  // AI suggestion states
  const [themeSuggestions, setThemeSuggestions] = useState([]);
  const [rhymeSuggestions, setRhymeSuggestions] = useState([]);
  const [structureSuggestion, setStructureSuggestion] = useState('');
  
  // User's lyrics state
  const [userLyrics, setUserLyrics] = useState('');
  
  // AI feedback state
  const [aiFeedback, setAiFeedback] = useState('');
  
  // Customization states
  const [customizePrompt, setCustomizePrompt] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Saved lyrics and UI states
  const [savedLyrics, setSavedLyrics] = useState([]);
  const [imagesLoading, setImagesLoading] = useState({});
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState('themes'); // 'themes', 'rhymes', 'structure', 'feedback'
  
  // Refs
  const sectionRef = useRef(null);
  const previewRef = useRef(null);

  // OpenAI API Key (from the provided key)
  const OPENAI_API_KEY = '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';

  // Card animation variants
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  // Predefined mood and situation images from Lorem Picsum
  const moodImages = [
    { id: 1, url: 'https://picsum.photos/seed/happy/238/238', description: 'Happy' },
    { id: 2, url: 'https://picsum.photos/seed/sad/238/238', description: 'Sad' },
    { id: 3, url: 'https://picsum.photos/seed/romantic/238/238', description: 'Romantic' },
    { id: 4, url: 'https://picsum.photos/seed/angry/238/238', description: 'Angry' },
  ];

  const situationImages = [
    { id: 1, url: 'https://picsum.photos/seed/rainy/238/238', description: 'Rainy Day' },
    { id: 2, url: 'https://picsum.photos/seed/party/238/238', description: 'Party' },
    { id: 3, url: 'https://picsum.photos/seed/breakup/238/238', description: 'Breakup' },
    { id: 4, url: 'https://picsum.photos/seed/travel/238/238', description: 'Travel' },
  ];

  // Intersection Observer for slide-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-slide");
            elements.forEach((el, index) => {
              setTimeout(() => el.classList.add("slide-in-animation"), index * 200);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Debug state changes and scroll to preview
  useEffect(() => {
    console.log('Generated Lyrics State:', userLyrics);
    console.log('Is Loading:', isLoading);
    if (userLyrics && !isLoading && previewRef.current) {
      console.log('Scrolling to preview section');
      previewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userLyrics, isLoading]);

  // Fetch saved lyrics on component mount
  useEffect(() => {
    const fetchSavedLyrics = async () => {
      try {
        const response = await lyricsService.getAllLyrics();
        if (response.data) {
          setSavedLyrics(response.data);
        }
      } catch (err) {
        console.error('Error fetching saved lyrics:', err);
        setError('Failed to fetch saved lyrics');
      }
    };

    fetchSavedLyrics();
  }, []);

  // Generate lyrics using OpenAI API
  const generateLyrics = async () => {
    if (!lyricsPrompt.trim() && !mood.trim() && !situation.trim()) {
      setError('Please provide at least a prompt, mood, or situation.');
      return;
    }
    if (!OPENAI_API_KEY) {
      setError('OpenAI API key is missing.');
      return;
    }

    setIsLoading(true);
    setError('');
    setUserLyrics(''); // Reset lyrics before generation

    try {
      const prompt = `You are a skilled songwriter. Generate creative song lyrics based on:
        - Base prompt: "${lyricsPrompt || 'a general theme'}"
        - Mood: "${mood || 'neutral'}"
        - Situation: "${situation || 'everyday life'}"
        Ensure the lyrics reflect the mood and situation, with verses and a chorus.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency
          messages: [{ role: 'user', content: prompt }],
          temperature: 1,
          max_tokens: 500, // Limiting tokens to reduce credit usage
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const lyrics = data.choices[0].message.content;
        console.log('Generated Lyrics:', lyrics); // Debug log
        setUserLyrics(lyrics);
      } else {
        throw new Error('No lyrics generated');
      }
    } catch (err) {
      setError(`Error generating lyrics: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Customize lyrics using OpenAI API
  const customizeLyrics = async () => {
    if (!customizePrompt.trim()) {
      setError('Please provide a customization prompt.');
      return;
    }

    setIsCustomizing(true);
    setError('');

    try {
      const prompt = `You are a skilled songwriter. Modify the following lyrics based on this customization prompt: "${customizePrompt}". Here are the original lyrics:\n\n${userLyrics}\n\nEnsure the modified lyrics still reflect the original mood ("${mood || 'neutral'}") and situation ("${situation || 'everyday life'}").`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 1,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const customizedLyrics = data.choices[0].message.content;
        console.log('Customized Lyrics:', customizedLyrics);
        setUserLyrics(customizedLyrics);
      } else {
        throw new Error('No customized lyrics generated');
      }
    } catch (err) {
      setError(`Error customizing lyrics: ${err.message}`);
      console.error('Error:', err);
    } finally {
      setIsCustomizing(false);
    }
  };

  // Save lyrics using the service
  const saveLyrics = async () => {
    if (!userLyrics.trim()) {
      setError('Please write some lyrics first before saving.');
      return;
    }
    
    try {
      setIsSaving(true);
      const newLyric = {
        id: Date.now().toString(),
        lyrics: userLyrics,
        mood: mood,
        situation: situation,
        created: new Date().toISOString(),
        image: moodImages.find(m => m.description === mood)?.url || 'https://picsum.photos/seed/default/238/238'
      };
      
      const response = await lyricsService.createLyrics(newLyric);
      if (response.data) {
        // Track image loading state for the new lyric
        setImagesLoading(prev => ({
          ...prev,
          [response.data._id]: true
        }));
        
        setSavedLyrics(prev => [...prev, response.data]);
        setShowSuccessModal(true);
      }
    } catch (err) {
      console.error('Error saving lyrics:', err);
      setError('Failed to save lyrics');
    } finally {
      setIsSaving(false);
    }
  };

  // Remove lyrics using the service
  const removeLyrics = async (id) => {
    try {
      await lyricsService.deleteLyrics(id);
      setSavedLyrics(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error removing lyrics:', err);
      setError('Failed to delete lyrics');
    }
  };

  // View lyrics details using the service
  const viewLyrics = async (id) => {
    try {
      const response = await lyricsService.getLyricsById(id);
      if (response.data) {
        setSelectedLyrics(response.data.lyrics);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error fetching lyrics details:', err);
      setError('Failed to fetch lyrics details');
    }
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
    setSelectedLyrics(null);
  };

  // Handle image load event
  const handleImageLoad = (id) => {
    setImagesLoading(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide { opacity: 0; transform: translateX(-100px); }
          .slide-in-animation { animation: slideIn 0.8s ease-out forwards; }
          .create-button {
            background-color: white; color: black; height: 48px; padding: 0 32px;
            display: flex; align-items: center; justify-content: center; border-radius: 9999px;
            border: none; font-size: 16px; font-weight: 500; cursor: pointer; transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 12px;
          }
          .create-button:hover { 
            background-color: #f9d94c; 
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
          }
          .create-button img { width: 16px; height: 16px; margin-left: 8px; transition: transform 0.5s ease-in-out; }
          .create-button:hover img { transform: translateX(4px); }
          .create-button:disabled { background-color: #cccccc; cursor: not-allowed; }
          .lyrics-input { 
            background: rgba(255, 255, 255, 0.1); 
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px; 
            color: white; 
            padding: 16px; 
            width: 100%; 
            margin-top: 10px; 
            font-size: 16px; 
            resize: vertical; 
            transition: all 0.3s ease;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          .lyrics-input:focus { 
            outline: none; 
            border-color: #f9d94c; 
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(249, 217, 76, 0.3);
          }
          .lyrics-output { 
            background: rgba(255, 255, 255, 0.1); 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            border-radius: 12px; 
            padding: 20px;
            margin-top: 20px; 
            white-space: pre-wrap; 
            font-family: 'Orbitron', sans-serif; 
            color: white; 
            min-height: 200px; 
            width: 100%; 
            display: block; 
          }
          .card-button { 
            background: white; 
            color: black; 
            padding: 10px 20px; 
            border-radius: 9999px; 
            font-size: 14px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .card-button:hover { 
            background: #f9d94c; 
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          }
          .loading-spinner { 
            border: 4px solid rgba(255, 255, 255, 0.3); 
            border-top: 4px solid white; 
            border-radius: 50%; 
            width: 40px; 
            height: 40px; 
            animation: spin 1s linear infinite; 
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .selection-card { 
            border-radius: 16px; 
            overflow: hidden; 
            cursor: pointer; 
            transition: all 0.3s ease; 
            border: 2px solid transparent;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .selection-card:hover { 
            transform: scale(1.05); 
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
          }
          .selection-card.selected { 
            border: 2px solid #f9d94c; 
            box-shadow: 0 0 0 4px rgba(249, 217, 76, 0.3);
          }
          .selection-card img { width: 100%; height: 150px; object-fit: cover; }
          .selection-card p { 
            background: rgba(0, 0, 0, 0.7); 
            color: white; 
            padding: 10px; 
            text-align: center; 
            font-size: 14px;
            font-weight: 500;
            font-family: 'Orbitron', sans-serif;
          }
          .panel {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }
          .panel:hover {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(249, 217, 76, 0.3);
          }
          .panel-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
          }
          .panel-title svg {
            margin-right: 10px;
          }
          .tab-button {
            background: transparent;
            color: rgba(255, 255, 255, 0.6);
            border: none;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .tab-button.active {
            background: rgba(249, 217, 76, 0.2);
            color: #f9d94c;
          }
          .tab-button:hover:not(.active) {
            background: rgba(255, 255, 255, 0.1);
            color: white;
          }
        `}
      </style>

      <div className="relative min-h-screen h-auto w-full lg:px-20 py-8" ref={sectionRef}>
        <img src={bgimage} alt="background" className="w-full h-full object-cover absolute inset-0" />
        <div className="relative w-full h-full flex flex-col justify-center z-10">
          <div className="space-y-10 max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="text-white font-bold font-['Orbitron'] animate-slide text-5xl mb-4">
                Song Lyrics Creator
              </h1>
              <p className="text-white/80 text-lg max-w-3xl mx-auto animate-slide">
                Your creative songwriting studio where AI assists but you remain the artist
              </p>
            </div>
            
            <div className="panel animate-slide">
              <div className="panel-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Select Your Inspiration
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mood Selection */}
                <div>
                  <h3 className="text-white font-['Orbitron'] text-xl mb-4">Mood</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {moodImages.map(img => (
                      <div
                        key={img.id}
                        className={`selection-card ${mood === img.description ? 'selected' : ''}`}
                        onClick={() => setMood(img.description)}
                      >
                        <img src={img.url} alt={img.description} />
                        <p>{img.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Situation Selection */}
                <div>
                  <h3 className="text-white font-['Orbitron'] text-xl mb-4">Situation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {situationImages.map(img => (
                      <div
                        key={img.id}
                        className={`selection-card ${situation === img.description ? 'selected' : ''}`}
                        onClick={() => setSituation(img.description)}
                      >
                        <img src={img.url} alt={img.description} />
                        <p>{img.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Partner Section */}
            <div className="panel animate-slide">
              <div className="panel-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Creative Partner
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - AI Assistance */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                  <h4 className="text-white font-['Orbitron'] text-xl mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    AI Assistance
                  </h4>
                  
                  {/* Word or Phrase for Rhymes */}
                  <div className="mb-6">
                    <label className="text-white/90 block mb-2 font-medium">Enter a word or phrase for rhyme suggestions:</label>
                    <textarea
                      value={lyricsPrompt}
                      onChange={(e) => setLyricsPrompt(e.target.value)}
                      placeholder="Enter a word or phrase..."
                      className="lyrics-input"
                      rows="2"
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Assistance Buttons */}
                  <div className="flex flex-col space-y-4 mb-4">
                    <button onClick={generateLyrics} disabled={isLoading} className="create-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      {isLoading ? 'Generating...' : 'Get Theme Ideas'}
                      {!isLoading && <img src={arrow} alt="arrow" />}
                    </button>
                    <button onClick={generateLyrics} disabled={isLoading} className="create-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {isLoading ? 'Generating...' : 'Get Rhyme Suggestions'}
                      {!isLoading && <img src={arrow} alt="arrow" />}
                    </button>
                    <button onClick={generateLyrics} disabled={isLoading} className="create-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      {isLoading ? 'Generating...' : 'Get Song Structure'}
                      {!isLoading && <img src={arrow} alt="arrow" />}
                    </button>
                  </div>
                  
                  {/* Loading Spinner */}
                  {isLoading && (
                    <div className="flex justify-center mt-6">
                      <div className="loading-spinner"></div>
                    </div>
                  )}
                </div>
                
                {/* Right Column - Your Lyrics */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10">
                  <h4 className="text-white font-['Orbitron'] text-xl mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Your Lyrics
                  </h4>
                  <textarea
                    value={userLyrics}
                    onChange={(e) => setUserLyrics(e.target.value)}
                    placeholder="Write your lyrics here..."
                    className="lyrics-input"
                    rows="12"
                    disabled={isLoading}
                  />
                  
                  {/* Feedback and Save Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button onClick={customizeLyrics} disabled={isLoading || isSaving} className="create-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {isLoading ? 'Getting Feedback...' : 'Get AI Feedback'}
                      {!isLoading && <img src={arrow} alt="arrow" />}
                    </button>
                    <button onClick={saveLyrics} disabled={isLoading || isSaving} className="card-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      {isSaving ? 'Saving...' : 'Save Lyrics'}
                    </button>
                    <button onClick={() => setUserLyrics('')} disabled={isLoading} className="card-button">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear Lyrics
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl animate-slide">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Saved Lyrics Section */}
            {savedLyrics.length > 0 && (
              <div className="panel animate-slide">
                <div className="panel-title">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Your Saved Lyrics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedLyrics.map(item => (
                    <motion.div
                      key={item._id}
                      className="rounded-xl overflow-hidden relative group cursor-pointer bg-black/20"
                      variants={cardVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {imagesLoading[item._id] !== false ? (
                        <div className="h-[200px] w-full flex items-center justify-center bg-gray-800">
                          <div className="loading-spinner"></div>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.mood}
                          className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onLoad={() => handleImageLoad(item._id)}
                          onError={() => handleImageLoad(item._id)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-[70%] group-hover:translate-y-0 transition-transform duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">
                          <div className="text-white">
                            <p className="text-lg font-['Orbitron'] font-medium">{item.mood || 'Unknown Mood'}</p>
                            <p className="text-sm opacity-80">Created: {new Date(item.created).toLocaleDateString()}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                viewLyrics(item._id);
                              }}
                              className="bg-white/90 hover:bg-white text-black rounded-full p-2 transition-all duration-300"
                              title="View Lyrics"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeLyrics(item._id);
                              }}
                              className="bg-white/90 hover:bg-white text-black rounded-full p-2 transition-all duration-300"
                              title="Delete Lyrics"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lyrics Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-['Orbitron'] mb-4">Lyrics</h3>
            <div className="whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
              {selectedLyrics}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          onClose={closeSuccessModal} 
          title="Lyrics Saved Successfully!" 
        />
      )}
    </>
  );
}

export default Songwriting;