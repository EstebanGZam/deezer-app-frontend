import axios from 'axios';
import { PLAYLIST_API_URL } from "../constants/global";
import { Playlist, Track, TrackData } from '../types/Playlist';

const playlistApi = {
    // Playlists
    getPlaylists: async (): Promise<Playlist[]> => {
        const results = axios.get<Playlist[]>(PLAYLIST_API_URL)
            .then(res => res.data)
            .catch(err => {
                console.error("Error fetching playlists:", err);
                return [];
            });
        return results;
     },
    createPlaylist: async (name: string, mood: string): Promise<Playlist> => {
        const createdPlaylist = axios.post<Playlist>(PLAYLIST_API_URL, { name, mood }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data)
            .catch(err => {
                console.error("Error creating playlist:", err);
                throw err;
            });
        return createdPlaylist;
    },

    deletePlaylist: async (id: number): Promise<void> => {
        try {
            await axios.delete(`${PLAYLIST_API_URL}/${id}`);
        } catch (err) {
            console.error(`Error deleting playlist with id ${id}:`, err);
            throw err; // Re-throw the error to allow the caller to handle it
        }
    },


    // Tracks
    getPlaylistTracks: (playlistId: number): Promise<Track[]> => 
        axios.get<Track[]>(`${PLAYLIST_API_URL}/${playlistId}/tracks`).then(res => res.data),

    addTrackToPlaylist: (playlistId: number, trackData: TrackData): Promise<void> => 
        axios.post<void>(`${PLAYLIST_API_URL}/${playlistId}/tracks`, trackData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data),
    
    removeTrackFromPlaylist: (playlistId: number, trackId: number): Promise<void> => 
        axios.delete<void>(`${PLAYLIST_API_URL}/${playlistId}/tracks/${trackId}`).then(res => res.data),
};

export default playlistApi;