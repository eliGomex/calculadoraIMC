self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('my-pwa-cache').then(function(cache) {
            return cache.addAll([
                '/',
                'index.html',
                'styles.css',
                'main.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
