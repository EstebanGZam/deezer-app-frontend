import axios from 'axios';
import { DEEZER_API_URL } from "../constants/global";
import { DeezerTrack } from '../types';

interface DeezerSearchResponse {
    data: DeezerTrack[];
    total: number;
    next: string;
}

const deezerApi = {
    searchTracks: async (query: string): Promise<DeezerSearchResponse> => {
        const response = await axios.get<DeezerSearchResponse>(`${DEEZER_API_URL}/search`, {
            params: {
                q: query
            }
        });
        return response.data;
    }
};

export default deezerApi;