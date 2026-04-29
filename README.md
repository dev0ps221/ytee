# ytee


[![](https://data.jsdelivr.com/v1/package/npm/ytee/badge)](https://www.jsdelivr.com/package/npm/ytee)

> An event-driven YouTube search and stream extractor operating entirely WITHOUT a YouTube API key.

[![npm version](https://shields.io)](https://npmjs.com)

Are you tired of dealing with Google Cloud quotas and API keys? **ytee** leverages powerful scrapers and extraction binaries under the hood. It delivers raw search results and actual stream arrays through a clean, event-driven architecture.

## 🚀 Features
- **API-Key Free:** Search and extract content without touching Google Console.
- **Event-Driven:** Uses the custom event-emitting logic of `@tek-tech/ears`.
- **Download Links:** Automatically parses direct `.mp4` URLs and filesizes.

## 📦 Installation
This package relies on Python 3.9+ under the hood to run `youtube-dl-exec` extraction properly.
```bash
npm install ytee
```

## 🛠️ Usage

### 🚦 Initialize and Search
The `Searcher` handles scraping YouTube. Hook into the `ready` event, and execute searches immediately.

```javascript
const { Searcher } = require('ytee');

// Wait for Searcher to initialize
Searcher.on('ready', () => {
    console.log('Searcher is ready to go!');
    
    Searcher.search('SpaceX Starship launch', (results) => {
         results.map(video => {
             console.log('Found Video:', video.getTitle());
             console.log('URL:', video.getData('url'));
         });
    });
});
```

### 📥 Hook into Download Streams
Each search result maps to a separate processing instance. You can wait on its internal ready state to pull raw formats and sizes.

```javascript
Searcher.on('ready', () => {
    Searcher.search('Lofi hip hop beats', (results) => {
        const firstVideo = results[0];

        // Wait for extraction to parse formats
        firstVideo.whenReady(() => {
            firstVideo.getDownloadLink('mp4', (linkData) => {
                if (linkData) {
                    console.log('MP4 URL:', linkData.dl_link);
                    console.log('Filesize:', linkData.filesize);
                }
            });
        });
    });
});
```

### 🎛️ Direct Download Instantiation
If you already have a target URL and don't need to search, initiate a single targeted dump.

```javascript
const { Download } = require('ytee');

const stream = new Download('https://youtube.com');

stream.whenGotData((data) => {
    console.log('Available formats:', data.requested_formats.map(f => f.ext));
});
```

## 📄 License
MIT © [El Hadji Seybatou Mbengue / @dev0ps221]
