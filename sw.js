const CACHE = 'passeport-v5';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './vocab.js',
  './app.js',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e)=>{
  // cache:'reload' bypasses the browser's HTTP cache, so a new version never
  // gets mixed with stale files (GitHub Pages caches files for ~10 min).
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(ASSETS.map(u=> new Request(u, {cache:'reload'})))).then(()=> self.skipWaiting()));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=> Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e)=>{
  const url = new URL(e.request.url);
  // Cache-first for same-origin assets; network fallback for the rest (e.g. fonts)
  if(url.origin === location.origin){
    e.respondWith(
      caches.match(e.request).then(cached=> cached || fetch(e.request).then(res=>{
        const copy = res.clone();
        caches.open(CACHE).then(c=> c.put(e.request, copy)).catch(()=>{});
        return res;
      }).catch(()=> cached))
    );
  } else {
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)));
  }
});
