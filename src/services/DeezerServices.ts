import axios from 'axios';
import { DEEZER_API_URL } from "../constants/global";

const deezerApi = {
    // Search
    searchTracks: (query) =>
        axios.get(`${DEEZER_API_URL}/search`, {
            params: {
                q: query
            }
        }).then(res => res.data)
};

export default deezerApi;