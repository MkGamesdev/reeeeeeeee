importScripts("https://jayvir101.github.io/lightning/Games.js");
var CACHE_NAME = 'cache-v2';

var REQUIRED_FILES = [
    "https://jayvir101.github.io/lightning/",
    "https://jayvir101.github.io/lightning/index.html",
    "https://jayvir101.github.io/lightning/web_light.js",
    "https://jayvir101.github.io/lightning/server.js",
    "https://jayvir101.github.io/lightning/index.css",
    "https://jayvir101.github.io/lightning/Games.js",
    "https://jayvir101.github.io/lightning/index.js",
    "https://jayvir101.github.io/lightning/Settings.js",
    "https://jayvir101.github.io/lightning/Settings/",
    "https://jayvir101.github.io/lightning/Settings/index.html",
    "https://jayvir101.github.io/lightning/Settings/index.js",
    "https://jayvir101.github.io/lightning/Games/index.js",
    "https://jayvir101.github.io/lightning/Games/",
    "https://jayvir101.github.io/lightning/Games/index.html",
    "https://jayvir101.github.io/lightning-resources/wallpaper.png",
    "https://jayvir101.github.io/lightning-resources/offline.html",
];

self.addEventListener('install', event => {
    event.waitUntil((function() {
        Games.forEach(function(item,index) {
            if(item.Iframe) {
                REQUIRED_FILES.push(item.Link);
                REQUIRED_FILES.push(item.Icon);
            }
            else {
                REQUIRED_FILES.push(item.Icon);
            }
        }),
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(REQUIRED_FILES);
        }).then(() => self.skipWaiting())
    })());
});

self.addEventListener('activate',event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(function(response) {
            return response || caches.match("https://jayvir101.github.io/lightning-resources/offline.html");
    }));
});
                      
/*
(async function() {
                console.log(event.request);
        if(!navigator.onLine) {
            return await caches.match(event.request,{ignoreSearch:true});
        }
        else if(navigator.onLine) {
            return await fetch(event.request);
        }
        else {
            return await fetch("https://jayvir101.github.io/lightning-resources/offline.html");
        }
    })()
    
*/