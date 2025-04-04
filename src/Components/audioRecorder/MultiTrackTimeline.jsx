
import { useState, useEffect } from 'react';

import * as Tone from 'tone';
import { getAllAudio } from '../../services/soundServices';

const MultiTrackTimeline = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await getAllAudio();
      setTracks(response.data);
    };
    fetchTracks();
  }, []);

  const playTrack = (url) => {
    const player = new Tone.Player(url).toDestination();
    Tone.Transport.start();
    player.start();
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Multi-Track Timeline</h2>
      {tracks.map((track) => (
        <div key={track._id} className="flex items-center p-2 bg-gray-700 rounded-md mb-2">
          <span className="text-white flex-1">{track.filename || 'Unnamed Track'}</span>
          <button
            onClick={() => playTrack(track.url)}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Play
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultiTrackTimeline;