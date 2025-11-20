import React from 'react';
import VideoCard from './VideoCard';
import { useTheme } from '../context/useTheme.js';

export default function VideoGrid({ videos, onSelect }) {
        const { lightMode } = useTheme();
  if (!videos || videos.length === 0) {
    // return <div className="bg-neutral-600 text-white rounded-2xl p-6 rounded shadow text-center">No videos loaded</div>;
    return <div className={`${lightMode?"bg-[#EEEBD3] text-black":"bg-neutral-600 text-white"} p-6 rounded shadow text-center`}>No videos loaded</div>;

  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map(v => <VideoCard key={v.videoId} video={v} onSelect={() => onSelect(v)} />)}
    </div>
  );
}