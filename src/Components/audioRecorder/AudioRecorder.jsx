import { useState, useRef, useEffect } from 'react';
import { createAudio } from '../../services/soundServices';
import { FaMicrophone, FaStop, FaChevronDown } from 'react-icons/fa';

const AudioRecorder = ({ onAudioUploaded, audioDevices = [], recordingInput = '', setRecordingInput }) => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDeviceDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update recording timer
  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update audio level meter
  useEffect(() => {
    if (recording && analyserRef.current) {
      const updateAudioLevel = () => {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average level
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setAudioLevel(average / 255); // Normalize to 0-1
        
        if (recording) {
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      requestAnimationFrame(updateAudioLevel);
    }
  }, [recording]);

  const startRecording = async () => {
    try {
      // Use the selected device if available
      const constraints = {
        audio: recordingInput 
          ? { deviceId: { exact: recordingInput }, echoCancellation: true, noiseSuppression: true } 
          : { echoCancellation: true, noiseSuppression: true }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      streamRef.current = stream;
      
      // Set up audio analyzer for level meter
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      // Set up media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = handleStop;
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setRecording(false);
    }
  };

  const handleStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
    const audioFile = new File([audioBlob], 'recording.mp3', { type: 'audio/mp3' });
    const localUrl = URL.createObjectURL(audioBlob);

    try {
      const response = await createAudio(audioFile);
      onAudioUploaded({ ...response.data, localUrl });
    } catch (err) {
      console.error('Failed to upload audio to backend:', err);
      onAudioUploaded({ localUrl });
    } finally {
      audioChunksRef.current = [];
    }
  };

  const handleDeviceSelect = (deviceId) => {
    setRecordingInput(deviceId);
    setShowDeviceDropdown(false);
  };

  // Get the selected device name
  const getSelectedDeviceName = () => {
    if (!recordingInput && audioDevices.length > 0) return audioDevices[0].label || 'Default Device';
    const device = audioDevices.find(d => d.deviceId === recordingInput);
    return device ? device.label : 'Default - MacBook Pro Microphone';
  };

  return (
    <div className="audio-recorder studio-card slide-in-up">
      <div className="audio-recorder-header">
        <h3 className="audio-recorder-title studio-heading">
          Record Audio
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-300 mb-2 studio-heading">Input Device</p>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDeviceDropdown(!showDeviceDropdown)}
              className="studio-input w-full py-3 px-4 flex justify-between items-center"
            >
              <span className="truncate">{getSelectedDeviceName()}</span>
              <FaChevronDown className={`ml-2 transition-transform ${showDeviceDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDeviceDropdown && audioDevices.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-[#2a3142] border border-[#3d4663] rounded-md shadow-lg max-h-60 overflow-auto custom-scrollbar">
                {audioDevices.map(device => (
                  <button
                    key={device.deviceId}
                    onClick={() => handleDeviceSelect(device.deviceId)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#3d4663] transition-colors truncate"
                  >
                    {device.label || `Device ${device.deviceId.substring(0, 8)}...`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {recording && (
          <div className="mb-6 bg-[#1a1a2a]/60 rounded-lg p-4 border border-[#3d4663]">
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span className="text-red-400 font-medium">Recording in progress</span>
              <span className="text-white font-mono bg-[#2a2a3a] px-3 py-1 rounded ml-auto">
                {formatTime(recordingTime)}
              </span>
            </div>
            
            {/* Audio level meter */}
            <div className="audio-level-meter">
              <div 
                className="audio-level-fill"
                style={{ width: `${Math.min(audioLevel * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`studio-btn w-full py-4 rounded-md flex items-center justify-center transition-all font-medium text-lg ${
            recording 
              ? 'studio-btn-danger' 
              : 'studio-btn-success'
          }`}
        >
          {recording ? (
            <>
              <FaStop className="mr-2" size={18} />
              Stop Recording
            </>
          ) : (
            <>
              <FaMicrophone className="mr-2" size={18} />
              Start Recording
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;