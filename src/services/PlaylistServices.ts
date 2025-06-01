import axios from 'axios';
import { PLAYLIST_API_URL } from "../constants/global";

const playlistApi = {
    // Playlists
    getPlaylists: () => axios.get(PLAYLIST_API_URL).then(res => res.data),
    createPlaylist: (name) => 
        axios.post(PLAYLIST_API_URL, { name }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.data),
    deletePlaylist: (id) => 
        axios.delete(`${PLAYLIST_API_URL}/${id}`),

    // Tracks
    getPlaylistTracks: (playlistId) => 
        axios.get(`${PLAYLIST_API_URL}/${playlistId}/tracks`).then(res => res.data),
    addTrackToPlaylist: (playlistId, trackId, trackData) => 
        axios.post(`${PLAYLIST_API_URL}/${playlistId}/tracks/${trackId}`, trackData, {
            headers: { 'Content-Type': 'application/json' }
        }),
    removeTrackFromPlaylist: (playlistId, trackId) => 
        axios.delete(`${PLAYLIST_API_URL}/${playlistId}/tracks/${trackId}`),
};

export default playlistApi;