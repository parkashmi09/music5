import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import AudioRecorder from "../Components/audioRecorder/AudioRecorder";
import SampleBrowser from "../Components/audioRecorder/SampleBrowser";
import EffectsPanel from "../Components/audioRecorder/EffectsPannel";
import MixingPanel from "../Components/audioRecorder/MixingPannel";
import WaveformDisplay from "../Components/audioRecorder/WaveformDisplay";

const SoundRecorder = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [preservePitch, setPreservePitch] = useState(true);
  const [showAddTrackMenu, setShowAddTrackMenu] = useState(false);
  const [recordingInput, setRecordingInput] = useState(""); // Initialize as empty string
  const [audioDevices, setAudioDevices] = useState([]);
  const [recordingWaveformData, setRecordingWaveformData] = useState(null); // Store waveform data instead of canvas
  const [transportTime, setTransportTime] = useState("00:00:00");

  // Track effects state
  const [trackEffects, setTrackEffects] = useState({});
  const effectsChainRefs = useRef({});
  const playerRefs = useRef({});
  const transportInterval = useRef(null);
  const mediaRecorderRef = useRef(null); // Reference for mediaRecorder

  // Clean up on unmount
  useEffect(() => {
    return () => {
      Object.values(playerRefs.current).forEach(player => {
        if (player) {
          try {
            player.stop();
            player.dispose();
          } catch (err) {
            console.error("Error disposing player:", err);
          }
        }
      });
      Object.values(effectsChainRefs.current).forEach(chain => {
        if (chain) {
          Object.values(chain).forEach(effect => {
            if (effect && typeof effect.dispose === 'function') {
              effect.dispose();
            }
          });
        }
      });
      if (transportInterval.current) clearInterval(transportInterval.current);
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    };
  }, []);

  // Initialize audio devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        setAudioDevices(audioInputs);
        if (audioInputs.length > 0) setRecordingInput(audioInputs[0].deviceId);
      } catch (err) {
        console.error("Error enumerating devices:", err);
        setError("Failed to enumerate audio devices");
      }
    };
    getDevices();
  }, []);

  // Update effects for new tracks
  useEffect(() => {
    tracks.forEach(track => {
      if (!trackEffects[track.id]) {
        setTrackEffects(prev => ({
          ...prev,
          [track.id]: {
            reverb: 0.2,
            delay: 0.1,
            compression: 4,
            eq: { low: 0, mid: 0, high: 0 },
            autotune: 0,
            enabled: false
          }
        }));
      }
    });

    window.applyAiSuggestedEffects = (trackId, suggestedEffects) => {
      if (trackId && suggestedEffects) {
        setTrackEffects(prev => ({
          ...prev,
          [trackId]: { ...suggestedEffects, enabled: true }
        }));
        if (playerRefs.current[trackId] && playerRefs.current[trackId].state === "started") {
          updateLiveEffects(trackId);
        }
      }
    };

    return () => delete window.applyAiSuggestedEffects;
  }, [tracks]);

  // Update transport time
  useEffect(() => {
    if (isPlaying || isRecording) {
      let startTime = Date.now() - (currentTime * 1000);
      transportInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor((elapsed / 1000) % 60);
        const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
        setTransportTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else if (transportInterval.current) {
      clearInterval(transportInterval.current);
      setTransportTime("00:00:00");
    }
    return () => {
      if (transportInterval.current) clearInterval(transportInterval.current);
    };
  }, [isPlaying, isRecording, currentTime]);

  const handleAudioUploaded = (audioData) => {
    setSelectedAudio(audioData);
    setError(null);
    const trackId = Date.now();
    const newTrack = {
      id: trackId,
      name: audioData.filename || `Track ${tracks.length + 1}`,
      url: audioData.localUrl || audioData.url,
      volume: 0,
      pan: 0,
      muted: false,
      soloed: false,
      effects: [],
    };
    setTrackEffects(prev => ({
      ...prev,
      [trackId]: {
        reverb: 0.2,
        delay: 0.1,
        compression: 4,
        eq: { low: 0, mid: 0, high: 0 },
        autotune: 0,
        enabled: false
      }
    }));
    setTracks(prev => [...prev, newTrack]);
    setActiveTrackId(trackId);
  };

  const handleSampleSelect = (sample) => {
    if (!sample || !sample.url) {
      setError("Invalid sample data received");
      return;
    }
    setError(null);
    const trackId = Date.now();
    const newTrack = {
      id: trackId,
      name: sample.name || `Sample ${tracks.length + 1}`,
      url: sample.url,
      volume: 0,
      pan: 0,
      muted: false,
      soloed: false,
      effects: [],
    };
    setTrackEffects(prev => ({
      ...prev,
      [trackId]: {
        reverb: 0.2,
        delay: 0.1,
        compression: 4,
        eq: { low: 0, mid: 0, high: 0 },
        autotune: 0,
        enabled: false
      }
    }));
    setTracks(prev => [...prev, newTrack]);
    setActiveTrackId(trackId);
  };

  const createEffectsChain = async (trackId) => {
    if (!trackId || !trackEffects[trackId]) return null;
    try {
      if (effectsChainRefs.current[trackId]) {
        Object.values(effectsChainRefs.current[trackId]).forEach(effect => {
          if (effect && typeof effect.dispose === 'function') effect.dispose();
        });
        effectsChainRefs.current[trackId] = null;
      }
      const effects = trackEffects[trackId];
      const reverb = new Tone.Reverb({ decay: effects.reverb * 5, wet: effects.reverb > 0 ? 0.5 : 0 });
      const delay = new Tone.FeedbackDelay({ delayTime: effects.delay, feedback: 0.4, wet: effects.delay > 0 ? 0.5 : 0 });
      const compressor = new Tone.Compressor({ threshold: -24, ratio: effects.compression || 1, attack: 0.003, release: 0.25 });
      const eq = new Tone.EQ3({ low: effects.eq.low, mid: effects.eq.mid, high: effects.eq.high });
      const pitchShift = new Tone.PitchShift({ pitch: effects.autotune * 12, windowSize: 0.1, delayTime: 0 });
      await reverb.generate();
      pitchShift.connect(eq);
      eq.connect(compressor);
      compressor.connect(delay);
      delay.connect(reverb);
      reverb.toDestination();
      effectsChainRefs.current[trackId] = { reverb, delay, compressor, eq, pitchShift, input: pitchShift, output: reverb };
      return effectsChainRefs.current[trackId];
    } catch (err) {
      console.error("Error creating effects chain:", err);
      setError(`Failed to create effects for track: ${err.message}`);
      return null;
    }
  };

  const createPlayer = async (track) => {
    try {
      if (playerRefs.current[track.id]) {
        playerRefs.current[track.id].stop();
        playerRefs.current[track.id].dispose();
        playerRefs.current[track.id] = null;
      }
      const player = new Tone.Player({
        url: track.url,
        onload: () => console.log(`Track ${track.id} loaded`),
        onerror: (err) => {
          console.error(`Error loading track ${track.id}:`, err);
          setError(`Failed to load audio for "${track.name}"`);
        },
        playbackRate: playbackRate
      });
      player.volume.value = track.volume;
      player.pan.value = track.pan;
      player.mute = track.muted;
      const effects = trackEffects[track.id];
      if (effects && effects.enabled) {
        const effectsChain = await createEffectsChain(track.id);
        if (effectsChain) player.connect(effectsChain.input);
        else player.toDestination();
      } else {
        player.toDestination();
      }
      playerRefs.current[track.id] = player;
      return player;
    } catch (err) {
      console.error("Error creating player:", err);
      setError(`Failed to create player for "${track.name}"`);
      return null;
    }
  };

  const playAllTracks = async () => {
    if (isPlaying) {
      Object.values(playerRefs.current).forEach(player => {
        if (player && player.state === "started") player.stop();
      });
      setIsPlaying(false);
      return;
    }
    if (tracks.length === 0) {
      setError("No tracks to play");
      return;
    }
    setError(null);
    try {
      await Tone.start();
      const playPromises = tracks.filter(track => !track.muted).map(async track => {
        let player = playerRefs.current[track.id];
        if (!player) {
          player = await createPlayer(track);
          if (!player) return;
        }
        player.playbackRate.value = playbackRate;
        if (player.loaded) player.start();
        else {
          await player.load();
          player.start();
        }
      });
      await Promise.all(playPromises);
      setIsPlaying(true);
    } catch (err) {
      console.error("Error starting audio context:", err);
      setError("Failed to start audio playback. Please try again.");
    }
  };

  const stopAllTracks = () => {
    try {
      Object.values(playerRefs.current).forEach(player => {
        if (player && player.state === "started") player.stop();
      });
      setIsPlaying(false);
      setCurrentTime(0);
    } catch (err) {
      console.error("Error stopping tracks:", err);
      setError("Failed to stop playback");
    }
  };

  const updateVolume = (trackId, value) => {
    setTracks(prev => prev.map(track => (track.id === trackId ? { ...track, volume: value } : track)));
    if (playerRefs.current[trackId]) playerRefs.current[trackId].volume.value = value;
  };

  const updatePan = (trackId, value) => {
    setTracks(prev => prev.map(track => (track.id === trackId ? { ...track, pan: value } : track)));
    if (playerRefs.current[trackId]) playerRefs.current[trackId].pan.value = value;
  };

  const toggleMute = (trackId) => {
    setTracks(prev => prev.map(track => (track.id === trackId ? { ...track, muted: !track.muted } : track)));
    if (playerRefs.current[trackId]) playerRefs.current[trackId].mute = !tracks.find(t => t.id === trackId).muted;
  };

  const toggleSolo = (trackId) => {
    const updatedTracks = tracks.map(track => (track.id === trackId ? { ...track, soloed: !track.soloed } : track));
    setTracks(updatedTracks);
    const anySoloed = updatedTracks.some(track => track.soloed);
    updatedTracks.forEach(track => {
      if (playerRefs.current[track.id]) playerRefs.current[track.id].mute = anySoloed ? !track.soloed : !track.muted;
    });
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    Object.entries(playerRefs.current).forEach(([id, player]) => {
      if (player) player.playbackRate.value = rate;
    });
  };

  const handleTrackPlayPause = (trackId) => {
    if (!trackId) return;
    const player = playerRefs.current[trackId];
    if (!player) return;
    if (player.state === "started") {
      player.stop();
      setIsPlaying(false);
    } else {
      Tone.start().then(() => {
        player.start();
        setIsPlaying(true);
      }).catch(err => {
        console.error("Error starting audio:", err);
        setError("Failed to start audio playback");
      });
    }
  };

  const deleteTrack = (trackId) => {
    if (playerRefs.current[trackId]) {
      if (playerRefs.current[trackId].state === "started") playerRefs.current[trackId].stop();
      playerRefs.current[trackId].dispose();
      delete playerRefs.current[trackId];
    }
    if (effectsChainRefs.current[trackId]) {
      Object.values(effectsChainRefs.current[trackId]).forEach(effect => {
        if (effect && typeof effect.dispose === 'function') effect.dispose();
      });
      delete effectsChainRefs.current[trackId];
    }
    setTracks(prev => prev.filter(track => track.id !== trackId));
    setTrackEffects(prev => {
      const newEffects = { ...prev };
      delete newEffects[trackId];
      return newEffects;
    });
    if (activeTrackId === trackId) setActiveTrackId(null);
  };

  const updateTrackEffect = (trackId, effectType, value) => {
    if (!trackId || !trackEffects[trackId]) return;
    setTrackEffects(prev => {
      const updatedEffects = { ...prev };
      if (effectType === 'eq') {
        updatedEffects[trackId] = { ...updatedEffects[trackId], eq: { ...updatedEffects[trackId].eq, ...value } };
      } else {
        updatedEffects[trackId] = { ...updatedEffects[trackId], [effectType]: value };
      }
      return updatedEffects;
    });
    if (playerRefs.current[trackId] && playerRefs.current[trackId].state === "started") updateLiveEffects(trackId);
  };

  const updateLiveEffects = async (trackId) => {
    if (!trackId || !playerRefs.current[trackId]) return;
    try {
      const player = playerRefs.current[trackId];
      const effects = trackEffects[trackId];
      const chain = effectsChainRefs.current[trackId];
      if (!chain) {
        if (effects.enabled) {
          player.disconnect();
          const newChain = await createEffectsChain(trackId);
          if (newChain) player.connect(newChain.input);
          else player.toDestination();
        }
        return;
      }
      if (chain.reverb) {
        chain.reverb.decay = effects.reverb * 5;
        chain.reverb.wet.value = effects.reverb > 0 ? 0.5 : 0;
      }
      if (chain.delay) {
        chain.delay.delayTime.value = effects.delay;
        chain.delay.wet.value = effects.delay > 0 ? 0.5 : 0;
      }
      if (chain.compressor && effects.compression > 0) chain.compressor.ratio.value = effects.compression;
      if (chain.eq) {
        chain.eq.low.value = effects.eq.low;
        chain.eq.mid.value = effects.eq.mid;
        chain.eq.high.value = effects.eq.high;
      }
      if (chain.pitchShift) chain.pitchShift.pitch = effects.autotune * 12;
    } catch (err) {
      console.error("Error updating live effects:", err);
      setError(`Failed to update effects: ${err.message}`);
    }
  };

  const toggleEffects = async (trackId) => {
    if (!trackId || !trackEffects[trackId]) return;
    const willBeEnabled = !trackEffects[trackId].enabled;
    setTrackEffects(prev => ({
      ...prev,
      [trackId]: { ...prev[trackId], enabled: willBeEnabled }
    }));
    if (playerRefs.current[trackId]) {
      try {
        const player = playerRefs.current[trackId];
        player.disconnect();
        if (willBeEnabled) {
          const chain = await createEffectsChain(trackId);
          if (chain) player.connect(chain.input);
          else player.toDestination();
        } else {
          player.toDestination();
          if (effectsChainRefs.current[trackId]) {
            Object.values(effectsChainRefs.current[trackId]).forEach(effect => {
              if (effect && typeof effect.dispose === 'function') effect.dispose();
            });
            effectsChainRefs.current[trackId] = null;
          }
        }
      } catch (err) {
        console.error("Error toggling effects:", err);
        setError(`Failed to toggle effects: ${err.message}`);
      }
    }
  };

  const startRecording = async () => {
    if (!recordingInput) {
      setError("No audio input selected");
      return;
    }
    setError(null);
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: recordingInput } });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder; // Store reference
    const audioChunks = [];
    mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
      const audioFile = new File([audioBlob], 'recording.mp3', { type: 'audio/mp3' });
      const localUrl = URL.createObjectURL(audioBlob);
      setRecordingWaveformData(null); // Clear waveform data
      try {
        const response = await createAudio(audioFile);
        handleAudioUploaded({ ...response.data, localUrl });
      } catch (err) {
        console.error('Failed to upload audio to backend:', err);
        handleAudioUploaded({ localUrl });
      }
      setIsRecording(false);
      stream.getTracks().forEach(track => track.stop());
    };
    mediaRecorder.start();
    // Simulate waveform during recording
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasRef = useRef(null); // Use ref for canvas
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = 400;
      canvasRef.current.height = 100;
      document.querySelector('.timeline-container').appendChild(canvasRef.current);
    }
    const ctx = canvasRef.current.getContext('2d');
    function draw() {
      if (isRecording && ctx) {
        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(0, 255, 0)';
        ctx.beginPath();
        const sliceWidth = canvasRef.current.width * 1.0 / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * canvasRef.current.height / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
        ctx.stroke();
      }
    }
    draw();
    setRecordingWaveformData({ ref: canvasRef }); // Store ref instead of canvas
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  const addTrack = (type) => {
    setShowAddTrackMenu(false);
    switch (type) {
      case 'voice':
        startRecording();
        break;
      case 'sample':
        setShowAddTrackMenu(false); // Placeholder for now
        break;
      case 'import':
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'audio/*,audio/midi';
        input.onchange = (e) => {
          const file = e.target.files[0];
          const localUrl = URL.createObjectURL(file);
          handleAudioUploaded({ filename: file.name, localUrl });
        };
        input.click();
        break;
      default:
        setError(`Track type "${type}" not implemented yet`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

   

      {/* Add Track Menu */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddTrackMenu(!showAddTrackMenu)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
        >
          + Add Track
        </button>
        {showAddTrackMenu && (
          <div className="absolute bg-white p-4 rounded shadow-lg mt-2">
            <h3 className="text-lg font-semibold mb-2">New Track</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => addTrack('voice')}
                className="bg-red-200 p-2 rounded text-center"
              >
                <div className="text-2xl">🎤</div>
                <p>Voice/Mic</p>
                <p className="text-sm">Capture your voice or any sound</p>
              </button>
              <button
                onClick={() => addTrack('sample')}
                className="bg-green-200 p-2 rounded text-center"
              >
                <div className="text-2xl">🎸</div>
                <p>Guitar</p>
                <p className="text-sm">Plug in a guitar or use BandLab as an amp</p>
              </button>
              <button
                onClick={() => addTrack('import')}
                className="bg-blue-200 p-2 rounded text-center"
              >
                <div className="text-2xl">📥</div>
                <p>Import Audio/MIDI</p>
              </button>
            </div>
            <button
              onClick={() => setShowAddTrackMenu(false)}
              className="mt-4 w-full bg-gray-200 p-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    

      <div className="grid grid-cols-12 gap-4">
        {/* <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">Tracks</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {tracks.map(track => (
              <div
                key={track.id}
                className={`p-2 rounded cursor-pointer transition-colors ${activeTrackId === track.id ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                onClick={() => setActiveTrackId(track.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-white font-medium truncate">{track.name}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTrack(track.id);
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete track"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(track.id);
                    }}
                    className={`px-2 py-1 text-xs rounded ${track.muted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                  >
                    {track.muted ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSolo(track.id);
                    }}
                    className={`px-2 py-1 text-xs rounded ${track.soloed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                  >
                    Solo
                  </button>
                </div>
              </div>
            ))}
            {tracks.length === 0 && (
              <div className="text-gray-400 text-center py-4">
                No tracks yet
              </div>
            )}
          </div>
        </div> */}

        <div className="col-span-9 bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
          <div className="space-y-4 max-h-screen overflow-y-auto">
            {tracks.map(track => (
              <div key={track.id} className="track-container">
                <div className="text-white text-sm mb-1 flex justify-between">
                  <span>{track.name}</span>
                  <div className="flex items-center space-x-2">
                    {track.soloed && <span className="text-yellow-400 px-2 py-0.5 bg-yellow-900/50 rounded-full text-xs">Solo</span>}
                    {trackEffects[track.id] && trackEffects[track.id].enabled && <span className="text-purple-400 px-2 py-0.5 bg-purple-900/50 rounded-full text-xs">FX</span>}
                    <span className={track.muted ? 'text-red-400' : 'text-green-400'}>{track.muted ? 'Muted' : 'Active'}</span>
                  </div>
                </div>
                <div className={`bg-gray-700 rounded p-2 ${track.muted ? 'opacity-50' : ''}`}>
                  <WaveformDisplay
                    audioUrl={track.url}
                    isPlaying={isPlaying}
                    onPlayPause={handleTrackPlayPause}
                    trackId={track.id}
                    color={track.soloed ? 'rgb(234, 179, 8)' : trackEffects[track.id]?.enabled ? 'rgb(167, 139, 250)' : track.id === activeTrackId ? 'rgb(124, 58, 237)' : 'rgb(59, 130, 246)'}
                    hasEffects={trackEffects[track.id]?.enabled}
                    isSoloed={track.soloed}
                    isMuted={track.muted}
                    effects={trackEffects[track.id]}
                  />
                </div>
              </div>
            ))}
            {tracks.length === 0 && !isRecording && (
              <div className="text-gray-400 text-center py-8">
                No tracks yet. Add a track to get started.
              </div>
            )}
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Record Audio</h3>
            <div>
              <label className="text-white mb-2 block">Input Device</label>
              <select
                value={recordingInput || ""} // Fallback to empty string if null
                onChange={(e) => setRecordingInput(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-2 py-1 mb-2"
              >
                <option value="" disabled>Select a device</option>
                {audioDevices.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Device ${device.deviceId}`}
                  </option>
                ))}
              </select>
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md w-full"
                disabled={isRecording || !recordingInput}
              >
                {isRecording ? 'Recording...' : 'Start Recording'}
              </button>
              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-full"
                >
                  Stop Recording
                </button>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <SampleBrowser onSampleSelect={handleSampleSelect} />
          </div>

          {activeTrackId && tracks.find(t => t.id === activeTrackId) && (
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-white mb-4">Mixer</h3>
              <div>
                <div className="mb-4">
                  <label className="text-white block mb-1">Volume</label>
                  <input
                    type="range"
                    min="-60"
                    max="10"
                    step="1"
                    value={tracks.find(t => t.id === activeTrackId).volume}
                    onChange={(e) => updateVolume(activeTrackId, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-white text-right">
                    {tracks.find(t => t.id === activeTrackId).volume} dB
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-white block mb-1">Pan</label>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.1"
                    value={tracks.find(t => t.id === activeTrackId).pan}
                    onChange={(e) => updatePan(activeTrackId, Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-white text-right">
                    {tracks.find(t => t.id === activeTrackId).pan}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => toggleMute(activeTrackId)}
                    className={`px-3 py-1 rounded-md ${tracks.find(t => t.id === activeTrackId).muted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-500'} text-white`}
                  >
                    {tracks.find(t => t.id === activeTrackId).muted ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    onClick={() => toggleSolo(activeTrackId)}
                    className={`px-3 py-1 rounded-md ${tracks.find(t => t.id === activeTrackId).soloed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'} text-white`}
                  >
                    Solo
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedAudio && (
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <EffectsPanel
                audioUrl={selectedAudio.localUrl || selectedAudio.url}
                effects={trackEffects[activeTrackId]}
                updateEffects={(effectType, value) => updateTrackEffect(activeTrackId, effectType, value)}
                toggleEffects={() => toggleEffects(activeTrackId)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoundRecorder;