// src/views/TracksView.tsx
import React, { useEffect } from "react";
import { Music, Plus } from "lucide-react";
import Header from "../components/Header";
import TrackItem from "../components/TrackItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { usePlaylistTracks } from "../hooks/usePlaylistTracks";
import { Playlist } from "../types";

interface TracksViewProps {
  selectedPlaylist: Playlist | null;
  onBack: () => void;
  onOpenSearch: () => void;
}

const TracksView: React.FC<TracksViewProps> = ({
  selectedPlaylist,
  onBack,
  onOpenSearch,
}) => {
  const {
    playlistTracks,
    loadingTracks,
    loadPlaylistTracks,
    removeTrackFromPlaylist,
  } = usePlaylistTracks(selectedPlaylist?.id || null);

  useEffect(() => {
    if (selectedPlaylist?.id) {
      loadPlaylistTracks(selectedPlaylist.id);
    }
  }, [selectedPlaylist, loadPlaylistTracks]);

  if (!selectedPlaylist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>No hay playlist seleccionada.</p>
        <button onClick={onBack} className="ml-4 px-4 py-2 underline">
          Volver
        </button>
      </div>
    );
  }

  const handleRemoveTrack = (trackId: number) => {
    removeTrackFromPlaylist(trackId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={selectedPlaylist.name}
        onBack={onBack}
        action={
          <button
            onClick={onOpenSearch}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar canciones</span>
          </button>
        }
      />

      <div className="w-full p-6">
        {loadingTracks ? (
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
                onAdd={() => {}}
                onRemove={() => handleRemoveTrack(track.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksView;
