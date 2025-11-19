import React from 'react';
import VideoCard from './VideoCard';

export default function VideoGrid({ videos, onSelect }) {
  if (!videos || videos.length === 0) {
    return <div className="bg-white p-6 rounded shadow text-center">No videos loaded</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map(v => <VideoCard key={v.videoId} video={v} onSelect={() => onSelect(v)} />)}
    </div>
  );
}