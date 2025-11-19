import React, { useState } from 'react';

export default function PlaylistForm({ onFetch, onSave, loading }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleFetch = () => {
    if (!url.trim()) return alert('Paste playlist URL or ID');
    onFetch(url.trim());
  };

  const handleSave = () => {
    if (!url.trim()) return alert('Paste playlist URL or ID first');
    onSave(title.trim() || 'Untitled Playlist', url.trim());
    setTitle('');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Paste YouTube playlist link or id..."
        />
        <button onClick={handleFetch} disabled={loading} className="px-4 py-2 rounded bg-green-600 text-white">
          {loading ? 'Loading...' : 'Load'}
        </button>
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Give a name to save playlist (optional)"
        />
        <button onClick={handleSave} className="px-4 py-2 border rounded">Save</button>
      </div>
    </div>
  );
}