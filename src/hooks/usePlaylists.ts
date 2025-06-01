// src/hooks/usePlaylists.ts
import { useState, useEffect, useCallback } from 'react';
import playlistApi from '../services/PlaylistServices';
import { Playlist } from '../types';

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistMood, setNewPlaylistMood] = useState(""); // Added state for playlist mood

  const loadPlaylists = useCallback(async () => {
    try {
      setLoading(true);
      const data = await playlistApi.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);

  const createPlaylist = async () => {
    if (!newPlaylistName.trim() || !newPlaylistMood.trim()) return; // Ensure mood is also provided
    try {
      setLoading(true)
      await playlistApi.createPlaylist(newPlaylistName, newPlaylistMood); // Pass mood as second argument
      setNewPlaylistName("");
      setNewPlaylistMood(""); // Reset mood input
      loadPlaylists(); // Reload the playlist list
    } catch (error) {
      console.error("Error creating playlist:", error);
    } finally {
      setLoading(false)
    }
  };

  const deletePlaylist = async (playlistId: number) => {
    // The confirm can stay in the view component or here.
    // If it stays here, this hook becomes less generic.
    // For now, I'll leave it in the view.
    try {
      setLoading(true)
      await playlistApi.deletePlaylist(playlistId);
      loadPlaylists(); // Reload the list
    } catch (error) {
      console.error("Error deleting playlist:", error);
    } finally {
      setLoading(false)
    }
  };
  return {
    playlists,
    loading,
    newPlaylistName,
    setNewPlaylistName,
    newPlaylistMood, // Expose newPlaylistMood
    setNewPlaylistMood, // Expose setNewPlaylistMood
    createPlaylist,
    deletePlaylist,
    reloadPlaylists: loadPlaylists, // In case you need to recharge manually from outside
  };
};