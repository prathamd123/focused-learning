// import React, { useState } from 'react';
// import { toast } from "sonner";
// import { useTheme } from '../context/useTheme.js';

// export default function PlaylistForm({ onFetch, onSave, loading }) {
//   const [url, setUrl] = useState('');
//   const [title, setTitle] = useState('');
//   const { lightMode } = useTheme();

//   const handleFetch = () => {
//     if (!url.trim()) return toast.warning('Paste playlist URL or ID');
//     onFetch(url.trim());
//   };

//   const handleSave = () => {
//     if (!url.trim()) return toast.warning('Provide URL and Name ');
//     onSave(title.trim() || 'Untitled Playlist', url.trim());
//     setTitle('');
//      toast.success("Playlist Saved!");
//   };

//   return (
//     <div className={`p-4  rounded shadow ${lightMode?"bg-[#FCF5EE] text-black" : "bg-neutral-800 text-white"}`}>
//       <div className="flex gap-2">
//         <input
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className={`flex-1 border px-3 py-2 rounded focus:outline-none ${lightMode?"placeholder-black":"placeholder-white"}`}
//           placeholder="Paste YouTube playlist link or id..."
//         />
//         <button onClick={handleFetch} disabled={loading} className="px-4 py-2 rounded bg-green-700 opacity-90 text-white cursor-pointer hover:opacity-100">
//           {loading ? 'Loading...' : 'Load'}
//         </button>
//       </div>

//       <div className="mt-3 flex gap-2 items-center">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className={`flex-1 border px-3 py-2 rounded focus:outline-none ${lightMode?"placeholder-black":"placeholder-white"}`}
//           placeholder="Give a name to save playlist (optional)"
//         />
//         <button onClick={handleSave} className="px-4 py-2 border rounded cursor-pointer">Save</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "../context/useTheme.js";

export default function PlaylistForm({ onFetch, onSave, loading }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(true); // collapse toggle
  const { lightMode } = useTheme();

  const handleFetch = () => {
    if (!url.trim()) return toast.warning("Paste playlist URL or ID");
    onFetch(url.trim());
  };

  const handleSave = () => {
    if (!url.trim()) return toast.warning("Provide URL and Name");
    onSave(title.trim() || "Untitled Playlist", url.trim());
    setTitle("");
    toast.success("Playlist Saved!");
  };

  return (
    <div
      className={`rounded shadow border 
      ${
        lightMode
          ? "bg-[#FCF5EE] text-black border-[#e2dccc]"
          : "bg-neutral-800 text-white border-neutral-700"
      }`}
    >
      {/* TOP COLLAPSE BAR */}
      <div
        className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b 
        ${
          lightMode
            ? "border-[#e2dccc] bg-[#f7efe5]"
            : "border-neutral-700 bg-neutral-900"
        }`}
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-lg">
          {open ? "Collapse" : "Add a New Playlist"}
        </h3>

        {open ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {/* COLLAPSIBLE CONTENT */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4">
          {/* URL INPUT + LOAD BUTTON */}
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`flex-1 border px-3 py-2 rounded focus:outline-none 
                ${
                  lightMode
                    ? "bg-white border-[#d7d1c3] text-black placeholder:text-[#444]"
                    : "bg-neutral-900 border-neutral-600 text-white placeholder:text-[#aaa]"
                }`}
              placeholder="Paste YouTube playlist link or id..."
            />

            <button
              onClick={handleFetch}
              disabled={loading}
              className={`px-4 py-2 rounded text-white hover:opacity-100 
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer opacity-90"
                }
                ${lightMode ? "bg-green-700" : "bg-green-600"}
              `}
            >
              {loading ? "Loading..." : "Load"}
            </button>
          </div>

          {/* TITLE INPUT + SAVE BUTTON */}
          <div className="mt-3 flex gap-2 items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`flex-1 border px-3 py-2 rounded focus:outline-none 
                ${
                  lightMode
                    ? "bg-white border-[#d7d1c3] text-black placeholder:text-[#444]"
                    : "bg-neutral-900 border-neutral-600 text-white placeholder:text-[#aaa]"
                }`}
              placeholder="Give a name to save playlist (optional)"
            />

            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded cursor-pointer 
                ${
                  lightMode
                    ? "bg-[#f7efe5] border border-[#d7d1c3] hover:bg-[#e9e1d6]"
                    : "bg-neutral-900 border border-neutral-600 hover:bg-neutral-700"
                }
              `}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}