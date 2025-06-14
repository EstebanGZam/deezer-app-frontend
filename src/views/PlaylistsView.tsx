// src/views/PlaylistsView.tsx
import React from "react";
import { Music, Plus } from "lucide-react";
import Header from "../components/Header";
import PlaylistCard from "../components/PlaylistCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePlaylists } from "../hooks/usePlaylists";
import { Playlist } from "../types";

interface PlaylistsViewProps {
  onOpenPlaylist: (playlist: Playlist) => void;
}

const PlaylistsView: React.FC<PlaylistsViewProps> = ({ onOpenPlaylist }) => {
  const {
    playlists,
    loading,
    newPlaylistName,
    setNewPlaylistName,
    newPlaylistMood, // Nuevo estado para el mood
    setNewPlaylistMood, // Nuevo setter para el mood
    createPlaylist,
    deletePlaylist,
  } = usePlaylists();

  const handleDeletePlaylist = (playlistId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta playlist?")) {
      deletePlaylist(playlistId);
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() && newPlaylistMood.trim()) {
      createPlaylist();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Mis Playlists"
        action={
          <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Nombre de la playlist..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black flex-1"
              />
              <input
                type="text"
                value={newPlaylistMood}
                onChange={(e) => setNewPlaylistMood(e.target.value)}
                placeholder="Mood (ej: Feliz, Triste...)"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black flex-1"
              />
            </div>
            <button
              onClick={handleCreatePlaylist}
              disabled={!newPlaylistName.trim() || !newPlaylistMood.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Crear</span>
            </button>
          </div>
        }
      />

      <div className="w-full p-6">
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
                onClick={() => onOpenPlaylist(playlist)}
                onDelete={() => handleDeletePlaylist(playlist.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistsView;
