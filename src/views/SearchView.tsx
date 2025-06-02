// src/views/SearchView.tsx
import React from "react";
import { Search as SearchIcon } from "lucide-react"; // Renombrado para evitar colisión
import Header from "../components/Header";
import TrackItem from "../components/TrackItem";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTrackSearch } from "../hooks/useTrackSearch";
import { Playlist, DeezerTrack } from "../types";

interface SearchViewProps {
  selectedPlaylist: Playlist | null;
  onBack: () => void;
  onAddTrackToPlaylist: (track: DeezerTrack) => Promise<void>;
}

const SearchView: React.FC<SearchViewProps> = ({
  selectedPlaylist,
  onBack,
  onAddTrackToPlaylist,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    hasSearched,
    loadingSearch,
    searchTracks,
  } = useTrackSearch();

  const handleAddTrack = async (track: DeezerTrack) => {
    await onAddTrackToPlaylist(track);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={`Buscar para "${selectedPlaylist?.name || "playlist"}"`}
        onBack={onBack}
      />

      <div className="w-full p-6">
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={searchTracks}
            placeholder="Buscar canciones en Deezer..."
          />
        </div>

        {loadingSearch ? (
          <LoadingSpinner />
        ) : hasSearched && searchResults.length === 0 ? (
          searchQuery && (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
                track={track} // TrackItem will need to handle the DeezerTrack structure
                onRemove={() => {}}
                onAdd={() => handleAddTrack(track)}
                showAddButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
