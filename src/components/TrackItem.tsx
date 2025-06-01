import React from 'react';
import { Play, Trash2 } from "lucide-react";


const TrackItem = ({ track, onRemove, onAdd, showAddButton = false }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
      <img 
        src={track.albumCover || track.album?.cover_medium || '/api/placeholder/60/60'} 
        alt={track.albumTitle || track.album?.title}
        className="w-15 h-15 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{track.title}</h4>
        <p className="text-gray-500">{track.artistName || track.artist?.name}</p>
        <p className="text-sm text-gray-400">{track.albumTitle || track.album?.title}</p>
        {track.duration && (
          <p className="text-xs text-gray-400">
            {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        {track.preview && (
          <button 
            onClick={() => window.open(track.preview, '_blank')}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <Play className="w-4 h-4" />
          </button>
        )}
        {showAddButton && onAdd && (
          <button
            onClick={() => onAdd(track)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Agregar
          </button>
        )}
        {onRemove && (
          <button
            onClick={() => onRemove(track.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
  
export default TrackItem;