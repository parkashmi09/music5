import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import arrow from "../assets/create/arrow.png";
import bgimage from "../assets/mastering/bgimage.png";

function TextToMusic() {
  const [musicUrl, setMusicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [compositionProgress, setCompositionProgress] = useState(0);

  // Structured prompt state
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [tempo, setTempo] = useState("");
  const [useCase, setUseCase] = useState("Gaming montage");
  const [duration, setDuration] = useState("120"); // Default 2 minutes

  // Step-wise rendering state
  const [step, setStep] = useState(1);

  // Beatoven.ai API configuration
  const BASE_URL = "https://public-api.beatoven.ai";
  const API_KEY = "zfxk-nQ9Zkfnn82IdA-R1w";

  // Updated Genre options with high-quality Unsplash images
  const genres = [
    { name: "Indian", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" },
    { name: "Pop", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop" },
    { name: "Ambient", image: "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=2070&auto=format&fit=crop" },
    { name: "Indie", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop" },
    { name: "RnB", image: "https://images.unsplash.com/photo-1574876941831-0c863150d84e?q=80&w=2070&auto=format&fit=crop" },
    { name: "Cinematic", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop" },
    { name: "HipHop", image: "https://images.unsplash.com/photo-1511671786161-bce6a88a53d9?q=80&w=2070&auto=format&fit=crop" },
    { name: "Electronic", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" },
  ];

  // Updated Mood options with high-quality Unsplash images
  const moods = [
    { name: "Sad", image: "https://images.unsplash.com/photo-1509909756405-be01955638a3?q=80&w=2070&auto=format&fit=crop" },
    { name: "Calm", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Motivational", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Happy", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
    { name: "Scary", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Cheerful", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
    { name: "Angry", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Triumph", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Relaxing", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Depressing", image: "https://images.unsplash.com/photo-1509909756405-be01955638a3?q=80&w=2070&auto=format&fit=crop" },
    { name: "Dreamy", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Inspirational", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Energetic", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop" },
    { name: "Joyful", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
    { name: "Tense", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
    { name: "Fearful", image: "https://images.unsplash.com/photo-1507521628349-dee6b5761201?q=80&w=2070&auto=format&fit=crop" },
  ];

  // Instrument options
  const instruments = ["Chords", "Melody", "Bass"];

  const toggleInstrument = (instrument) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument));
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };

  const composeTrack = async () => {
    const instrumentsText = selectedInstruments.length > 0 ? selectedInstruments.join(" and ") : "various instruments";
    const promptText = `${genre ? `${genre} ` : ""}${
      mood ? `${mood} ` : ""
    }track with ${instrumentsText}, ${
      tempo ? `${tempo} tempo, ` : ""
    }${useCase ? `for ${useCase}, ` : ""}${duration ? `${duration} seconds` : ""}`.trim();

    if (!promptText || !genre || !mood) {
      setError("Please specify at least a genre and mood.");
      return;
    }

    setLoading(true);
    setError(null);
    setMusicUrl(null);
    setTaskId(null);
    setStatusMessage("Initializing composition...");
    setCompositionProgress(0);

    const requestBody = {
      prompt: { text: promptText },
      format: "mp3",
      looping: false,
    };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/tracks/compose`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Compose API Response:", { status: response.status, data });

      if (response.ok && (data.status === "started" || data.status === "composing") && data.task_id) {
        setTaskId(data.task_id);
        setStatusMessage(`Starting composition...`);
        setCompositionProgress(10);
      } else {
        throw new Error(`Composition failed: ${data.error || JSON.stringify(data) || "Invalid response"}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setStatusMessage("");
      setCompositionProgress(0);
      console.error("Compose Error:", err);
    }
  };

  const checkTaskStatus = async () => {
    if (!taskId) return;

    try {
      const response = await fetch(`${BASE_URL}/api/v1/tasks/${taskId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      const data = await response.json();
      console.log("Task Status API Response:", { status: response.status, data });

      if (response.ok) {
        if (data.status === "composed" && data.meta?.track_url) {
          setMusicUrl(data.meta.track_url);
          setLoading(false);
          setStatusMessage("Track ready!");
          setCompositionProgress(100);
        } else if (data.status === "composing" || data.status === "running") {
          setCompositionProgress((prev) => Math.min(90, prev + 10));
          setStatusMessage(`Composing your masterpiece...`);
          setTimeout(checkTaskStatus, 2000);
        } else {
          throw new Error(`Unexpected task status: ${data.status || JSON.stringify(data)}`);
        }
      } else {
        throw new Error(`Task check failed: ${data.error || JSON.stringify(data) || "Unknown error"}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setStatusMessage("");
      setCompositionProgress(0);
      console.error("Task Status Error:", err);
    }
  };

  useEffect(() => {
    if (taskId) checkTaskStatus();
  }, [taskId]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="relative min-h-[70vh] h-auto w-full lg:px-16 py-6">
      <img src={bgimage} alt="background" className="w-full h-full object-cover absolute inset-0" />

      <div className="relative w-full h-full flex flex-col justify-center z-10">
        <div className="space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="text-white font-bold font-['Orbitron'] text-center">
            <TypeAnimation
              sequence={["Create Music with AI", 1000]}
              wrapper="p"
              speed={50}
              repeat={1}
              cursor={false}
              className="lg:text-5xl text-3xl leading-normal"
            />
          </h1>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                  step >= s ? "bg-[#f9d94c] text-black" : "bg-white/20 text-white"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="animate-slide bg-white/10 backdrop-blur-sm rounded-xl p-8 space-y-8">
            {/* Step 1: Genre Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                  Step 1: Which genre do you want your track to have?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {genres.map((g) => (
                    <div
                      key={g.name}
                      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-lg ${
                        genre === g.name ? "ring-4 ring-[#f9d94c] scale-105" : "hover:scale-105 hover:shadow-xl"
                      }`}
                      onClick={() => {
                        setGenre(g.name);
                        nextStep();
                      }}
                    >
                      <img src={g.image} alt={g.name} className="w-full h-40 object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{g.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Mood Selection */}
            {step === 2 && (
              <div>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                  Step 2: What emotion do you want to assign to this track?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {moods.map((m) => (
                    <div
                      key={m.name}
                      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-lg ${
                        mood === m.name ? "ring-4 ring-[#f9d94c] scale-105" : "hover:scale-105 hover:shadow-xl"
                      }`}
                      onClick={() => {
                        setMood(m.name);
                        nextStep();
                      }}
                    >
                      <img src={m.image} alt={m.name} className="w-full h-40 object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{m.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="create-button group"
                    onClick={prevStep}
                  >
                    <span className="relative">Back</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Instrument, Tempo, Use Case, Duration */}
            {step === 3 && (
              <div>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                  Step 3: Customize your track
                </h2>
                <div className="space-y-6">
                  {/* Instrument Selection */}
                  <div>
                    <h3 className="text-white text-xl font-semibold mb-4">
                      Add or remove instruments from your track ({selectedInstruments.length} selected)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {instruments.map((instrument) => (
                        <div
                          key={instrument}
                          className={`relative rounded-lg p-4 cursor-pointer transition-all duration-300 shadow-md ${
                            selectedInstruments.includes(instrument)
                              ? "bg-[#f9d94c] text-black"
                              : "bg-white/20 text-white hover:bg-white/30 hover:shadow-lg"
                          }`}
                          onClick={() => toggleInstrument(instrument)}
                        >
                          <span className="font-medium">{instrument}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tempo, Use Case, Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <select
                      value={tempo}
                      onChange={(e) => setTempo(e.target.value)}
                      className="w-full p-4 rounded-2xl text-black bg-white/90 border-2 border-transparent focus:border-[#f9d94c] focus:outline-none text-lg"
                      disabled={loading}
                    >
                      <option value="">Select Tempo</option>
                      <option value="Slow">Slow</option>
                      <option value="Medium">Medium</option>
                      <option value="Fast">Fast</option>
                    </select>

                    <input
                      type="text"
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      placeholder="Use Case (e.g., Gaming montage)"
                      className="w-full p-4 rounded-2xl text-black bg-white/90 border-2 border-transparent focus:border-[#f9d94c] focus:outline-none text-lg"
                      disabled={loading}
                    />

                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => {
                        const val = Math.max(10, Math.min(900, e.target.value));
                        setDuration(val);
                      }}
                      placeholder="Duration in seconds (10-900)"
                      className="w-full p-4 rounded-2xl text-black bg-white/90 border-2 border-transparent focus:border-[#f9d94c] focus:outline-none text-lg"
                      disabled={loading}
                      min="10"
                      max="900"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="create-button group"
                    onClick={prevStep}
                  >
                    <span className="relative">Back</span>
                  </button>
                  <button
                    className="create-button group"
                    onClick={nextStep}
                    disabled={!tempo || !useCase || !duration}
                  >
                    <span className="relative">Next</span>
                    <img
                      src={arrow}
                      alt="arrow"
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Generate Music */}
            {step === 4 && (
              <div>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">
                  Step 4: Generate your music
                </h2>
                <div className="text-center mb-6">
                  <p className="text-white text-lg">
                    Your track: <span className="font-bold">{genre} {mood} track with {selectedInstruments.length > 0 ? selectedInstruments.join(" and ") : "various instruments"}, {tempo} tempo, for {useCase}, {duration} seconds</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    className="create-button group"
                    onClick={prevStep}
                  >
                    <span className="relative">Back</span>
                  </button>
                  <button
                    className="create-button group"
                    onClick={composeTrack}
                    disabled={loading}
                  >
                    <span className="relative">
                      {loading ? "Composing..." : "Create Music"}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f9d94c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </span>
                    <img
                      src={arrow}
                      alt="arrow"
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {(statusMessage || loading) && (
                  <div className="composition-status mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{statusMessage}</span>
                      <span className="text-[#f9d94c] font-bold">{compositionProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${compositionProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="error-message mt-6">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                {musicUrl && (
                  <div className="mockup-result mt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-[#f9d94c] rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                          />
                        </svg>
                      </div>
                      <div className="text-white text-xl font-bold">Your Generated Track</div>
                    </div>

                    <div className="audio-player">
                      <audio controls className="w-full custom-audio-player">
                        <source src={musicUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>

                    <div className="flex justify-end mt-6">
                      <a
                        href={musicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="create-button group"
                        download
                      >
                        <span className="relative">
                          Download Track
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f9d94c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </span>
                        <img
                          src={arrow}
                          alt="arrow"
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .create-button {
          background-color: white;
          color: black;
          height: 54px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: none;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .create-button:hover {
          background-color: #f9d94c;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(249, 217, 76, 0.2);
        }
        .create-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .mockup-result {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .composition-status {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 16px;
          backdrop-filter: blur(8px);
        }
        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #f9d94c;
          border-radius: 999px;
          transition: width 0.5s ease;
        }
        .error-message {
          display: flex;
          align-items: center;
          color: #ff4e4e;
          background: rgba(255, 78, 78, 0.1);
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 78, 78, 0.2);
        }
        .audio-player {
          background: rgba(0, 0, 0, 0.2);
          padding: 16px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .custom-audio-player {
          filter: hue-rotate(45deg);
        }
        @keyframes slideIn {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide {
          animation: slideIn 0.8s ease-out forwards;
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default TextToMusic;