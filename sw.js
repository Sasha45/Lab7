// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation

window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
});

//   - One for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

//   - One for fetch requests

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});