import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';

const AudioPlayer = memo(({ song }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMastered, setIsMastered] = useState(true);
  const [intensity, setIntensity] = useState(3);
  const [zoom, setZoom] = useState(100);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getAudioUrl = useCallback(() => {
    if (!song) return null;
    const audioUrl = isMastered && song.masteredUrl ? song.masteredUrl : song.originalUrl;
    if (!audioUrl) return null;

    if (audioUrl.startsWith('http') || audioUrl.startsWith('blob:')) {
      return audioUrl;
    }

    const parts = audioUrl.split('/');
    if (parts.length >= 3) {
      const userId = parts[0];
      const fileId = parts[1];
      const fileName = parts[2];
      return `http://localhost:5002/api/songs/audio/${userId}/${fileId}/${fileName}`;
    }
    return `http://localhost:5002/${audioUrl}`;
  }, [song, isMastered]);

  const loadAudio = useCallback(() => {
    if (!wavesurfer.current || !song) return;

    setIsLoading(true);
    setLoadError(null);

    const audioUrl = getAudioUrl();
    if (!audioUrl) {
      setLoadError('Audio URL not available');
      setIsLoading(false);
      return;
    }

    console.log('Loading audio:', audioUrl);

    wavesurfer.current.load(audioUrl);
  }, [song, getAudioUrl]);

  const initializeWaveSurfer = useCallback(() => {
    if (!song || !waveformRef.current) return;

    setIsLoading(true);
    setLoadError(null);

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: isMastered ? '#FC5252' : '#4ade80',
      progressColor: isMastered ? '#b91c1c' : '#16a34a',
      cursorColor: '#3a56d4',
      barWidth: 2,
      barRadius: 2,
      responsive: true,
      height: 128,
      normalize: true,
      partialRender: true,
      backend: 'MediaElement',
    });

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
      setIsLoading(false);
      if (isPlaying) wavesurfer.current.play();
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on('finish', () => {
      setIsPlaying(false);
    });

    wavesurfer.current.on('error', (err) => {
      console.error('WaveSurfer error:', err);
      setLoadError('Error loading audio');
      setIsLoading(false);
    });

    loadAudio();
  }, [song, isMastered, isPlaying, loadAudio]);

  useEffect(() => {
    initializeWaveSurfer();
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [song, isMastered, initializeWaveSurfer]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(intensity / 10);
    }
  }, [intensity]);

  useEffect(() => {
    if (wavesurfer.current) {
      const waveformContainer = waveformRef.current.querySelector('wave');
      if (waveformContainer) {
        const zoomLevel = zoom / 100;
        waveformContainer.style.transform = `scaleX(${zoomLevel})`;
        waveformContainer.style.transformOrigin = 'left';
      }
    }
  }, [zoom]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleToggleMastered = useCallback(() => {
    if (wavesurfer.current) {
      const currentPosition = wavesurfer.current.getCurrentTime();
      setIsMastered((prev) => !prev);
      setCurrentTime(currentPosition); // Preserve position
    }
  }, []);

  const handleIntensityChange = useCallback((e) => {
    setIntensity(parseInt(e.target.value, 10));
  }, []);

  const handleZoomChange = useCallback((e) => {
    setZoom(parseInt(e.target.value, 10));
  }, []);

  const handleToggleDownloadOptions = useCallback(() => {
    setShowDownloadOptions(!showDownloadOptions);
  }, [showDownloadOptions]);

  const handleDownload = useCallback((format) => {
    const audioUrl = getAudioUrl();
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${song.title}_${isMastered ? 'mastered' : 'original'}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowDownloadOptions(false);
  }, [song, isMastered, getAudioUrl]);

  if (!song) {
    return (
      <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md flex justify-center items-center h-64">
        <p className="text-gray-400">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md">
      <div ref={waveformRef} className="w-full h-32 mb-6 bg-[#1a1f2e] rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-[#1a1f2e]">
            <p className="text-gray-400">Loading audio...</p>
          </div>
        )}
        {loadError && (
          <div className="absolute inset-0 flex justify-center items-center bg-[#1a1f2e]">
            <p className="text-red-400">{loadError}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-2">Mastering</label>
          <button
            onClick={handleToggleMastered}
            disabled={!song.masteredUrl || isLoading}
            className={`py-2 px-4 rounded-lg ${isMastered ? 'bg-[#FC5252]' : 'bg-green-600'} text-white`}
          >
            {isMastered ? 'Switch to Original' : 'Switch to Mastered'}
          </button>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-2">Intensity</label>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={handleIntensityChange}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-2">Zoom</label>
          <input
            type="range"
            min="50"
            max="200"
            value={zoom}
            onChange={handleZoomChange}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={handlePlayPause}
          disabled={isLoading || loadError}
          className={`py-2 px-6 rounded-lg ${isPlaying ? 'bg-red-600' : 'bg-green-600'} text-white`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="relative">
          <button
            onClick={handleToggleDownloadOptions}
            disabled={isLoading || loadError}
            className="py-2 px-6 bg-gray-600 text-white rounded-lg"
          >
            <FaDownload />
          </button>
          {showDownloadOptions && (
            <div className="absolute top-full mt-2 bg-gray-800 rounded-lg shadow-lg">
              <button onClick={() => handleDownload('mp3')} className="block w-full px-4 py-2 text-white hover:bg-gray-700">MP3</button>
              <button onClick={() => handleDownload('wav')} className="block w-full px-4 py-2 text-white hover:bg-gray-700">WAV</button>
              <button onClick={() => handleDownload('ogg')} className="block w-full px-4 py-2 text-white hover:bg-gray-700">OGG</button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
});

export default AudioPlayer;