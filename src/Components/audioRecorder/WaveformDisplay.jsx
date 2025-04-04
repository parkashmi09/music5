import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import * as Tone from 'tone';

const WaveformDisplay = ({ 
  audioUrl, 
  isPlaying, 
  onPlayPause, 
  trackId, 
  color = 'rgb(124, 58, 237)',
  hasEffects = false,
  isSoloed = false,
  isMuted = false,
  effects = null
}) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const tonePlayerRef = useRef(null);
  const effectsChainRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localIsPlaying, setLocalIsPlaying] = useState(false);

  // Initialize Tone.js player and effects
  useEffect(() => {
    if (!audioUrl) return;

    const initTone = async () => {
      try {
        await Tone.start();
        
        // Clean up previous player and effects
        if (tonePlayerRef.current) {
          tonePlayerRef.current.stop();
          tonePlayerRef.current.dispose();
        }
        
        if (effectsChainRef.current) {
          Object.values(effectsChainRef.current).forEach(effect => {
            if (effect && typeof effect.dispose === 'function') {
              effect.dispose();
            }
          });
        }
        
        // Create new player
        const player = new Tone.Player({
          url: audioUrl,
          onload: () => console.log(`Tone.js loaded track ${trackId}`),
          onerror: (err) => console.error(`Error loading track in Tone.js: ${err}`)
        });
        
        // Create effects if enabled
        if (hasEffects && effects) {
          const reverb = new Tone.Reverb({
            decay: (effects.reverb || 0.2) * 5,
            wet: effects.reverb > 0 ? 0.5 : 0
          });
          
          const delay = new Tone.FeedbackDelay({
            delayTime: effects.delay || 0.1,
            feedback: 0.4,
            wet: effects.delay > 0 ? 0.5 : 0
          });
          
          const compressor = new Tone.Compressor({
            threshold: -24,
            ratio: effects.compression || 4,
            attack: 0.003,
            release: 0.25
          });
          
          const eq = new Tone.EQ3({
            low: effects.eq?.low || 0,
            mid: effects.eq?.mid || 0,
            high: effects.eq?.high || 0
          });
          
          const pitchShift = new Tone.PitchShift({
            pitch: (effects.autotune || 0) * 12,
            windowSize: 0.1,
            delayTime: 0
          });
          
          // Connect effects chain
          await reverb.generate();
          player.connect(pitchShift);
          pitchShift.connect(eq);
          eq.connect(compressor);
          compressor.connect(delay);
          delay.connect(reverb);
          reverb.toDestination();
          
          // Store the effects chain
          effectsChainRef.current = {
            reverb,
            delay,
            compressor,
            eq,
            pitchShift
          };
        } else {
          // No effects, connect directly to output
          player.toDestination();
        }
        
        // Store the player
        tonePlayerRef.current = player;
      } catch (err) {
        console.error("Error initializing Tone.js:", err);
        setError("Failed to initialize audio engine");
      }
    };
    
    initTone();
    
    return () => {
      if (tonePlayerRef.current) {
        tonePlayerRef.current.stop();
        tonePlayerRef.current.dispose();
      }
      
      if (effectsChainRef.current) {
        Object.values(effectsChainRef.current).forEach(effect => {
          if (effect && typeof effect.dispose === 'function') {
            effect.dispose();
          }
        });
      }
    };
  }, [audioUrl, hasEffects, effects, trackId]);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!audioUrl) return;

    try {
      // Clean up previous instance
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      // Create new WaveSurfer instance
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: color,
        progressColor: hasEffects ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)',
        cursorColor: 'rgba(255, 255, 255, 0.5)',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 60,
        responsive: true,
        normalize: true,
        backend: 'WebAudio',
        minPxPerSec: 50, // Better resolution for waveform
        hideScrollbar: false,
        interact: true,
        fillParent: true
      });

      // Set up event listeners
      wavesurfer.on('ready', () => {
        setDuration(wavesurfer.getDuration());
        setLoaded(true);
        setError(null);
      });

      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
        
        // Update Tone.js player position if it's playing
        if (tonePlayerRef.current && tonePlayerRef.current.state === "started") {
          // Tone.js uses seconds for seeking
          tonePlayerRef.current.seek(wavesurfer.getCurrentTime());
        }
      });

      wavesurfer.on('seek', (position) => {
        setCurrentTime(wavesurfer.getCurrentTime());
        
        // Update Tone.js player position
        if (tonePlayerRef.current) {
          const seekTime = position * wavesurfer.getDuration();
          tonePlayerRef.current.seek(seekTime);
        }
      });

      wavesurfer.on('error', (err) => {
        console.error('WaveSurfer error:', err);
        setError('Failed to load audio waveform');
      });

      // Load audio
      wavesurfer.load(audioUrl);
      
      // Store the instance
      wavesurferRef.current = wavesurfer;

      return () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.destroy();
        }
      };
    } catch (err) {
      console.error('Error initializing WaveSurfer:', err);
      setError('Failed to initialize waveform display');
    }
  }, [audioUrl, color, hasEffects]);

  // Update waveform colors when effects state changes
  useEffect(() => {
    if (!wavesurferRef.current || !loaded) return;
    
    try {
      wavesurferRef.current.setOptions({
        waveColor: color,
        progressColor: hasEffects ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)'
      });
    } catch (err) {
      console.error('Error updating waveform colors:', err);
    }
  }, [color, hasEffects, loaded]);

  // Handle play/pause state changes from parent component
  useEffect(() => {
    if (!wavesurferRef.current || !loaded || !tonePlayerRef.current) return;

    try {
      if (isPlaying && !isMuted) {
        wavesurferRef.current.play();
        setLocalIsPlaying(true);
        
        // Play with Tone.js
        if (tonePlayerRef.current.state !== "started") {
          tonePlayerRef.current.start();
        }
      } else {
        wavesurferRef.current.pause();
        setLocalIsPlaying(false);
        
        // Pause with Tone.js
        if (tonePlayerRef.current.state === "started") {
          tonePlayerRef.current.stop();
        }
      }
    } catch (err) {
      console.error('Error controlling playback:', err);
    }
  }, [isPlaying, loaded, isMuted]);

  // Format time in MM:SS format
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle local play/pause
  const handleLocalPlayPause = () => {
    if (!wavesurferRef.current || !loaded || !tonePlayerRef.current) return;
    
    try {
      if (localIsPlaying) {
        wavesurferRef.current.pause();
        if (tonePlayerRef.current.state === "started") {
          tonePlayerRef.current.stop();
        }
      } else {
        wavesurferRef.current.play();
        if (tonePlayerRef.current.state !== "started") {
          tonePlayerRef.current.start();
        }
      }
      
      setLocalIsPlaying(!localIsPlaying);
      
      // Also notify parent component
      if (onPlayPause) {
        onPlayPause(trackId);
      }
    } catch (err) {
      console.error('Error handling local play/pause:', err);
    }
  };

  return (
    <div className="waveform-container">
      {error && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-md p-2 mb-2">
          <p className="text-red-300 text-xs">{error}</p>
        </div>
      )}
      
      <div 
        ref={waveformRef} 
        className={`w-full cursor-pointer rounded-md overflow-hidden transition-opacity duration-200 ${isMuted ? 'opacity-40' : isHovered ? 'opacity-100' : 'opacity-90'}`}
        onClick={handleLocalPlayPause}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      <div className="waveform-controls">
        <span className="waveform-time">{formatTime(currentTime)}</span>
        <div className="flex items-center">
          {hasEffects && (
            <span className="text-purple-400 text-xs mr-2">
              FX
            </span>
          )}
          {isSoloed && (
            <span className="text-yellow-400 text-xs mr-2">
              Solo
            </span>
          )}
          <span className="waveform-time">{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* AI Assistant Effects Suggestions */}
      {loaded && (
        <div className="ai-analysis-panel">
          <div className="ai-analysis-header">
            <h4 className="ai-analysis-title">AI Assistant</h4>
            <span className="ai-analysis-status">
              {hasEffects ? 'Effects Applied' : 'Suggested Effects'}
            </span>
          </div>
          
          {!hasEffects ? (
            <div className="space-y-1">
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">Recommended Reverb</span>
                <span className="ai-analysis-value">0.3 (Medium Room)</span>
              </div>
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">Recommended EQ</span>
                <span className="ai-analysis-value">+2dB High, -1dB Low</span>
              </div>
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">Recommended Compression</span>
                <span className="ai-analysis-value">4:1 Ratio</span>
              </div>
              
              <button 
                className="ai-apply-button"
                onClick={() => {
                  if (onPlayPause && trackId) {
                    // Apply recommended effects
                    if (effects) {
                      const updatedEffects = {
                        ...effects,
                        reverb: 0.3,
                        compression: 4,
                        eq: { low: -1, mid: 0, high: 2 },
                        enabled: true
                      };
                      
                      // Notify parent to update effects
                      if (window.applyAiSuggestedEffects) {
                        window.applyAiSuggestedEffects(trackId, updatedEffects);
                      }
                    }
                  }
                }}
              >
                Apply AI Suggested Effects
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">Current Effects</span>
                <span className="ai-analysis-value">
                  {effects?.reverb > 0 ? 'Reverb, ' : ''}
                  {effects?.delay > 0 ? 'Delay, ' : ''}
                  {effects?.compression > 1 ? 'Compression, ' : ''}
                  {(effects?.eq?.low !== 0 || effects?.eq?.mid !== 0 || effects?.eq?.high !== 0) ? 'EQ, ' : ''}
                  {effects?.autotune > 0 ? 'Auto-Tune' : ''}
                </span>
              </div>
              
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">AI Analysis</span>
                <span className="ai-analysis-status">Optimal Settings Applied</span>
              </div>
              
              <div className="ai-analysis-item">
                <span className="ai-analysis-label">Sound Quality</span>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WaveformDisplay;