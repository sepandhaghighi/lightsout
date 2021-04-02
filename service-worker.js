const version = "0.1.3";
const cacheName = 'lightsout-'+version;

function clearCache(){
    caches.keys().then(function(names) {
    for (let name of names){
        if (name!=cacheName){
        caches.delete(name);
            }
    }
        
});
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/donate.html',
        '/help.html',
        '/404.html',
        '/css/awsome/less/animated.less',
        '/css/awsome/less/bordered-pulled.less',
        '/css/awsome/less/core.less',
        '/css/awsome/less/fixed-width.less',
        '/css/awsome/less/font-awesome.less',
        '/css/awsome/less/icons.less',
        '/css/awsome/less/larger.less',
        '/css/awsome/less/list.less',
        '/css/awsome/less/mixins.less',
        '/css/awsome/less/path.less',
        '/css/awsome/less/rotated-flipped.less',
        '/css/awsome/less/screen-reader.less',
        '/css/awsome/less/stacked.less',
        '/css/awsome/less/variables.less',
        '/css/awsome/scss/font-awesome.scss',
        '/css/awsome/css/font-awesome.min.css',
        '/css/style.min.css',
        '/css/themes/google/google.css',
        '/css/sweetalert.css',
        '/images/favicon/9.png',
        '/images/favicon/8.png',
        '/images/favicon/7.png',
        '/images/favicon/6.png',
        '/images/favicon/5.png',
        '/images/favicon/4.png',
        '/images/favicon/3.png',
        '/images/favicon/2.png',
        '/images/favicon/1.png',
        '/images/help.gif',
        '/images/donate.jpg',
        '/images/star.png',
        '/images/sun.png',
        '/images/hurry.png',
        '/images/timeup.png',
        '/images/og-icon.png',
        '/manifest.json',
        '/fonts/JuliusSansOne-Regular.ttf',
        '/fonts/Sacramento-Regular.ttf',
        '/fonts/Inconsolata.otf',
        '/css/awsome/fonts/FontAwesome.otf',
        '/css/awsome/fonts/fontawesome-webfont.eot',
        '/css/awsome/fonts/fontawesome-webfont.svg',
        '/css/awsome/fonts/fontawesome-webfont.ttf',
        '/css/awsome/fonts/fontawesome-webfont.woff',
        '/css/awsome/fonts/fontawesome-webfont.woff2',
        '/js/sweetalert.min.js',
        '/js/shortcut.js',
        '/js/script.min.js',
        '/js/particles.min.js',
        '/js/app.js',
        '/favicon.ico'
          
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  clearCache();
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});