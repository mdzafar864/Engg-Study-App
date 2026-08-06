# Engg Study

A lightweight, responsive web app for engineering students. Select a
**Branch**, then a **Semester**, then a **Subject**, and the matching
YouTube lecture playlist opens in a modal player. Pure HTML, CSS, and
vanilla JavaScript — no build step, no framework, no server required.

## UI

Single centered card on a light background: logo + title, three
stacked dropdowns, a gold "Watch Playlist" button, a status message
strip, and a tag cloud showing every subject in the selected
branch/semester. "Watch Playlist" opens the video in a full-screen
modal with Close / Open in YouTube buttons. "Developer Info" opens a
second modal with your details (photo, name, role, email, LinkedIn,
YouTube channel), and "Install App" triggers the PWA install prompt.

**Before deploying:** open `index.html` and fill in the "EDIT ME"
block right above the Developer Info modal — swap the placeholder
photo, name, role, email, LinkedIn URL and YouTube link for your own.

## File structure

```
engg-study/
├── index.html            Page markup
├── manifest.json          PWA metadata (name, icon, theme color)
├── service-worker.js       Caches the app shell for offline/flaky use
├── robots.txt               Search-engine crawl rules
├── sitemap.xml                Search-engine page listing
├── css/
│   └── style.css                All styling
├── js/
│   ├── data.js                   Branches, semesters, subjects, playlist ids
│   └── app.js                     Dropdown + player logic
├── assets/
│   └── logo.png                    App logo
└── README.md
```

**Before deploying:** `robots.txt` and `sitemap.xml` use a placeholder
domain (`www.engg-study.example.com`) — replace it with your real
domain once you know where the app will live.

The service worker only caches the app shell (HTML/CSS/JS/logo) so the
dropdown UI still loads offline; YouTube playlist embeds always need a
live connection and are left untouched by the cache.

## Adding or editing content

All content lives in `js/data.js` — nothing else needs to change.

1. **Branches** — add an entry to the `BRANCHES` array:
   ```js
   { id: "it", name: "Information Technology", short: "IT" }
   ```
2. **Semesters** — `SEMESTERS` is `[1, 2, ... 8]`; edit if your program
   uses a different range.
3. **Subjects & playlists** — add an entry under `SUBJECTS[branchId][semesterNumber]`:
   ```js
   { name: "Data Structures", playlistId: "PLxxxxxxxxxxxxxxxxxxxxxxxx" }
   ```
   Find the playlist id in the YouTube URL after `list=`, e.g.
   `https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT`
   → id is `PLxCzCOWd7aiEwaANNt3OqJPVIxwp2ebiT`.

   Any subject left as `"REPLACE_WITH_PLAYLIST_ID"` shows a friendly
   "playlist not added yet" message instead of a broken embed, so you
   can ship the app before every subject has a playlist.

## Running locally

No build tools needed — just serve the folder:

```bash
cd engg-study
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly by double-clicking also works, since
everything is plain HTML/CSS/JS with no bundler.)

## Deploying

This is a static site, so it deploys anywhere that serves static
files:

- **GitHub Pages** — push the folder to a repo, enable Pages on the
  `main` branch.
- **Netlify / Vercel** — drag-and-drop the folder, or connect the repo.
- **Any static host** (S3, Firebase Hosting, Cloudflare Pages) — upload
  the folder as-is.

No environment variables, API keys, or backend are required.
