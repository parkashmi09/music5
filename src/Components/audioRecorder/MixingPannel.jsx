import { useState } from 'react';
import * as Tone from 'tone';
import { FaPlay, FaVolumeUp, FaBalanceScale, FaSpinner } from 'react-icons/fa';

const MixingPanel = ({ audioUrl }) => {
  const [volume, setVolume] = useState(0);
  const [pan, setPan] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playWithMix = async () => {
    if (!audioUrl) {
      setError('No audio URL provided. Please record or upload an audio file.');
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      Tone.Transport.stop();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Test if the URL is accessible before loading it into Tone.Player
      const response = await fetch(audioUrl, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Audio file is not accessible. Please check the URL or contact support.');
      }

      await Tone.start();
      const player = new Tone.Player({
        url: audioUrl,
        onerror: (err) => {
          throw new Error('Failed to load audio: ' + err.message);
        },
        onload: () => {
          player.volume.value = volume;
          const panner = new Tone.Panner(pan).toDestination();
          player.connect(panner);
          player.start();
          setIsPlaying(true);
          
          // Set up a callback for when playback ends
          player.onstop = () => {
            setIsPlaying(false);
          };
        },
      }).toDestination();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mixing-panel slide-in">
      <div className="mixing-panel-header">
        <div className="mixing-panel-icon">
          <FaVolumeUp className="text-blue-400" size={14} />
        </div>
        <h3 className="mixing-panel-title">Mixing Panel</h3>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-md">
          <p className="text-red-300 text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        </div>
      )}
      
      <div className="mixing-panel-body">
        <div className="mixing-panel-control-group">
          <div className="mixing-panel-control">
            <div className="mixing-panel-label">
              <label className="mixing-panel-label-text">
                <FaVolumeUp className="mr-2 text-blue-400" size={14} />
                Volume
              </label>
              <span className="mixing-panel-value">
                {volume} dB
              </span>
            </div>
            <input
              type="range"
              min="-60"
              max="6"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="studio-range w-full"
            />
          </div>
          
          <div className="mixing-panel-control">
            <div className="mixing-panel-label">
              <label className="mixing-panel-label-text">
                <FaBalanceScale className="mr-2 text-blue-400" size={14} />
                Pan
              </label>
              <span className="mixing-panel-value">
                {pan}
              </span>
            </div>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.1"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              className="studio-range w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Left</span>
              <span>Center</span>
              <span>Right</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={playWithMix}
          disabled={isLoading || !audioUrl}
          className={`studio-btn w-full py-2.5 flex items-center justify-center ${
            !audioUrl 
              ? 'opacity-50 cursor-not-allowed' 
              : isPlaying
                ? 'studio-btn-danger'
                : 'studio-btn-primary'
          }`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin mr-2" size={16} />
              Loading...
            </>
          ) : isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
              Stop Playback
            </>
          ) : (
            <>
              <FaPlay className="mr-2" size={16} />
              Play Mix
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MixingPanel;