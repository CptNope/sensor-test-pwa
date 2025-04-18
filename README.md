# Sensor + Media Test PWA

A minimal Progressive Web App (PWA) that demonstrates:

- **Sensor access** (Accelerometer & Gyroscope via Generic Sensor API or fallbacks)
- **Media access** (Camera preview, video recording, microphone recording)
- **PWA install prompt** with a custom “Install App” button
- Offline support via Service Worker caching

---

## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation & Deployment](#installation--deployment)
6. [Usage](#usage)
7. [How It Works](#how-it-works)
   - [Sensors](#sensors)
   - [Media (Camera & Mic)](#media-camera--mic)
   - [PWA Install](#pwa-install)
   - [Service Worker](#service-worker)
8. [Browser & Device Support](#browser--device-support)
9. [Known Issues](#known-issues)
10. [License](#license)

---

## Features

- **Sensor Detection**: Checks for support of the Accelerometer and Gyroscope, and requests permission at runtime.
- **Live Readings**: Displays real‑time x/y/z values for supported sensors.
- **Camera Preview**: Starts/stops camera stream (video + audio) in a `<video>` element.
- **Video Recording**: Records camera stream to WebM, then plays it back.
- **Audio Recording**: Records microphone input to WebM, then plays it back.
- **Install Prompt**: Shows a custom “Install App” button when the PWA install event is available.
- **Offline Cache**: Caches the core assets for offline usage via a simple Service Worker.

---

## Demo

> **Live URL**: https://CptNope.github.io/sensor-test-pwa/

View this demo on a secure (HTTPS) origin and install it on your phone.

---

## Project Structure

```
sensor-test-pwa/
├── index.html           # Single-page app UI + logic
├── manifest.json        # PWA manifest
├── service-worker.js    # Service Worker for caching
└── icons/
    ├── icon-192.png     # 192×192 PWA icon
    └── icon-512.png     # 512×512 PWA icon
```

---

## Prerequisites

- A modern browser (Chrome, Edge, Firefox) on Android or desktop
- HTTPS hosting (GitHub Pages, Netlify, Vercel, etc.)
- (Optional) iPhone/iPad with iOS 16+ for limited PWA support via “Add to Home Screen”

---

## Installation & Deployment

1. **Fork or clone** this repository:
   ```bash
   git clone https://github.com/CptNope/sensor-test-pwa.git
   cd sensor-test-pwa
   ```

2. **Add your icons** under `icons/` (192×192 and 512×512).

3. **Push** to GitHub:
   ```bash
   git add .
   git commit -m "Initial PWA setup"
   git push origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repo’s **Settings → Pages**
   - Set **Source** to `main` branch, `/ (root)` folder
   - Save; wait for the URL to publish

5. Open `https://CptNope.github.io/sensor-test-pwa/` over HTTPS.

---

## Usage

1. **Visit** the live URL on your mobile device or desktop.
2. **Install** the PWA:
   - Android: Tap **Install App** when it appears, or use the browser’s menu.
   - iOS: Tap **Share → Add to Home Screen**.
3. **Test Sensors**:
   - Tap **Enable** under each sensor section.
   - Grant permission when prompted.
   - Observe live readings.
4. **Test Camera & Video**:
   - Tap **Start Camera** to begin preview.
   - Tap **Start Video Recording** to record, then **Stop**.
   - Playback appears below.
5. **Test Audio**:
   - Tap **Start Audio Recording**, then **Stop**.
   - Playback appears via audio controls.
6. **Go Offline**:
   - Reload the page while offline; the app shell still loads from cache.

---

## How It Works

### Sensors

- Detects support for the **Generic Sensor API** (`Accelerometer`, `Gyroscope`) and falls back to `devicemotion`/`deviceorientation` events.
- Uses the **Permissions API** to request sensor access at runtime.
- Updates the DOM with status and live readings.

### Media (Camera & Mic)

- Uses `navigator.mediaDevices.getUserMedia()` to request **video** (with audio) or **audio only**.
- Streams camera preview into a `<video>` element (muted).
- Records media with `MediaRecorder`, collects data chunks, then creates a **Blob** for playback.

### PWA Install

- Listens for the `beforeinstallprompt` event to capture the install prompt.
- Shows a custom **Install App** button, which calls `.prompt()` on the deferred event.
- Hides the button after the user accepts or dismisses.
- iOS Safari does not support `beforeinstallprompt`; users must use the **Share** menu.

### Service Worker

- Caches `index.html`, `manifest.json`, and any icons on install.
- Serves cached assets on fetch for offline support.

```js
// service-worker.js excerpt
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open('sensor-pwa-v1').then(cache =>
      cache.addAll(['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'])
    )
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request))
  );
});
```

---

## Browser & Device Support

| Feature              | Chrome Android | Firefox Android | Safari iOS | Edge Android |
|----------------------|:--------------:|:---------------:|:----------:|:------------:|
| Accelerometer API    | ✅             | ❓ (partial)     | ❌         | ✅           |
| DeviceMotion fallback| ✅             | ✅              | ✅ (gesture) | ✅         |
| MediaRecorder        | ✅             | ✅              | ❌ (partial) | ✅          |
| PWA Install Prompt   | ✅             | ❌              | ❌         | ✅           |
| Service Worker       | ✅             | ✅              | ✅         | ✅           |

---

## Known Issues

- **iOS**: Limited support for `MediaRecorder` and no `beforeinstallprompt`; use manual install via Share.
- **Permissions**: Chrome requires a secure origin (HTTPS) and user interaction to prompt for motion sensors.
- **File Types**: Video is recorded in WebM; some browsers may not natively play WebM containers.

---

## License

MIT © <Your Name>
