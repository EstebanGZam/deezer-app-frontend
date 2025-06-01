import { useState, useEffect } from "react";
import { Music, Plus, Search } from "lucide-react";
import playlistApi from "./services/PlaylistServices";
import deezerApi from "./services/DeezerServices";

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState("playlists");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  // Load playlists on mount
  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      setLoading(true);
      const data = await playlistApi.getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPlaylistTracks = async (playlistId) => {
    try {
      setLoading(true);
      const tracks = await playlistApi.getPlaylistTracks(playlistId);
      setPlaylistTracks(tracks);
    } catch (error) {
      console.error("Error loading tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      await playlistApi.createPlaylist(newPlaylistName);
      setNewPlaylistName("");
      loadPlaylists();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta playlist?"))
      return;

    try {
      await playlistApi.deletePlaylist(playlistId);
      loadPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const searchTracks = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const results = await deezerApi.searchTracks(searchQuery);
      // Filter only tracks
      const tracks =
        results.data?.filter((item) => item.type === "track") || [];
      setSearchResults(tracks);
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTrackToPlaylist = async (track) => {
    try {
      const trackData = {
        title: track.title,
        duration: track.duration,
        rank: track.rank,
        preview: track.preview,
        artistName: track.artist.name,
        albumTitle: track.album.title,
        artistPicture: track.artist.picture_medium,
        albumCover: track.album.cover_medium,
      };

      await playlistApi.addTrackToPlaylist(
        selectedPlaylist.id,
        track.id,
        trackData
      );
      loadPlaylistTracks(selectedPlaylist.id);
    } catch (error) {
      console.error("Error adding track:", error);
    }
  };

  const removeTrackFromPlaylist = async (trackId) => {
    try {
      await playlistApi.removeTrackFromPlaylist(selectedPlaylist.id, trackId);
      loadPlaylistTracks(selectedPlaylist.id);
    } catch (error) {
      console.error("Error removing track:", error);
    }
  };

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView("tracks");
    loadPlaylistTracks(playlist.id);
  };

  const openSearch = () => {
    setCurrentView("search");
    setSearchQuery("");
    setSearchResults([]);
  };

  // Render Views
  const renderPlaylistsView = () => (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Mis Playlists"
        action={
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createPlaylist()}
              placeholder="Nueva playlist..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={createPlaylist}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Crear</span>
            </button>
          </div>
        }
      />

      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <LoadingSpinner />
        ) : playlists.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No tienes playlists aún. ¡Crea una para empezar!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => openPlaylist(playlist)}
                onDelete={deletePlaylist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderTracksView = () => (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={selectedPlaylist?.name || "Playlist"}
        onBack={() => setCurrentView("playlists")}
        action={
          <button
            onClick={openSearch}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar canciones</span>
          </button>
        }
      />

      <div className="max-w-4xl mx-auto p-6">
        {loading ? (
          <LoadingSpinner />
        ) : playlistTracks.length === 0 ? (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Esta playlist está vacía. ¡Agrega algunas canciones!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {playlistTracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                onRemove={removeTrackFromPlaylist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSearchView = () => (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={`Buscar canciones para "${selectedPlaylist?.name}"`}
        onBack={() => setCurrentView("tracks")}
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={searchTracks}
            placeholder="Buscar canciones en Deezer..."
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : searchResults.length === 0 ? (
          searchQuery && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No se encontraron resultados para "{searchQuery}"
              </p>
            </div>
          )
        ) : (
          <div className="space-y-3">
            {searchResults.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                onAdd={addTrackToPlaylist}
                showAddButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Main render
  switch (currentView) {
    case "tracks":
      return renderTracksView();
    case "search":
      return renderSearchView();
    default:
      return renderPlaylistsView();
  }
};

export default App;
