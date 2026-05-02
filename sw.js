const CACHE = ‘sudoku-v7’;
const ASSETS = [
‘./index.html’,
‘./manifest.json’,
‘./icon.svg’
];

// Install: cache all assets
self.addEventListener(‘install’, e => {
e.waitUntil(
caches.open(CACHE).then(c => c.addAll(ASSETS))
);
self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener(‘activate’, e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
)
);
self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener(‘fetch’, e => {
e.respondWith(
caches.match(e.request).then(cached => cached || fetch(e.request))
);
});