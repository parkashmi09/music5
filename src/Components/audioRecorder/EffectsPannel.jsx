import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { FaPlay, FaStop, FaLightbulb, FaMusic } from 'react-icons/fa';

const EffectsPanel = ({ audioUrl, onEffectsChange }) => {
  const [reverb, setReverb] = useState(0.5);
  const [delay, setDelay] = useState(0.3);
  const [compression, setCompression] = useState(0);
  const [eq, setEq] = useState({
    low: 0,
    mid: 0,
    high: 0
  });
  const [autotune, setAutotune] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  
  // References to Tone.js effects
  const playerRef = useRef(null);
  const reverbRef = useRef(null);
  const delayRef = useRef(null);
  const compressorRef = useRef(null);
  const eqRef = useRef(null);
  const pitchShiftRef = useRef(null);
  const effectsInitialized = useRef(false);

  // Effect presets for common scenarios
  const presets = [
    { 
      name: "Clean Vocal", 
      settings: { 
        reverb: 0.2, 
        delay: 0.1, 
        compression: 4,
        eq: { low: -2, mid: 1, high: 3 },
        autotune: 0
      } 
    },
    { 
      name: "Warm Studio", 
      settings: { 
        reverb: 0.4, 
        delay: 0.2, 
        compression: 6,
        eq: { low: 2, mid: 0, high: -1 },
        autotune: 0
      } 
    },
    { 
      name: "Auto-Tune Effect", 
      settings: { 
        reverb: 0.3, 
        delay: 0.3, 
        compression: 3,
        eq: { low: -1, mid: 0, high: 2 },
        autotune: 0.8
      } 
    },
    { 
      name: "Spacious", 
      settings: { 
        reverb: 0.8, 
        delay: 0.5, 
        compression: 2,
        eq: { low: 0, mid: -2, high: 1 },
        autotune: 0
      } 
    }
  ];

  // Safely dispose of an effect if it exists
  const safeDispose = (effectRef) => {
    if (effectRef.current) {
      try {
        effectRef.current.dispose();
        effectRef.current = null;
      } catch (err) {
        console.error("Error disposing effect:", err);
      }
    }
  };

  // Initialize effects when audioUrl changes
  useEffect(() => {
    if (!audioUrl) {
      setError("No audio URL provided");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Clean up previous effects
    if (playerRef.current) {
      try {
        if (playerRef.current.state === "started") {
          playerRef.current.stop();
        }
        playerRef.current.dispose();
        playerRef.current = null;
      } catch (err) {
        console.error("Error cleaning up player:", err);
      }
    }
    
    // Clean up all effects
    safeDispose(reverbRef);
    safeDispose(delayRef);
    safeDispose(compressorRef);
    safeDispose(eqRef);
    safeDispose(pitchShiftRef);
    
    effectsInitialized.current = false;
    
    // We'll initialize the player first, but delay connecting effects
    // until the user actually wants to preview
    try {
      // Initialize player with the audio URL
      playerRef.current = new Tone.Player({
        url: audioUrl,
        onload: () => {
          console.log("Audio loaded successfully");
          setIsLoading(false);
          // Generate AI suggestion based on audio characteristics
          generateAiSuggestion();
        },
        onerror: (e) => {
          console.error("Error loading audio:", e);
          setError("Failed to load audio. Please try again.");
          setIsLoading(false);
        }
      }).toDestination(); // Connect directly to destination for now
      
    } catch (err) {
      console.error("Error setting up player:", err);
      setError("Failed to set up audio player. Please try again.");
      setIsLoading(false);
    }
    
    return () => {
      // Clean up on unmount
      if (playerRef.current) {
        try {
          if (playerRef.current.state === "started") {
            playerRef.current.stop();
          }
          playerRef.current.dispose();
        } catch (err) {
          console.error("Error disposing player on unmount:", err);
        }
      }
      safeDispose(reverbRef);
      safeDispose(delayRef);
      safeDispose(compressorRef);
      safeDispose(eqRef);
      safeDispose(pitchShiftRef);
    };
  }, [audioUrl]);

  // Update effects when settings change
  useEffect(() => {
    if (!playerRef.current || !effectsInitialized.current) return;
    
    try {
      // Update reverb
      if (reverbRef.current) {
        reverbRef.current.decay = reverb * 5; // Scale to a reasonable decay time
      }
      
      // Update delay
      if (delayRef.current) {
        delayRef.current.delayTime.value = delay;
      }
      
      // Update compressor
      if (compressorRef.current && compression > 0) {
        compressorRef.current.ratio.value = compression;
      }
      
      // Update EQ
      if (eqRef.current) {
        eqRef.current.low.value = eq.low;
        eqRef.current.mid.value = eq.mid;
        eqRef.current.high.value = eq.high;
      }
      
      // Update pitch shift (autotune)
      if (pitchShiftRef.current) {
        pitchShiftRef.current.pitch = autotune * 12; // Scale from 0-1 to semitones
      }
      
      // Notify parent component if callback provided
      if (onEffectsChange) {
        onEffectsChange({
          reverb,
          delay,
          compression,
          eq,
          autotune
        });
      }
    } catch (err) {
      console.error("Error updating effects:", err);
      setError("Failed to update audio effects");
    }
  }, [reverb, delay, compression, eq, autotune, onEffectsChange]);

  // Initialize effects chain for playback
  const initializeEffectsChain = async () => {
    if (effectsInitialized.current) return true;
    
    try {
      // Start audio context
      await Tone.start();
      
      // Disconnect player from destination
      if (playerRef.current) {
        playerRef.current.disconnect();
      } else {
        return false;
      }
      
      // Create effects chain
      reverbRef.current = new Tone.Reverb({
        decay: reverb * 5,
        wet: 0.5
      }).toDestination();
      
      delayRef.current = new Tone.FeedbackDelay({
        delayTime: delay,
        feedback: 0.4,
        wet: 0.5
      }).connect(reverbRef.current);
      
      compressorRef.current = new Tone.Compressor({
        threshold: -24,
        ratio: compression || 1,
        attack: 0.003,
        release: 0.25
      }).connect(delayRef.current);
      
      eqRef.current = new Tone.EQ3({
        low: eq.low,
        mid: eq.mid,
        high: eq.high
      }).connect(compressorRef.current);
      
      pitchShiftRef.current = new Tone.PitchShift({
        pitch: autotune * 12,
        windowSize: 0.1,
        delayTime: 0
      }).connect(eqRef.current);
      
      // Connect player to effects chain
      playerRef.current.connect(pitchShiftRef.current);
      
      effectsInitialized.current = true;
      return true;
    } catch (err) {
      console.error("Error initializing effects chain:", err);
      setError("Failed to initialize audio effects");
      return false;
    }
  };

  const playWithEffects = async () => {
    if (isLoading || !audioUrl) return;
    
    if (isPlaying) {
      // Stop playback
      try {
        if (playerRef.current && playerRef.current.state === "started") {
          playerRef.current.stop();
        }
        setIsPlaying(false);
      } catch (err) {
        console.error("Error stopping playback:", err);
        setError("Failed to stop playback");
      }
      return;
    }
    
    try {
      // Initialize effects chain if needed
      const effectsReady = await initializeEffectsChain();
      if (!effectsReady) {
        setError("Failed to initialize effects. Please try again.");
        return;
      }
      
      // Start playback
      if (playerRef.current) {
        if (playerRef.current.loaded) {
          playerRef.current.start();
          setIsPlaying(true);
          
          // Set up listener for when playback ends
          playerRef.current.onstop = () => {
            setIsPlaying(false);
          };
        } else {
          setError("Audio is still loading. Please wait.");
        }
      } else {
        setError("Audio player not initialized");
      }
    } catch (err) {
      console.error("Error playing with effects:", err);
      setError("Failed to play audio with effects");
    }
  };

  const applyPreset = (preset) => {
    setReverb(preset.settings.reverb);
    setDelay(preset.settings.delay);
    setCompression(preset.settings.compression);
    setEq(preset.settings.eq);
    setAutotune(preset.settings.autotune);
    setActivePreset(preset.name);
  };

  // Simulate AI suggestion based on audio characteristics
  const generateAiSuggestion = () => {
    const suggestions = [
      "Try adding more reverb for a spacious sound",
      "Reduce the low frequencies to make vocals clearer",
      "Add a touch of auto-tune for a modern effect",
      "Increase compression to make the sound more consistent",
      "Try the 'Warm Studio' preset for a professional sound"
    ];
    
    // Randomly select a suggestion for now
    // In a real implementation, this would analyze the audio
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(randomSuggestion);
  };

  return (
    <div className="effects-panel">
      <div className="effects-panel-header">
        <h3 className="effects-panel-title">Audio Effects</h3>
      </div>
      
      <div className="effects-panel-body custom-scrollbar">
        {/* AI Suggestion */}
        {aiSuggestion && (
          <div className="effects-panel-suggestion">
            <FaLightbulb className="effects-panel-suggestion-icon" size={18} />
            <p className="effects-panel-suggestion-text">
              {aiSuggestion}
            </p>
          </div>
        )}
        
        {/* Presets */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">Effect Presets</label>
          <div className="effects-panel-presets">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={`effects-panel-preset ${activePreset === preset.name ? 'active' : ''}`}
              >
                {preset.name}
              </button>
            ))}
            <button
              onClick={generateAiSuggestion}
              className="effects-panel-preset"
              title="Get AI suggestion"
            >
              <FaMusic className="mr-1" size={10} /> AI Suggest
            </button>
          </div>
        </div>
        
        {/* EQ Controls */}
        <div className="effects-control">
          <div className="effects-control-header">
            <label className="effects-control-label">Equalizer</label>
          </div>
          <div className="effects-eq-grid">
            <div className="effects-eq-slider">
              <label className="effects-eq-label">Low: {eq.low} dB</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eq.low}
                onChange={(e) => setEq({...eq, low: parseInt(e.target.value)})}
                className="studio-range w-full"
              />
            </div>
            <div className="effects-eq-slider">
              <label className="effects-eq-label">Mid: {eq.mid} dB</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eq.mid}
                onChange={(e) => setEq({...eq, mid: parseInt(e.target.value)})}
                className="studio-range w-full"
              />
            </div>
            <div className="effects-eq-slider">
              <label className="effects-eq-label">High: {eq.high} dB</label>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={eq.high}
                onChange={(e) => setEq({...eq, high: parseInt(e.target.value)})}
                className="studio-range w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Compression */}
        <div className="effects-control">
          <div className="effects-control-header">
            <label className="effects-control-label">Compression</label>
            <span className="effects-control-value">{compression}:1</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={compression}
            onChange={(e) => setCompression(parseInt(e.target.value))}
            className="studio-range w-full"
          />
        </div>
        
        {/* Reverb */}
        <div className="effects-control">
          <div className="effects-control-header">
            <label className="effects-control-label">Reverb</label>
            <span className="effects-control-value">{reverb.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={reverb}
            onChange={(e) => setReverb(parseFloat(e.target.value))}
            className="studio-range w-full"
          />
        </div>
        
        {/* Delay */}
        <div className="effects-control">
          <div className="effects-control-header">
            <label className="effects-control-label">Delay</label>
            <span className="effects-control-value">{delay.toFixed(1)}s</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={delay}
            onChange={(e) => setDelay(parseFloat(e.target.value))}
            className="studio-range w-full"
          />
        </div>
        
        {/* Auto-tune */}
        <div className="effects-control">
          <div className="effects-control-header">
            <label className="effects-control-label">Auto-tune</label>
            <span className="effects-control-value">{(autotune * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={autotune}
            onChange={(e) => setAutotune(parseFloat(e.target.value))}
            className="studio-range w-full"
          />
        </div>
        
        {/* Play Button */}
        <button
          onClick={playWithEffects}
          disabled={isLoading || !audioUrl}
          className={`studio-btn w-full py-2.5 flex items-center justify-center ${
            isPlaying 
              ? 'studio-btn-danger' 
              : 'studio-btn-purple'
          } ${
            isLoading || !audioUrl ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : isPlaying ? (
            <>
              <FaStop className="mr-2" size={16} />
              Stop
            </>
          ) : (
            <>
              <FaPlay className="mr-2" size={16} />
              Preview Effects
            </>
          )}
        </button>
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EffectsPanel;