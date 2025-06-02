import { Music, Trash2 } from "lucide-react";

const PlaylistCard = ({ playlist, onClick, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
    <div onClick={onClick} className="flex items-center space-x-4">
      <div className="bg-purple-100 p-3 rounded-full">
        <Music className="w-6 h-6 text-purple-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{playlist.name}</h3>
        <p className="text-gray-500">Mood • {playlist.mood || 0}</p>
      </div>
    </div>
    {onDelete && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(playlist.id);
        }}
        className="mt-3 text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  </div>
);

export default PlaylistCard;
