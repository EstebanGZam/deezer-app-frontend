import { useState } from 'react';
import deezerApi from '../services/DeezerServices';
import { DeezerTrack } from '../types';

export const useTrackSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchTracks = async () => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const results = await deezerApi.searchTracks(trimmedQuery);
      setSearchResults(results.data || []);
    } catch (error) {
      console.error("Error searching tracks:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadingSearch: loading, // Rename for clarity
    searchTracks,
    clearSearchResults,
    hasSearched,
  };
};
