/*eslint no-console: ['error', { allow: ['info', 'warn', 'error'] }] */

'use strict';

const CACHE_NAME = 'v0.0.1';

let urlsToCache = [
  '/',
  '/data.json'
];

// Install steps
self.addEventListener('install', function(event) {
  console.info('[Service Worker] install called');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  )
});

// Fetch step
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request)
        .then(function(response) {
          console.info('[Service Worker] fetch from network', event.request.url);
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(function() {
          console.info('[Service Worker] fetch from cache', event.request.url);
          return caches.match(event.request);
        })
    })
  );
});

// Fetch step
self.addEventListener('activate', function(event) {
  console.info('[Service Worker] activate called');

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }))
    })
  );
})
