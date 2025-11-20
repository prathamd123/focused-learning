import React, { useState } from 'react';
import { toast } from "sonner";

export default function PlaylistForm({ onFetch, onSave, loading }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleFetch = () => {
    if (!url.trim()) return toast.warning('Paste playlist URL or ID');
    onFetch(url.trim());
  };

  const handleSave = () => {
    if (!url.trim()) return toast.warning('Provide URL and Name ');
    onSave(title.trim() || 'Untitled Playlist', url.trim());
    setTitle('');
     toast.success("Playlist Saved!");
  };

  return (
    <div className="bg-neutral-800 text-white p-4 rounded shadow">
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border px-3 py-2 rounded focus:outline-none"
          placeholder="Paste YouTube playlist link or id..."
        />
        <button onClick={handleFetch} disabled={loading} className="px-4 py-2 rounded bg-green-700 opacity-90 text-white cursor-pointer hover:opacity-100">
          {loading ? 'Loading...' : 'Load'}
        </button>
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded focus:outline-none"
          placeholder="Give a name to save playlist (optional)"
        />
        <button onClick={handleSave} className="px-4 py-2 border rounded cursor-pointer">Save</button>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { toast } from "sonner";
// import { ChevronDown, ChevronUp } from "lucide-react";

// export default function PlaylistForm({ onFetch, onSave, loading }) {
//   const [url, setUrl] = useState('');
//   const [title, setTitle] = useState('');
//   const [open, setOpen] = useState(true); // 👈 toggle state

//   const handleFetch = () => {
//     if (!url.trim()) return toast.warning('Paste playlist URL or ID');
//     onFetch(url.trim());
//   };

//   const handleSave = () => {
//     if (!url.trim()) return toast.warning('Provide URL and Name');
//     onSave(title.trim() || 'Untitled Playlist', url.trim());
//     setTitle('');
//     toast.success("Playlist Saved!");
//   };

//   return (
//     <div className="bg-neutral-800 text-white rounded shadow border border-neutral-700">
      
//       {/* TOP BAR WITH TOGGLE */}
//       <div
//         className="flex items-center justify-between px-4 py-3 cursor-pointer border-b border-neutral-700"
//         onClick={() => setOpen(!open)}
//       >
//         <h3 className="font-semibold text-lg">{ !open ?"Add A New Playlist":"Collapse this"}</h3>
//         {open ? (
//           <ChevronUp className="w-5 h-5" />
//         ) : (
//           <ChevronDown className="w-5 h-5" />
//         )}
//       </div>

//       {/* COLLAPSIBLE CONTENT */}
//       <div
//         className={`transition-all duration-300 overflow-hidden ${
//           open ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="p-4">

//           {/* Row 1 */}
//           <div className="flex gap-2">
//             <input
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               className="flex-1 border border-neutral-600 bg-neutral-900 px-3 py-2 rounded focus:outline-none focus:ring-0 focus:border-cyan-400"
//               placeholder="Paste YouTube playlist link or id..."
//             />

//             <button
//               onClick={handleFetch}
//               disabled={loading}
//               className="px-4 py-2 rounded bg-green-700 text-white opacity-90 hover:opacity-100 disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : 'Load'}
//             </button>
//           </div>

//           {/* Row 2 */}
//           <div className="mt-3 flex gap-2 items-center">
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="flex-1 border border-neutral-600 bg-neutral-900 px-3 py-2 rounded focus:outline-none focus:ring-0 focus:border-cyan-400"
//               placeholder="Give a name to save playlist (optional)"
//             />

//             <button
//               onClick={handleSave}
//               className="px-4 py-2 border border-neutral-600 rounded bg-neutral-900 hover:bg-neutral-700"
//             >
//               Save
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }