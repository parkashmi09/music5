import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
import UploadForm from '../Components/masteringSound/UploadForm';
import SongList from '../Components/masteringSound/SongList';
import AudioPlayer from '../Components/masteringSound/AudioPlayer';
import { getSong } from '../services/masteringSoundServices';
// import toast from 'react-hot-toast';

const MasteringPage = () => {
//   const { userId } = useAuth();
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSongDetails = async (id) => {
    if (!id) return;
    
    setLoading(true);
    try {
      const song = await getSong(id);
      setSelectedSong(song);
    } catch (error) {
      console.error('Error fetching song details:', error);
    //   toast.error('Failed to load song details');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSong = (songId, isMastered, songTitle) => {
    setSelectedSongId(songId);
  };

  const handleUploadComplete = (song) => {
    // Refresh song list or select the newly uploaded song
    setSelectedSongId(song._id);
  };

  useEffect(() => {
    if (selectedSongId) {
      fetchSongDetails(selectedSongId);
    }
  }, [selectedSongId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#2a2f3f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white studio-heading mb-2">StudioSphere 360</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Professional AI-powered audio mastering studio that enhances your sound while preserving your artistic vision</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <UploadForm onUploadComplete={handleUploadComplete} />
            <SongList 
              onSelectSong={handleSelectSong} 
              selectedSongId={selectedSongId}
            />
          </div>
          
          <div className="lg:col-span-2">
            <AudioPlayer song={selectedSong} />
            
            {/* Studio Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md">
                <div className="text-[#FC5252] text-2xl mb-3">🎚️</div>
                <h3 className="text-white font-bold mb-2">Advanced Mastering</h3>
                <p className="text-gray-400 text-sm">Professional-grade audio processing with industry-standard algorithms</p>
              </div>
              
              <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md">
                <div className="text-[#FC5252] text-2xl mb-3">🤖</div>
                <h3 className="text-white font-bold mb-2">AI Assistant</h3>
                <p className="text-gray-400 text-sm">Smart recommendations that enhance your sound while preserving your artistic vision</p>
              </div>
              
              <div className="bg-[#2a2f3f] bg-opacity-90 rounded-xl shadow-lg p-6 border border-[#3d4663] backdrop-blur-md">
                <div className="text-[#FC5252] text-2xl mb-3">🔊</div>
                <h3 className="text-white font-bold mb-2">Studio Quality</h3>
                <p className="text-gray-400 text-sm">Professional sound that rivals expensive studio mastering services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasteringPage;