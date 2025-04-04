import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import arrow from "../assets/create/arrow.png";
import bgimage from "../assets/mastering/bgimage.png";
import '../styles/home/GraphicDesign.css';

const VideoCreator = () => {
  // User input states
  const [videoPrompt, setVideoPrompt] = useState(
    'Camera zooms out as the subject runs towards the camera in a lush forest.'
  );
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Generated content states
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  
  // UI control states
  const [showCameraControls, setShowCameraControls] = useState(false);
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Task tracking states
  const [taskId, setTaskId] = useState(null);
  const [duration, setDuration] = useState(5);
  
  // Camera control states
  const [cameraControls, setCameraControls] = useState({
    horizontal: 0,
    vertical: 0,
    pan: -1.5,
    tilt: 0,
    zoom: 0,
    roll: 0,
    staticCamera: false,
  });

  // API configuration
  const CREATE_API_URL = 'https://studio-sphere360-backend.vercel.app/api/v1/runwayApi/create';
  const GET_API_URL = 'https://studio-sphere360-backend.vercel.app/api/v1/runwayApi/get';
  const BEARER_TOKEN = localStorage.getItem('userToken');

  // Updated sample images with party, event, and group themes from Unsplash
  const unsplashImages = [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', // Group of friends partying
    'https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg', // Boys at a party
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', // Event with crowd dancing
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', // Group celebration
    'https://images.unsplash.com/photo-1541532713592-79a0317b6b77', // Party with young people
    'https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg', // Festive group gathering
  ];

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 1000);
    
    return interval;
  };

  const pollTaskStatus = async (taskId) => {
    if (!taskId) {
      setError('No task ID provided');
      setLoading(false);
      return;
    }
    
    console.log("Polling for task:", taskId);
    
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${GET_API_URL}/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEARER_TOKEN}`,
          },
        });

        const data = await response.json();
        

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch task status');
        }

        if (data.status === 'SUCCEEDED') {
          clearInterval(interval);
          setProgress(100);
          setGeneratedVideoUrl(data.output[0]);
          setLoading(false);
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setError(`Task failed: ${data.failure || 'Unknown error'}`);
          setLoading(false);
        } else if (data.status === 'RUNNING' && data.progress) {
          setProgress(Math.min(90, data.progress * 100));
        }
      } catch (err) {
        console.error("Error polling task:", err);
        clearInterval(interval);
        setError(`Error polling task status: ${err.message}`);
        setLoading(false);
      }
    }, 5000); // Poll every 5 seconds
  };

  const generateVideo = async () => {
    if (!videoPrompt) {
      setError('Please enter a video prompt.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedVideoUrl('');
    setTaskId(null);
    const progressInterval = simulateProgress();

    try {
      // Build enhanced prompt with camera controls
      let enhancedPrompt = videoPrompt;
      
      // Only add camera settings if not using static camera
      if (!cameraControls.staticCamera) {
        // Add a separator if the prompt doesn't end with punctuation
        if (!/[.!?]$/.test(enhancedPrompt.trim())) {
          enhancedPrompt += '. ';
        } else if (!enhancedPrompt.endsWith(' ')) {
          enhancedPrompt += ' ';
        }
        
        // Add camera control instructions
        enhancedPrompt += `Camera settings: `;
        
        if (cameraControls.pan !== 0) {
          enhancedPrompt += `pan ${cameraControls.pan > 0 ? 'right' : 'left'} (${Math.abs(cameraControls.pan)}), `;
        }
        
        if (cameraControls.tilt !== 0) {
          enhancedPrompt += `tilt ${cameraControls.tilt > 0 ? 'up' : 'down'} (${Math.abs(cameraControls.tilt)}), `;
        }
        
        if (cameraControls.zoom !== 0) {
          enhancedPrompt += `${cameraControls.zoom > 0 ? 'zoom in' : 'zoom out'} (${Math.abs(cameraControls.zoom)}), `;
        }
        
        if (cameraControls.roll !== 0) {
          enhancedPrompt += `roll ${cameraControls.roll > 0 ? 'clockwise' : 'counterclockwise'} (${Math.abs(cameraControls.roll)}), `;
        }
        
        if (cameraControls.horizontal !== 0) {
          enhancedPrompt += `move horizontally ${cameraControls.horizontal > 0 ? 'right' : 'left'} (${Math.abs(cameraControls.horizontal)}), `;
        }
        
        if (cameraControls.vertical !== 0) {
          enhancedPrompt += `move vertically ${cameraControls.vertical > 0 ? 'up' : 'down'} (${Math.abs(cameraControls.vertical)}), `;
        }
        
        // Remove trailing comma and space if present
        enhancedPrompt = enhancedPrompt.replace(/, $/, '');
      } else {
        // Add static camera instruction
        if (!/[.!?]$/.test(enhancedPrompt.trim())) {
          enhancedPrompt += '. ';
        } else if (!enhancedPrompt.endsWith(' ')) {
          enhancedPrompt += ' ';
        }
        enhancedPrompt += 'Use a static camera with no movement.';
      }
      
      console.log("Enhanced prompt:", enhancedPrompt);

      const response = await fetch(CREATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          promptImage: selectedImage || unsplashImages[0], // Use first image as default if none selected
          promptText: enhancedPrompt,
          duration: duration
        }),
      });

      const data = await response.json();
      console.log("Create response:", data);
      
      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.statusText}`);
      }

      // Extract taskId from the response
      const taskId = data.taskId;
      if (!taskId) {
        throw new Error('No task ID returned from API');
      }
      
      setTaskId(taskId);
      pollTaskStatus(taskId);
    } catch (err) {
      console.error("Error creating video:", err);
      setError(`Error: ${err.message}`);
      setLoading(false);
      clearInterval(progressInterval);
    }
  };

  const handleCameraControlChange = (control, value) => {
    setCameraControls((prev) => ({
      ...prev,
      [control]: value,
    }));
  };

  return (
    <div className="min-h-screen relative text-white">
      <img src={bgimage} alt="background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <TypeAnimation
              sequence={['AI Video Creator', 1000]}
              wrapper="span"
              speed={50}
              repeat={1}
              cursor={false}
            />
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your ideas into cinematic videos with our AI-powered video generation tool
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-7">
            <motion.div 
              className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Create Your Video</h2>
              
              <div className="mb-6">
                <label htmlFor="videoPrompt" className="block text-gray-300 font-medium mb-2">
                  Describe your video
                </label>
                <textarea
                  id="videoPrompt"
                  value={videoPrompt}
                  onChange={(e) => setVideoPrompt(e.target.value)}
                  placeholder="Describe the scene and motion you want to create..."
                  className="w-full h-32 p-4 bg-black/50 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 font-medium">Video Duration</label>
                  <span className="text-sm text-gray-400">{duration} seconds</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={15}
                  step={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-blue-500"
                  disabled={loading}
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => setShowCameraControls(!showCameraControls)}
                    className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium"
                  >
                    {showCameraControls ? 'Hide Camera Controls' : 'Show Camera Controls'}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showCameraControls ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="staticCamera"
                      checked={cameraControls.staticCamera}
                      onChange={(e) =>
                        setCameraControls((prev) => ({
                          ...prev,
                          staticCamera: e.target.checked,
                          horizontal: e.target.checked ? 0 : prev.horizontal,
                          vertical: e.target.checked ? 0 : prev.vertical,
                          pan: e.target.checked ? 0 : prev.pan,
                          tilt: e.target.checked ? 0 : prev.tilt,
                          zoom: e.target.checked ? 0 : prev.zoom,
                          roll: e.target.checked ? 0 : prev.roll,
                        }))
                      }
                      className="mr-2 accent-blue-500"
                      disabled={loading}
                    />
                    <label htmlFor="staticCamera" className="text-gray-300 text-sm">Static Camera</label>
                  </div>
                </div>
                
                {showCameraControls && (
                  <motion.div 
                    className="grid grid-cols-2 gap-4 bg-black/30 p-4 rounded-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {['pan', 'tilt', 'zoom', 'roll', 'horizontal', 'vertical'].map((control) => (
                      <div key={control} className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <label className="text-gray-300 capitalize text-sm">{control}</label>
                          <span className="text-gray-400 text-xs">{cameraControls[control]}</span>
                        </div>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.1}
                          value={cameraControls[control]}
                          onChange={(e) => handleCameraControlChange(control, Number(e.target.value))}
                          className="w-full accent-blue-500 h-2"
                          disabled={loading || cameraControls.staticCamera}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Select Starting Image (Optional)</h3>
                <div className="grid grid-cols-3 gap-3">
                  {unsplashImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 h-24 ${
                        selectedImage === image ? 'ring-2 ring-blue-500 scale-[1.03]' : 'ring-1 ring-gray-700 hover:ring-blue-400'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image} 
                        alt="Template" 
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === image && (
                        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-300 rounded-xl">
                  <p className="m-0 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
              
              <button
                onClick={generateVideo}
                disabled={loading || !videoPrompt}
                className="create-button w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Generating Video...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Generate Video
                    <img src={arrow} alt="arrow" className="ml-2" />
                  </span>
                )}
              </button>
              
              {loading && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Processing</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Right Column - Video Result */}
          <div className="lg:col-span-5">
            {generatedVideoUrl ? (
              <motion.div 
                className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Your Generated Video</h2>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <video 
                    controls 
                    src={generatedVideoUrl} 
                    className="w-full" 
                    autoPlay
                    loop
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <a 
                    href={generatedVideoUrl} 
                    download="generated-video.mp4"
                    className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Video
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 h-full flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-2xl font-bold mb-2">Ready to Create</h2>
                  <p className="text-gray-400 mb-6">
                    Fill in the details on the left and click "Generate Video" to create your AI-powered video.
                  </p>
                  <div className="text-left bg-black/30 p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Pro Tips:</h3>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• Be specific about camera movements in your description</li>
                      <li>• Selecting an image helps guide the visual style</li>
                      <li>• Adjust camera controls for more precise results</li>
                      <li>• Longer videos (10-15s) allow for more complex scenes</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCreator;