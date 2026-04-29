# ytee


[![](https://data.jsdelivr.com/v1/package/npm/ytee/badge)](https://www.jsdelivr.com/package/npm/ytee)

> A lightweight, intuitive wrapper for the YouTube Data API to generate tree-like structures of channels, playlists, and videos.

[![npm version](https://shields.io)](https://npmjs.com)
[![license](https://shields.io)](https://github.com)

Tired of digging through complex YouTube Data API responses just to list out a channel's structure? **ytee** abstracts the API chaos and gives you a clean, structured tree representation of YouTube content.

## 🚀 Features
- **Tree Generation:** Automatically maps out playlists and their videos in a visual hierarchy.
- **Lightweight:** Zero bloat, focusing strictly on data fetching and organization.
- **Easy Integration:** Works perfectly with both CommonJS and ES Modules.

## 📦 Installation
```bash
npm install ytee
```

## 🛠️ Quick Start
```javascript
const ytee = require('ytee');

// Initialize with your YouTube API Key
const yt = new ytee('YOUR_API_KEY');

// Fetch a tree representation of a playlist
yt.getPlaylistTree('PLAYLIST_ID')
  .then(tree => console.log(tree))
  .catch(err => console.error(err));
```

## 📄 License
MIT © [Your Name / @dev0ps221]
