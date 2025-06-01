// src/hooks/usePlaylistTracks.ts
import { useState, useCallback } from 'react';
import playlistApi from '../services/PlaylistServices';
import { Track, DeezerTrack, TrackData } from '../types';

export const usePlaylistTracks = (playlistId: number | null) => {
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPlaylistTracks = useCallback(async (id: number) => {
    if (!id) return;
    try {
      setLoading(true);
      const tracks = await playlistApi.getPlaylistTracks(id);
      setPlaylistTracks(tracks);
    } catch (error) {
      console.error("Error loading tracks for playlist:", id, error);
      setPlaylistTracks([]); // Clean up in case of error
    } finally {
      setLoading(false);
    }
  }, []);

  const addTrackToPlaylist = async (deezerTrack: DeezerTrack) => {
    if (!playlistId) return;
    try {
      const trackData: TrackData = {
        title: deezerTrack.title,
        duration: deezerTrack.duration,
        rank: deezerTrack.rank,
        preview: deezerTrack.preview,
        artistName: deezerTrack.artist.name,
        albumTitle: deezerTrack.album.title,
        artistPicture: deezerTrack.artist.picture_medium,
        albumCover: deezerTrack.album.cover_medium,
      };
      await playlistApi.addTrackToPlaylist(playlistId, trackData);
      loadPlaylistTracks(playlistId); // Reload the songs in the playlist
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  const removeTrackFromPlaylist = async (trackId: number) => {
    if (!playlistId) return;
    try {
      await playlistApi.removeTrackFromPlaylist(playlistId, trackId);
      loadPlaylistTracks(playlistId); // Reload the songs
    } catch (error) {
      console.error("Error removing track:", error);
    }
  };

  return {
    playlistTracks,
    loadingTracks: loading, // Rename to avoid collision with loading from other hooks
    loadPlaylistTracks,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
  };
};