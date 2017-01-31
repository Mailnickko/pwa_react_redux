var cacheName = 'redditPWAv1';
var dataCacheName = 'redditPWAv1-data';

var filesToCache = [
  './',
  './index.html',
  './bundle.js',
  './bundle.css',
  './icons/redditlogo-128x128.png',
  './icons/redditlogo-144x144.png',
  './icons/redditlogo-152x152.png',
  './icons/redditlogo-192x192.png',
  './icons/redditlogo-256x256.png',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  // console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open('redditPWAv1')
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
  )
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// self.addEventListener('fetch', (e) => {
//   e.respondWith(
//     caches.match(e.request).then(response => {
//         if (response) {
//           console.log('Found Local copy in shell for: ', e.request)
//           return response;
//         }
//         console.log('No local version, Fetching: ', e.request)
//         return fetch(e.request);
//     })
//   );
// });

// TODO:

  // caches.open is not saving the response to cache properly
    // => This breaks the intercepted response from action creator

self.addEventListener('fetch', (e) => {
  const dataUrl = 'https://www.reddit.com';
  if (e.request.url.indexOf(dataUrl) > -1) {
     console.log('Fetching from api')
    const fetchRequest = e.request.clone();
    e.respondWith(
      fetch(fetchRequest)
        .then(resp => {
          const respToCache = resp.clone();
          caches.open(dataCacheName)
            .then(cache => cache.put(e.request.url, respToCache))
          return resp;
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(response => {
        // console.log('Serving from Shell', e.request.url)
        if (response) {
          console.log('Found Local copy for: ', e.request)
          return response;
        }
        console.log('No local version, Fetching: ', e.request)
        return fetch(e.request);
      })
    );
  }
});

// Alt Indexing

// caches.open(dataCacheName)
//   .then(function(cache) {
//     return fetch(e.request).then(function(response){
//       cache.put(e.request.url, response)
//       .then
//       // return response;
//     });
//   return response.clone();
// })
