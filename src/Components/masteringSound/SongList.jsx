import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { getSongs } from '../../services/masteringSoundServices';
import { userService } from '../../services/userService';
import { FaMusic, FaExclamationTriangle, FaSync } from 'react-icons/fa';
// import { useAuth } from '../../context/AuthContext';
// import { TailSpin } from 'react-loader-spinner';

// Memoized song item component to prevent unnecessary re-renders
const MemoizedSongItem = memo(({ song, isSelected, onSelect }) => {
  return (
    <li 
      onClick={() => onSelect(song)}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'bg-[#FC5252]/20 border border-[#FC5252]/40' 
          : 'bg-[#1a1f2e] border border-[#3d4663]/50 hover:bg-[#FC5252]/10 hover:border-[#FC5252]/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          song.status === 'mastered' 
            ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
            : song.status === 'processing' 
              ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50' 
              : 'bg-red-900/30 text-red-400 border border-red-800/50'
        }`}>
          <FaMusic className="text-lg" />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="font-medium text-white mb-1 truncate">{song.title}</div>
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{new Date(song.uploadDate).toLocaleDateString()}</span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
              song.status === 'mastered' 
                ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                : song.status === 'processing' 
                  ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50' 
                  : 'bg-red-900/30 text-red-400 border border-red-800/50'
            }`}>
              {song.status}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
});

const SongList = ({ onSelectSong, selectedSongId }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const { userId } = useAuth();
  const [userId, setUserId] = useState(null);
  const isDataFetched = useRef(false);
  const previousSongs = useRef([]);
  const MAX_RETRY_COUNT = 3;
  


  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchSongs = useCallback(async (retry = 0) => {
    if (!userId) return;
    
    // Don't show loading indicator on subsequent page changes
    if (page === 1 || songs.length === 0) {
      setLoading(true);
    }
    setError(null);
    
    try {
      const data = await getSongs(userId, page, 5);
      
      // Only update state if the data has actually changed
      if (JSON.stringify(data.folders) !== JSON.stringify(previousSongs.current)) {
        setSongs(data.folders);
        setTotalPages(data.totalPages);
        previousSongs.current = data.folders;
        
        // Auto-select first song if none selected and we have songs
        if (data.folders.length > 0 && !selectedSongId) {
          onSelectSong(data.folders[0].id, data.folders[0].isMastered, data.folders[0].title);
        }
      }
      
      isDataFetched.current = true;
    } catch (err) {
      console.error('Error fetching songs:', err);
      
      if (retry < MAX_RETRY_COUNT) {
        // Retry with exponential backoff
        setTimeout(() => fetchSongs(retry + 1), 1000 * Math.pow(2, retry));
      } else {
        setError('Failed to load songs after multiple attempts.');
        // toast.error('Failed to load songs. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, page, selectedSongId, onSelectSong, songs.length]);

  // Only fetch songs when userId or page changes
  useEffect(() => {
    if (userId && (!isDataFetched.current || page !== 1)) {
      fetchSongs();
    }
  }, [userId, page, fetchSongs]);

  // Memoize the select handler to prevent unnecessary re-renders
  const handleSelectSong = useCallback((song) => {
    onSelectSong(song.id, song.isMastered, song.title);
  }, [onSelectSong]);

  // Memoize the page change handler to prevent unnecessary re-renders
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  // Memoize the retry handler to prevent unnecessary re-renders
  const handleRetry = useCallback(() => {
    fetchSongs();
  }, [fetchSongs]);

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
        <h2 className="text-xl font-bold text-white studio-heading">Your Library</h2>
        <button 
          onClick={handleRetry} 
          className="text-gray-400 hover:text-white transition-colors"
          title="Refresh"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      {loading && songs.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-10 space-y-3">
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-[#FC5252] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-2 border-[#3d4663]"></div>
          </div>
          <p className="text-gray-400 text-sm">Loading your songs...</p>
        </div>
      ) : error && songs.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-900/20 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-400 text-2xl" />
          </div>
          <p className="text-red-400 mb-2">{error}</p>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-[#FC5252] hover:bg-[#FC5252]/80 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      ) : songs.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#3d4663]/30 flex items-center justify-center">
            <FaMusic className="text-gray-400 text-2xl" />
          </div>
          <div>
            <p className="text-gray-300 mb-1">Your library is empty</p>
            <p className="text-gray-400 text-sm">Upload a song to get started with AI mastering</p>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {songs.map(song => (
              <MemoizedSongItem
                key={song.id}
                song={song}
                isSelected={selectedSongId === song.id}
                onSelect={handleSelectSong}
              />
            ))}
          </ul>
          
          {loading && (
            <div className="flex justify-center py-2">
              <div className="w-6 h-6 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-[#FC5252] animate-spin"></div>
                <div className="absolute inset-1 rounded-full border-2 border-[#3d4663]"></div>
              </div>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button 
                disabled={page === 1} 
                onClick={() => handlePageChange(page - 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  page === 1 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#1a1f2e] text-white hover:bg-[#FC5252]/20'
                }`}
              >
                Previous
              </button>
              
              {[...Array(totalPages).keys()].map(i => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    page === i + 1 
                      ? 'bg-[#FC5252] text-white' 
                      : 'bg-[#1a1f2e] text-white hover:bg-[#FC5252]/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                disabled={page === totalPages} 
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  page === totalPages 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#1a1f2e] text-white hover:bg-[#FC5252]/20'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SongList;