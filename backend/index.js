require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const YT_KEY = process.env.YOUTUBE_API_KEY;
if (!YT_KEY) {
  console.warn('Warning: No YOUTUBE_API_KEY found in environment');
}

// helper to extract playlist ID from common YouTube playlist URLs or raw id
function extractPlaylistId(input) {
  if (!input) return null;
  try {
    const url = new URL(input);
    if (url.searchParams.has('list')) return url.searchParams.get('list');
    // sometimes users paste a yt share url with v= or short forms — fallback to path
    const path = url.pathname;
    // fallback: try common youtube short forms (rare)
    return input; // let API handle invalid id
  } catch (e) {
    // not a URL -> assume it's the playlist id itself
    return input;
  }
}

// Fetch all items from playlist (handles pagination)
async function fetchPlaylistItems(playlistId) {
  const items = [];
  let pageToken = undefined;

  do {
    const params = {
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId,
      key: YT_KEY,
      pageToken
    };

    const resp = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', { params });
    const data = resp.data;
    (data.items || []).forEach(item => {
      let vidId = null;

if (item.snippet?.resourceId?.videoId) {
  vidId = item.snippet.resourceId.videoId;
}
if (!vidId && item.contentDetails?.videoId) {
  vidId = item.contentDetails.videoId;
}

      items.push({
        videoId: vidId,
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnails: item.snippet?.thumbnails,
        publishedAt: item.snippet?.publishedAt,
      });
    });

    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

app.post('/api/playlist', async (req, res) => {
  try {
    const { playlistUrl } = req.body;
    if (!playlistUrl) {
  return res.status(400).json({
    success: false,
    message: "Please enter a playlist URL."
  });
}
    // if (!playlistUrl)  return res.status(400).json({ error: 'playlistUrl missing' });

    const playlistId = extractPlaylistId(playlistUrl);
    const items = await fetchPlaylistItems(playlistId);

    return res.json({ items });
  } catch (err) {
    console.error('Error fetching playlist:', err.response?.data || err.message || err);
    return res.status(500).json({
  success: false,
  message: "Playlist fetch failed. Check your playlist URL.",
  error: err?.response?.data?.error || err.message
});
    // return res.status(500).json({
    //   error: 'Failed to fetch playlist',
    //   details: err.response?.data || err.message
    // });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));