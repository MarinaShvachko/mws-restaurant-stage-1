/* Работает но с ошибками */

const staticCacheName = 'restaurant-v1';

// list of assets to cache on install
// cache each restaurant detail page as well
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          
	"/",
    "index.html",
    "restaurant.html",
    "js/main.js",
    "js/dbhelper.js",
    "js/swRegistration.js",
    "js/restaurant_info.js",
    "css/styles.css",
    "css/adaptive.css",
    "css/adaptiveInner.css",
    "data/restaurants.json",
    "img/1.jpg",
    "img/2.jpg",
  	"img/3.jpg",
  	"img/4.jpg",
  	"img/5.jpg",
  	"img/6.jpg",
  	"img/7.jpg",
  	"img/8.jpg",
  	"img/9.jpg",
  	"img/10.jpg"

        ]);
      })
  );
});


// intercept all requests
// either return cached asset or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    // Add cache.put to cache images on each fetch
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
      });

});
        }));
     
    });

self.addEventListener('activate', event => {
  event.waitUntil(
    // caches.delete('-restaurant-static-001')
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
}); 




