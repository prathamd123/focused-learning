import React from "react";
import { useTheme } from '../context/useTheme.js';

export default function VideoList({ videos, currentVideoId, onSelect, progress, toggleProgress }) {
    const { lightMode } = useTheme();
  
  return (
    <div className={`p-4 rounded shadow max-h-[80vh] overflow-y-auto ${lightMode?"bg-[#EEEBD3] text-black" : "bg-neutral-600 text-white"}` }>
      <h3 className={`font-semibold mb-3 ${lightMode?"text-black":"text-white"} font-['Poppins]`}>Playlist Videos</h3>
      {!videos.length && (
        <p className={`text-sm ${lightMode?"text-black":"text-white"}`}>No videos loaded</p>
      )}
      <ul className="space-y-2">
        {videos.map((v, i) => {
          const isActive = v.videoId === currentVideoId;
          const isCompleted = progress[v.videoId];
          return (
            <li
              key={v.videoId}
              className={`flex items-center justify-between p-2 rounded cursor-pointer
                ${lightMode?"text-black":"text-white"}
                ${
                isActive ? "bg-gray-400 text-neutral-900 border-l-4 border-[#A1BC98]" : ""
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