import React, { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import bgimage from "../assets/record/bgimage.png";
import arrow from "../assets/create/arrow.png";

function RecordMusic() {
  const sectionRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [tracks, setTracks] = useState([]); // Array of recorded tracks
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(new AudioContext());
  const playersRef = useRef([]); // Tone.js Players for multi-track playback

  // Intersection Observer for slide-in animation
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

  // Start recording audio
  const startRecording = async () => {
    try {
      await Tone.start(); // Initialize Tone.js audio context
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        stream.getTracks().forEach((track) => track.stop());

        // Add to tracks
        const newTrack = {
          id: Date.now(),
          url: audioUrl,
          volume: 0, // Default volume in dB (0 is full volume)
          pan: 0, // Default pan (-1 to 1)
          muted: false,
          player: new Tone.Player(audioUrl).toDestination(),
        };
        setTracks((prev) => [...prev, newTrack]);
        playersRef.current.push(newTrack.player);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Play all tracks
  const playAllTracks = () => {
    Tone.Transport.stop();
    playersRef.current.forEach((player) => {
      player.stop();
      if (!player.mute) {
        player.start();
      }
    });
    Tone.Transport.start();
  };

  // Stop all tracks
  const stopAllTracks = () => {
    Tone.Transport.stop();
    playersRef.current.forEach((player) => player.stop());
  };

  // Update track volume
  const updateVolume = (trackId, value) => {
    const updatedTracks = tracks.map((track) => {
      if (track.id === trackId) {
        track.player.volume.value = value;
        return { ...track, volume: value };
      }
      return track;
    });
    setTracks(updatedTracks);
  };

  // Update track pan
  const updatePan = (trackId, value) => {
    const updatedTracks = tracks.map((track) => {
      if (track.id === trackId) {
        track.player.pan.value = value;
        return { ...track, pan: value };
      }
      return track;
    });
    setTracks(updatedTracks);
  };

  // Toggle mute
  const toggleMute = (trackId) => {
    const updatedTracks = tracks.map((track) => {
      if (track.id === trackId) {
        track.player.mute = !track.muted;
        return { ...track, muted: !track.muted };
      }
      return track;
    });
    setTracks(updatedTracks);
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
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
            height: 48px;
            padding: 0 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            border: none;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .create-button:hover {
            background-color: #f9d94c;
          }
          .create-button img {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            transition: transform 0.5s ease-in-out;
          }
          .create-button:hover img {
            transform: translateX(4px);
          }
          .create-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          .recording-status {
            color: white;
            font-family: 'Orbitron', sans-serif;
            margin-top: 10px;
          }
          .tracks-container {
            margin-top: 20px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
          }
          .track {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .track-controls label {
            color: white;
            font-family: 'Orbitron', sans-serif;
            margin-right: 5px;
          }
          .track-controls input[type="range"] {
            width: 100px;
          }
          .timeline {
            height: 100px;
            background: rgba(0, 0, 0, 0.5);
            margin-top: 20px;
            border-radius: 8px;
          }
        `}
      </style>
      <div
        className="relative min-h-[100vh] h-auto w-full lg:px-20 py-8 overflow-y-auto"
        ref={sectionRef}
      >
        <img
          src={bgimage}
          alt="background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative w-full h-full flex flex-col justify-center z-10">
          <div className="space-y-4">
            <h1 className="text-white font-bold font-['Orbitron']">
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                Your Web-Based DAW
              </p>
              <p className="lg:text-6xl text-2xl leading-normal animate-slide">
                Record & Mix Tracks
              </p>
            </h1>

            {/* Recording Controls */}
            <div className="animate-slide">
              {!recording ? (
                <button className="create-button" onClick={startRecording}>
                  <span>Start Recording</span>
                  <img src={arrow} alt="arrow" />
                </button>
              ) : (
                <button className="create-button" onClick={stopRecording}>
                  <span>Stop Recording</span>
                </button>
              )}
              <div className="recording-status">
                {recording ? "Recording..." : tracks.length > 0 ? "Tracks Ready" : "Not Recording"}
              </div>

              {/* Playback Controls */}
              {tracks.length > 0 && (
                <div className="animate-slide flex gap-4 mt-4">
                  <button className="create-button" onClick={playAllTracks}>
                    <span>Play All</span>
                  </button>
                  <button className="create-button" onClick={stopAllTracks}>
                    <span>Stop All</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tracks Mixing Panel */}
          {tracks.length > 0 && (
            <div className="tracks-container animate-slide">
              {tracks.map((track) => (
                <div key={track.id} className="track">
                  <button
                    className="create-button"
                    onClick={() => toggleMute(track.id)}
                    style={{ backgroundColor: track.muted ? "#ff4c4c" : "white" }}
                  >
                    {track.muted ? "Unmute" : "Mute"}
                  </button>
                  <div className="track-controls">
                    <label>Volume:</label>
                    <input
                      type="range"
                      min="-60"
                      max="0"
                      value={track.volume}
                      onChange={(e) => updateVolume(track.id, parseFloat(e.target.value))}
                    />
                    <label>Pan:</label>
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.1"
                      value={track.pan}
                      onChange={(e) => updatePan(track.id, parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Simple Timeline (Placeholder) */}
          <div className="timeline animate-slide">
            <p className="text-white font-['Orbitron'] p-4">
              Timeline (Drag tracks here - Coming Soon)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecordMusic;