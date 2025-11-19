import React, { useEffect } from 'react';

export default function FocusPlayer({ videoId, title, videos = [], onNext }) {
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
      <div className="bg-white p-6 rounded shadow text-center text-gray-600">
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
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Header with title + navigation */}
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold text-lg text-gray-800">{title}</div>
        <div className="flex gap-2">
          {prev && (
            <button
              onClick={() => onNext(prev)}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Prev
            </button>
          )}
          {next && (
            <button
              onClick={() => onNext(next)}
              className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
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