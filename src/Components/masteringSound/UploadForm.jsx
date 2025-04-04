import React, { useState, useEffect } from 'react';
import { uploadFileToS3 } from '../../services/masteringSoundServices';
import { createSong, submitForMastering } from '../../services/masteringSoundServices';
import { userService } from '../../services/userService';
// import { useAuth } from '../../context/AuthContext';
import { FaCloudUploadAlt, FaMusic, FaFileAudio } from 'react-icons/fa';

const UploadForm = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTitle(selectedFile.name.split('.')[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.includes('audio')) {
        setFile(droppedFile);
        setTitle(droppedFile.name.split('.')[0]);
      } else {
        // toast.error('Please upload an audio file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      // toast.error('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setProgress(10);
    
    try {
      // Upload file to S3
      const uploadResult = await uploadFileToS3(file, userId);
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Failed to upload file');
      }
      
      setProgress(50);
      
      // Create song record
      const songData = {
        userId,
        title,
        extension: uploadResult.fileExtension,
        size: file.size / (1024 * 1024), // Convert to MB
        duration: 180, // Placeholder duration
        originalUrl: uploadResult.key
      };
      
      const song = await createSong(songData);
      
      setProgress(75);
      
      // Submit for mastering
      const masteringData = {
        songId: song._id,
        s3Key: '8a3098b3c49fa526941916418da935f91cadc42bf995cdee7cc338cf214dc3eb',
        bucket: 'my-sound-mastering-api',
        title,
        ext: uploadResult.fileExtension,
        size: songData.size.toString(),
        duration: songData.duration.toString()
      };
      
      await submitForMastering(masteringData);
      
      setProgress(100);
      // toast.success('File uploaded and submitted for mastering');
      
      if (onUploadComplete) {
        onUploadComplete(song);
      }
      
      // Reset form
      setFile(null);
      setTitle('');
    } catch (error) {
      console.error('Upload error:', error);
      // toast.error(error.message || 'Failed to upload and process file');
    } finally {
      setUploading(false);
    }
  };
 // Fix the async useEffect issue by using a proper pattern for async in useEffect
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await userService.getUserData();
        if(userData && userData.user) {
          setUserId(userData.user._id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    getUserData();
  }, []);
  return (
    <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white studio-heading">Upload Audio</h2>
        <div className="text-[#FC5252] text-2xl">
          <FaCloudUploadAlt />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="relative">
          <div 
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
              ${dragActive ? 'border-[#FC5252] bg-[#FC5252]/10' : 'border-gray-600 hover:border-[#FC5252]'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            {file ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FC5252]/20 flex items-center justify-center mb-4">
                  <FaFileAudio className="text-[#FC5252] text-2xl" />
                </div>
                <p className="text-white font-medium mb-1">{file.name}</p>
                <p className="text-gray-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                  <FaMusic className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-300 text-center font-medium mb-1">
                  Drop your audio file here
                </p>
                <p className="text-gray-400 text-sm text-center">
                  Supports MP3, WAV, FLAC, OGG (max 50MB)
                </p>
              </div>
            )}
            
            <input
              id="file-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </div>
          
          {uploading && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Uploading{progress >= 50 ? ' & Processing' : ''}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FC5252] to-[#FC5252]/70 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="mt-4 space-y-2">
                {progress < 50 && (
                  <div className="flex items-center text-xs text-gray-400">
                    <div className="w-4 h-4 rounded-full bg-[#FC5252]/20 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-[#FC5252] animate-pulse"></div>
                    </div>
                    <span>Uploading to secure cloud storage...</span>
                  </div>
                )}
                
                {progress >= 50 && progress < 75 && (
                  <div className="flex items-center text-xs text-gray-400">
                    <div className="w-4 h-4 rounded-full bg-[#FC5252]/20 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-[#FC5252] animate-pulse"></div>
                    </div>
                    <span>Creating song profile...</span>
                  </div>
                )}
                
                {progress >= 75 && (
                  <div className="flex items-center text-xs text-gray-400">
                    <div className="w-4 h-4 rounded-full bg-[#FC5252]/20 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-[#FC5252] animate-pulse"></div>
                    </div>
                    <span>Submitting for AI mastering...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={!file || uploading}
          className={`py-3 px-6 rounded-lg font-semibold flex items-center justify-center
            ${!file || uploading 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#FC5252] to-[#FC5252]/80 hover:from-[#FC5252]/90 hover:to-[#FC5252] shadow-md'
            }`}
        >
          {uploading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <FaCloudUploadAlt className="mr-2" size={18} />
              Upload & Master
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;