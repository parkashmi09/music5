import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import axios from 'axios';
import { FaPlay, FaPause, FaPlus, FaSearch, FaChevronLeft, FaChevronRight, FaLightbulb, FaMusic } from 'react-icons/fa';

const SampleBrowser = ({ onSampleSelect }) => {
  const [query, setQuery] = useState('');
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [playing, setPlaying] = useState(null);
  const playerRef = useRef(null);
  const [totalCount, setTotalCount] = useState(0);

  const categories = [
    { id: 'all', name: 'All Samples' },
    { id: 'drums', name: 'Drums & Percussion' },
    { id: 'bass', name: 'Bass' },
    { id: 'synth', name: 'Synths' },
    { id: 'piano', name: 'Piano & Keys' },
    { id: 'guitar', name: 'Guitar' },
    { id: 'vocals', name: 'Vocals' },
    { id: 'fx', name: 'FX & Ambience' },
  ];

  // Use the Client secret/Api key as the token
  const FREESOUND_API_TOKEN = 'Dk5GvgGudZDwBb5YdHq1RCYSdCnW6vM3Y7sf3PWv';

  // Function to use mock data for testing
  const useMockData = (categoryName) => {
    console.log('Using mock data for:', categoryName);
    
    // This is a simplified version of the API response
    const mockData = {
      count: 18687,
      results: [
        {
          id: 756542,
          name: "Shimmer Guitar _ Vaults Beta 0001 (125 BPM) (FX 001 v008)",
          tags: ["Guitar", "Guitar-Riff", "Guitar-Synth", "Riff", "Spacious", "Spacious-Guitar"],
          description: "Using Vaults Beta, Shimmer Guitar virtual instrument in FL Studio...",
          duration: 13.255,
          previews: {
            "preview-hq-mp3": "https://cdn.freesound.org/previews/756/756542_12333864-hq.mp3"
          }
        },
        {
          id: 756691,
          name: "Shimmer Guitar _ Vaults Beta 0001 (195 BPM) (FX 001 v002)",
          tags: ["Guitar", "Guitar-Riff", "Guitar-Synth", "Riff", "Spacious", "Spacious-Guitar"],
          description: "Using Vaults Beta, Shimmer Guitar virtual instrument in FL Studio...",
          duration: 12.0288,
          previews: {
            "preview-hq-mp3": "https://cdn.freesound.org/previews/756/756691_12333864-hq.mp3"
          }
        },
        {
          id: 756483,
          name: "Shimmer Guitar _ Vaults Beta 0001 (100 BPM) (FX 001 v005)",
          tags: ["Guitar", "Guitar-Riff", "Guitar-Synth", "Riff", "Spacious", "Spacious-Guitar"],
          description: "Using Vaults Beta, Shimmer Guitar virtual instrument in FL Studio...",
          duration: 40.7875,
          previews: {
            "preview-hq-mp3": "https://cdn.freesound.org/previews/756/756483_12333864-hq.mp3"
          }
        }
      ]
    };
    
    setTotalCount(mockData.count);
    
    const formattedSamples = mockData.results.map((sample) => ({
      id: sample.id.toString(),
      name: sample.name,
      description: sample.description || 'No description available',
      duration: sample.duration,
      url: sample.previews['preview-hq-mp3'],
      category: categoryName === 'all' ? 'unknown' : categoryName,
      tags: sample.tags,
    }));
    
    setSamples(formattedSamples);
    setLoading(false);
  };

  const searchSamples = async () => {
    setLoading(true);
    setError(null);

    try {
      // Default to 'drums' category if no query and 'all' category selected
      const searchQuery = query || (selectedCategory === 'all' ? 'drums' : selectedCategory);
      
      console.log('Searching for:', searchQuery);
      
      // Uncomment this to use mock data instead of real API call for testing
      // useMockData(selectedCategory);
      // return;
      
      const response = await axios.get('https://freesound.org/apiv2/search/text/', {
        params: {
          query: searchQuery,
          token: FREESOUND_API_TOKEN,
          page: page,
          page_size: 10,
          fields: 'id,name,description,duration,previews,tags',
        },
      });

      console.log('API Response:', response.data);
      
      // Store total count for pagination
      setTotalCount(response.data.count || 0);

      // Check if results exist and are in the expected format
      if (!response.data.results || !Array.isArray(response.data.results)) {
        throw new Error('Invalid API response format');
      }

      const fetchedSamples = response.data.results.map((sample) => ({
        id: sample.id.toString(),
        name: sample.name,
        description: sample.description || 'No description available',
        duration: sample.duration,
        url: sample.previews['preview-hq-mp3'],
        category: selectedCategory === 'all' ? 'unknown' : selectedCategory,
        tags: sample.tags || [],
      }));

      setSamples(fetchedSamples);
    } catch (err) {
      console.error('Error searching samples:', err.response?.data || err.message);
      setError('Failed to fetch samples from Freesound. Check your API token.');
      
      // Use mock data as fallback if API fails
      useMockData(selectedCategory);
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = async (sample) => {
    try {
      await Tone.start();

      if (playing === sample.id) {
        if (playerRef.current) {
          playerRef.current.stop();
          playerRef.current.dispose();
          playerRef.current = null;
        }
        setPlaying(null);
      } else {
        if (playerRef.current) {
          playerRef.current.stop();
          playerRef.current.dispose();
        }

        playerRef.current = new Tone.Player({
          url: sample.url,
          onload: () => {
            playerRef.current.start();
          },
          onstop: () => {
            setPlaying(null);
          },
        }).toDestination();

        setPlaying(sample.id);
      }
    } catch (err) {
      console.error('Error playing sample:', err);
      setError('Failed to play sample.');
    }
  };

  const addSample = (sample) => {
    if (onSampleSelect) {
      onSampleSelect(sample);
    }
  };

  useEffect(() => {
    searchSamples();
  }, [query, selectedCategory, page]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
        playerRef.current.dispose();
      }
    };
  }, []);

  const getAiSuggestions = () => {
    const suggestions = [
      'Try adding some percussion to enhance the rhythm',
      'A bass line would complement your current tracks well',
      'Consider adding some ambient sounds for texture',
      'Your track might benefit from some vocal samples',
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  return (
    <div className="sample-browser">
      <div className="sample-browser-header">
        <h3 className="sample-browser-title">Sample Browser</h3>
      </div>
      
      <div className="sample-browser-body">
        {/* Search */}
        <div className="sample-browser-search">
          <div className="relative flex-grow">
            <div className="sample-browser-search-icon">
              <FaSearch size={14} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for samples..."
              className="sample-browser-search-input w-full"
            />
          </div>
          <button
            onClick={searchSamples}
            className="sample-browser-search-button"
          >
            Search
          </button>
        </div>
        
        {/* Categories */}
        <div className="sample-browser-categories custom-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setPage(1);
              }}
              className={`sample-browser-category ${
                selectedCategory === category.id ? 'active' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* AI Suggestions */}
        {/* <div className="mb-4">
          <button
            onClick={getAiSuggestions}
            className="studio-btn studio-btn-purple w-full flex items-center justify-center"
          >
            <FaLightbulb className="mr-2" size={14} />
            Get AI Suggestions
          </button>
        </div> */}
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
            <p>{error}</p>
          </div>
        )}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Sample List */}
        <div className="sample-browser-list custom-scrollbar">
          {samples.length > 0 ? (
            samples.map((sample) => (
              <div key={sample.id} className="sample-item">
                <div className="sample-item-header">
                  <div className="sample-item-info">
                    <h4 className="sample-item-title" title={sample.name}>{sample.name}</h4>
                    <p className="sample-item-description">{sample.description.substring(0, 100)}...</p>
                    <div className="flex items-center mt-1 text-gray-400 text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {sample.duration.toFixed(1)}s
                    </div>
                  </div>
                  <div className="sample-item-actions">
                    <button
                      onClick={() => togglePlay(sample)}
                      className="sample-item-button sample-item-play"
                      title={playing === sample.id ? "Pause" : "Play"}
                    >
                      {playing === sample.id ? <FaPause size={14} /> : <FaPlay size={14} />}
                    </button>
                    <button
                      onClick={() => addSample(sample)}
                      className="sample-item-button sample-item-add"
                      title="Add to project"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>
                <div className="sample-item-tags">
                  {sample.tags && sample.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="sample-item-tag"
                      title={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p className="text-gray-400 text-sm">
                {query || selectedCategory !== 'all'
                  ? 'No samples found matching your criteria.'
                  : 'Search for samples or select a category to get started.'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {samples.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`studio-btn !text-white ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaChevronLeft className="mr-2" size={12} /> Prev
            </button>
            <div className="text-sm text-gray-300">
              Page {page} of {Math.ceil(totalCount / 10)}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * 10 >= totalCount}
              className={`studio-btn !text-white ${page * 10 >= totalCount ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next <FaChevronRight className="ml-2" size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleBrowser;
