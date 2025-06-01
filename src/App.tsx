import { useState } from "react";
import PlaylistsView from "./views/PlaylistsView";
import TracksView from "./views/TracksView";
import SearchView from "./views/SearchView";
import { Playlist, DeezerTrack } from "./types";
import { usePlaylistTracks } from "./hooks/usePlaylistTracks"; // For the addTrackToPlaylist function

type ViewState = "playlists" | "tracks" | "search";

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>("playlists");
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const {
    addTrackToPlaylist,
    loadPlaylistTracks: reloadTracksForSelectedPlaylist,
  } = usePlaylistTracks(selectedPlaylist?.id || null);

  const handleOpenPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView("tracks");
  };

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null);
    setCurrentView("playlists");
  };

  const handleBackToTracks = () => {
    setCurrentView("tracks");
    if (selectedPlaylist) {
      reloadTracksForSelectedPlaylist(selectedPlaylist.id);
    }
  };

  const handleOpenSearch = () => {
    setCurrentView("search");
  };

  const handleAddTrackAndGoBack = async (track: DeezerTrack) => {
    if (!selectedPlaylist) return;
    await addTrackToPlaylist(track);
    setCurrentView("tracks");
    reloadTracksForSelectedPlaylist(selectedPlaylist.id);
  };

  if (currentView === "tracks") {
    return (
      <TracksView
        selectedPlaylist={selectedPlaylist}
        onBack={handleBackToPlaylists}
        onOpenSearch={handleOpenSearch}
      />
    );
  }

  if (currentView === "search") {
    return (
      <SearchView
        selectedPlaylist={selectedPlaylist}
        onBack={handleBackToTracks}
        onAddTrackToPlaylist={handleAddTrackAndGoBack}
      />
    );
  }

  // Default view: playlists
  return <PlaylistsView onOpenPlaylist={handleOpenPlaylist} />;
};

export default App;
