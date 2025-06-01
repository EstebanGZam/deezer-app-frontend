// src/hooks/useTrackSearch.ts
import { useState } from 'react';
import deezerApi from '../services/DeezerServices';
import { DeezerTrack } from '../types';

export const useTrackSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [loading, setLoading] = useState(false);

  const searchTracks = async () => {
    if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
    }
    try {
      setLoading(true);
      const results = await deezerApi.searchTracks(searchQuery);
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
    // setSearchQuery(""); // Optional, depends on the desired behavior
  }

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loadingSearch: loading, // Rename
    searchTracks,
    clearSearchResults,
  };
};