import React from "react";

export default function VideoList({ videos, currentVideoId, onSelect, progress, toggleProgress }) {
  return (
    <div className="bg-neutral-600 p-4 rounded shadow max-h-[80vh] overflow-y-auto">
      <h3 className="font-semibold mb-3 text-white font-['Poppins]">Playlist Videos</h3>
      {!videos.length && (
        <p className="text-sm text-white">No videos loaded</p>
      )}
      <ul className="space-y-2">
        {videos.map((v, i) => {
          const isActive = v.videoId === currentVideoId;
          const isCompleted = progress[v.videoId];
          return (
            <li
              key={v.videoId}
              className={`flex items-center text-white justify-between p-2 rounded cursor-pointer ${
                isActive ? "bg-gray-800 text-neutral-900 border-l-4 border-blue-600" : "hover:bg-gray-700"
              }`}
              onClick={() => onSelect(v)}
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{i + 1}. {v.title}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProgress(v.videoId);
                }}
                className={`ml-3 text-xs px-2 py-1 rounded border ${
                  isCompleted ? "bg-green-500 text-white border-green-600" : "border-gray-300 text-white"
                }`}
              >
                {isCompleted ? "Done" : "Mark"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}