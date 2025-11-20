import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import PlaylistForm from './components/PlaylistForm';
import VideoGrid from './components/VideoGrid';
import FocusPlayer from './components/FocusPlayer';
import { HiTrash } from "react-icons/hi"; // 👈 add this import at the top
import VideoList from './components/VideoList'; // 👈 new import
import axios from 'axios';
import { useTheme } from './context/useTheme.js';
import {Moon,Sun} from 'lucide-react';


export default function App() {
  const { lightMode, toggleLightMode } = useTheme();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [savedPlaylists, setSavedPlaylists] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedPlaylists') || '[]') } catch(e) { return []; }
  });

  // 👇 new state for progress
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem('progress') || '{}'); } catch(e) { return {}; }
  });

  // persist progress
  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('savedPlaylists', JSON.stringify(savedPlaylists));
  }, [savedPlaylists]);

  const fetchPlaylist = async (playlistUrl) => {
    setLoading(true);
    try {
      // const res = await axios.post('/api/playlist', { playlistUrl });
      const res = await axios.post(
  `https://focused-learning.onrender.com/api/playlist`,
  { playlistUrl }
);
      setVideos(res.data.items || []);
      if ((res.data.items || []).length > 0) {
        setCurrentVideo(res.data.items[0]);
        setFocusMode(true);
        toast.success("Playlist loaded!");
      }
    } catch (err) {
      console.error(err);
      // alert('Failed to fetch playlist. Check console for details.');
      toast.error('Failed to fetch playlist. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const savePlaylist = (title, url) => {
    setSavedPlaylists(prev => [{ id: Date.now(), title: title || 'Untitled', url }, ...prev]);
  };

  // 👇 helper functions
  const toggleProgress = (videoId) => {
    setProgress(prev => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <div className={`min-h-screen ${lightMode?"bg-[#FCF5EE]" : "bg-neutral-800"}  text-slate-900`}>
      <header className="bg-neutral-800 shadow p-4 flex items-center justify-between border-b border-neutral-700">
        <h1 className="text-xl text-white font-bold font-['Poppins']">Focused Learning</h1>
        <div className="flex items-center gap-2">
          <div onClick={toggleLightMode} className="px-3 py-1 text-white">
        {lightMode ? <Moon /> : <Sun />}
      </div>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`px-3 py-1 rounded bg-blue-600 text-white font-['Poppins'] ${focusMode ? 'bg-red-600' : 'bg-orange-400'} hover:opacity-90`}
          >
            {focusMode ? 'Exit Focus' : 'Focus Mode'}
          </button>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <PlaylistForm onFetch={fetchPlaylist} onSave={savePlaylist} loading={loading} />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {focusMode ? (
              <FocusPlayer
                videoId={currentVideo?.videoId}
                title={currentVideo?.title}
                videos={videos}
                onNext={(next) => setCurrentVideo(next)}
              />
            ) : (
              <VideoGrid videos={videos} onSelect={(v) => { setCurrentVideo(v); setFocusMode(true); }} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Playlist Videos List */}
            <VideoList
              videos={videos}
              currentVideoId={currentVideo?.videoId}
              onSelect={(v) => setCurrentVideo(v)}
              progress={progress}
              toggleProgress={toggleProgress}
            />

            {/* Saved playlists */}
            {/* Saved playlists */}
<div className={` ${lightMode?"bg-[#EEEBD3] text-black":"bg-neutral-600"} p-4 rounded shadow`}>
  <h3 className={`font-semibold mb-2 ${lightMode?"text-black":"text-white"} `}>Saved Playlists</h3>
  {!savedPlaylists.length ? (
    <p className={`text-sm ${lightMode?"text-black":"text-white"} `}>No saved playlists</p>
  ) : (
    <ul className={`space-y-2 ${lightMode?"text-black":"text-white"} `}>
      {savedPlaylists.map(p => (
        <li key={p.id} className="flex items-center justify-between">
          <div className="text-sm truncate w-32" title={p.title}>{p.title}</div>
          <div className="flex gap-2 items-center">
            <button
              className={`px-2 py-1 border rounded text-sm  ${lightMode?"text-black":"text-white"} hover:bg-blue-50`}
              onClick={() => fetchPlaylist(p.url)}
            >
              Load
            </button>
            <button
              className={`px-2 py-1 border rounded text-sm ${lightMode?"text-black":"text-white"}  hover:bg-green-50`}
              onClick={() => {
                navigator.clipboard?.writeText(p.url);
                toast.message('Playlist URL copied');
              }}
            >
              Copy
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this playlist?")) {
                  setSavedPlaylists(prev => prev.filter(item => item.id !== p.id));
                }
              }}
            >
              <HiTrash size={18} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>
          </aside>
        </div>
      </main>
    </div>
  );
}