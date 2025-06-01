// Represents a song within one of your playlists
export interface Track {
  id: number;
  title: string;
  duration: number;
  rank?: number;
  artistName: string;
  albumTitle: string;
  artistPicture?: string;
  albumCover?: string;
}

// Data sent to your API to add a song
export interface TrackData {
  title: string;
  duration: number;
  rank?: number;
  preview?: string;
  artistName: string;
  albumTitle: string;
  artistPicture?: string;
  albumCover?: string;
}

export interface Playlist {
  id: number;
  name: string;
  mood?: string;
}

// Type for Deezer song search results
export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: {
    id: number;
    name: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
  type: 'track'; // To make sure it's a song
}