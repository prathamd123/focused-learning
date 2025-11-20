import React, { useEffect } from 'react';
import { useTheme } from '../context/useTheme.js';


export default function FocusPlayer({ videoId, title, videos = [], onNext }) {
    const { lightMode } = useTheme();
  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        // handle exit if needed
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!videoId) {
    return (
      <div className="bg-neutral-600 p-6 rounded shadow text-center text-white">
        Select a video to play
      </div>
    );
  }

  const currentIndex = videos.findIndex((v) => v.videoId === videoId);
  const next =
    currentIndex >= 0 && currentIndex < videos.length - 1
      ? videos[currentIndex + 1]
      : null;
  const prev = currentIndex > 0 ? videos[currentIndex - 1] : null;

  return (
    <div className={`p-4 rounded-xl shadow ${lightMode?"bg-[#F8E9C5] text-black" : "bg-neutral-600 text-white"}`}>
      {/* Header with title + navigation */}
      <div className="flex items-center justify-between mb-3">
        <div className={`font-semibold text-lg ${lightMode?"text-black":"text-white"} `}>{title}</div>
        <div className="flex gap-2">
          {prev && (
            <button
              onClick={() => onNext(prev)}
              // className={`px-3 py-1 border border-gray-300 rounded-md hover:text-black cursor-pointer hover:bg-gray-100 ${lightMode?"bg-white text-black":"bg-neutral-800 text-white"}`}
              className={`px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 ${lightMode?"bg-white text-black":" hover:bg-neutral-600 text-white"}`}
            >
              Prev
            </button>
          )}
          {next && (
            <button
              onClick={() => onNext(next)}
              // className="px-3 py-1 border border-gray-300 text-white hover:text-black cursor-pointer rounded-md hover:bg-gray-100"
              className={`px-3 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 ${lightMode?"bg-white text-black":" hover:bg-neutral-600 text-white"}`}

            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* YouTube Player */}
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&color=white`}
          title={title || "YouTube video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}