import React, { useState } from 'react';
import { FaLightbulb, FaSpinner, FaMagic } from 'react-icons/fa';

const AiAssistant = ({ tracks, onSuggestionApply }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  
  // Beatoven.ai API configuration
  const BASE_URL = "https://public-api.beatoven.ai";
  const API_KEY = "zfxk-nQ9Zkfnn82IdA-R1w";
  
  const generateSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the Beatoven.ai API
      // For now, we'll simulate the API response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock suggestions
      const mockSuggestions = [
        {
          id: 1,
          type: 'mixing',
          description: 'Try reducing the bass frequencies on track 2 to prevent masking the vocals',
          difficulty: 'easy'
        },
        {
          id: 2,
          type: 'arrangement',
          description: 'Your track might benefit from a bridge section around the 1:30 mark',
          difficulty: 'medium'
        },
        {
          id: 3,
          type: 'effects',
          description: 'Add some reverb to the vocals to create more space in the mix',
          difficulty: 'easy'
        }
      ];
      
      setSuggestions(mockSuggestions);
    } catch (err) {
      console.error('Error generating suggestions:', err);
      setError('Failed to generate suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="ai-assistant studio-card slide-in">
      <div className="ai-assistant-header">
        <div className="ai-assistant-icon">
          <FaLightbulb className="text-yellow-400" size={16} />
        </div>
        <h3 className="ai-assistant-title">AI Assistant</h3>
      </div>
      
      <div className="ai-assistant-body">
        <button
          onClick={generateSuggestions}
          disabled={loading || tracks?.length === 0}
          className={`studio-btn w-full py-2.5 flex items-center justify-center ${
            loading || tracks?.length === 0 ? 'opacity-50 cursor-not-allowed' : 'studio-btn-primary'
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" size={16} />
              Generating...
            </span>
          ) : (
            <span className="flex items-center">
              <FaMagic className="mr-2" size={16} />
              Get AI Suggestions
            </span>
          )}
        </button>
        
        {error && (
          <div className="studio-error-message">
            <p className="studio-error-text">{error}</p>
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="ai-suggestions-container">
            <h4 className="ai-suggestions-heading">Suggestions:</h4>
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="ai-suggestion-card">
                <div className="ai-suggestion-content">
                  <p className="ai-suggestion-description">{suggestion.description}</p>
                  <span className={`ai-suggestion-difficulty ${
                    suggestion.difficulty === 'easy' ? 'difficulty-easy' :
                    suggestion.difficulty === 'medium' ? 'difficulty-medium' :
                    'difficulty-hard'
                  }`}>
                    {suggestion.difficulty}
                  </span>
                </div>
                <div className="ai-suggestion-actions">
                  <button
                    onClick={() => onSuggestionApply(suggestion)}
                    className="studio-btn studio-btn-small studio-btn-success"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;